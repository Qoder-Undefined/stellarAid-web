'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';

export interface DonationNotificationPayload {
  id: string;
  donor: string;
  amount: string;
  asset: string;
  campaignTitle: string;
  timestamp: string;
}

interface UseDonationNotificationsOptions {
  onDonation?: (payload: DonationNotificationPayload) => void;
  soundEnabled?: boolean;
}

export function useDonationNotifications({
  onDonation,
  soundEnabled = false,
}: UseDonationNotificationsOptions = {}) {
  const { token, isAuthenticated } = useAuthStore();
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const playSound = useCallback(() => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch {
      // AudioContext not available — skip sound
    }
  }, [soundEnabled]);

  const connect = useCallback(() => {
    if (!isAuthenticated || !token || typeof window === 'undefined') return;

    const wsUrl =
      (process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001') +
      `/notifications?token=${encodeURIComponent(token)}`;

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data as string);
        if (msg.type !== 'donation') return;

        const payload = msg.payload as DonationNotificationPayload;

        // Persist in notification store
        useNotificationStore.getState().addDonationNotification({
          id: payload.id,
          title: `New donation from ${payload.donor}`,
          message: `${payload.amount} ${payload.asset} for "${payload.campaignTitle}"`,
          timestamp: payload.timestamp,
        });

        onDonation?.(payload);
        playSound();
      } catch {
        // malformed message — ignore
      }
    };

    ws.onclose = () => {
      // Reconnect after 5 s
      reconnectTimeoutRef.current = setTimeout(connect, 5000);
    };
  }, [isAuthenticated, token, onDonation, playSound]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    };
  }, [connect]);
}
