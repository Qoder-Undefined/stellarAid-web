
import { Button } from '@/components/ui/Button';

const ExportData = () => {
  const handleExport = () => {
    // Logic to export data as CSV
    alert('Exporting data as CSV...');
  };

  return (
    <div className="flex justify-end">
      <Button onClick={handleExport}>Export as CSV</Button>
    </div>
  );
};

export default ExportData;