
import AdminHeader from "@/components/admin/AdminHeader";
import DisputesTable from "@/components/admin/disputes/DisputesTable";

const DonorDisputesPage = () => {
  return (
    <div>
      <AdminHeader title="Donor Disputes" />
      <div className="p-4">
        <DisputesTable />
      </div>
    </div>
  );
};

export default DonorDisputesPage;