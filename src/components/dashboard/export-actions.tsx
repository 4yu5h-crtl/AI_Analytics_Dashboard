import React, { useCallback } from 'react';
import { Download, FileText, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';
import { ExportData, exportToCSV, exportToPDF, validateExportData } from './export-utils';

interface ExportActionsProps {
  exportData: ExportData;
  onExportStart: () => void;
  onExportComplete: () => void;
  onExportError: (error: string) => void;
}

export const ExportActions: React.FC<ExportActionsProps> = React.memo(({
  exportData,
  onExportStart,
  onExportComplete,
  onExportError
}) => {
  const handleExportCSV = useCallback(async () => {
    try {
      onExportStart();
      
      // Validate data
      const validationError = validateExportData(exportData);
      if (validationError) {
        throw new Error(validationError);
      }
      
      // Simulate export time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate CSV
      const csvContent = exportToCSV(exportData);
      
      // Download file
      const link = document.createElement('a');
      link.href = encodeURI(csvContent);
      link.download = `dashboard-export-${exportData.timePeriod.toLowerCase().replace(' ', '-')}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      onExportComplete();
    } catch (error) {
      console.error('CSV export failed:', error);
      onExportError(error instanceof Error ? error.message : 'CSV export failed');
    }
  }, [exportData, onExportStart, onExportComplete, onExportError]);

  const handleExportPDF = useCallback(async () => {
    try {
      onExportStart();
      
      // Validate data
      const validationError = validateExportData(exportData);
      if (validationError) {
        throw new Error(validationError);
      }
      
      // Simulate export time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate PDF
      await exportToPDF(exportData);
      
      onExportComplete();
    } catch (error) {
      console.error('PDF generation failed:', error);
      onExportError(error instanceof Error ? error.message : 'PDF generation failed');
    }
  }, [exportData, onExportStart, onExportComplete, onExportError]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <motion.div
            animate={{ rotate: 0 }}
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <Download className="w-4 h-4" />
          </motion.div>
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={handleExportCSV}
          className="cursor-pointer"
        >
          <motion.div
            className="flex items-center gap-2 w-full"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.1 }}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export as CSV</span>
          </motion.div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleExportPDF}
          className="cursor-pointer"
        >
          <motion.div
            className="flex items-center gap-2 w-full"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.1 }}
          >
            <FileText className="w-4 h-4" />
            <span>Export as PDF</span>
          </motion.div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

ExportActions.displayName = 'ExportActions'; 