import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return {
    title: `Campaign ${params.id} | StellarAid`,
    description: 'View campaign details, milestones, and donate.',
  };
}

const TABS = ['About', 'Milestones', 'Donors', 'Updates', 'Contract Info'] as const;

export default function CampaignDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-64 w-full bg-muted">
        <div className="absolute inset-0 flex items-end p-6">
          <h1 className="text-3xl font-bold text-white drop-shadow">
            Campaign #{params.id}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 lg:flex lg:gap-8">
        {/* Main content */}
        <div className="flex-1">
          {/* Creator info */}
          <div className="mb-6 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted" />
            <div>
              <p className="text-sm text-muted-foreground">Created by</p>
              <p className="font-medium">Campaign Creator</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex gap-1 border-b">
            {TABS.map((tab) => (
              <button
                key={tab}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground first:text-foreground first:border-b-2 first:border-primary"
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Description placeholder */}
          <p className="text-muted-foreground">
            Campaign description and details will appear here.
          </p>
        </div>

        {/* Sidebar */}
        <aside className="mt-8 w-full lg:mt-0 lg:w-80 shrink-0">
          <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Raised</p>
              <p className="text-2xl font-bold">0 XLM</p>
              <p className="text-sm text-muted-foreground">of 0 XLM goal</p>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div className="h-2 rounded-full bg-primary" style={{ width: '0%' }} />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0 donors</span>
              <span>0 days left</span>
            </div>
            <button className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              Donate Now
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}
