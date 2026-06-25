
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const DisputesTable = () => {
  // Mock data for disputes
  const disputes = [
    {
      campaign: "Campaign A",
      reason: "Fraudulent activity",
      reporter: "John Doe",
      status: "Pending",
    },
    {
      campaign: "Campaign B",
      reason: "Misleading information",
      reporter: "Jane Smith",
      status: "Resolved",
    },
  ];

  return (
    <Card>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dispute Reason</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reporter</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {disputes.map((dispute, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{dispute.campaign}</td>
              <td className="px-6 py-4 whitespace-nowrap">{dispute.reason}</td>
              <td className="px-6 py-4 whitespace-nowrap">{dispute.reporter}</td>
              <td className="px-6 py-4 whitespace-nowrap">{dispute.status}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <Button variant="outline" size="sm">View Details</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default DisputesTable;