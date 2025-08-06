import jsPDF from 'jspdf';

// Types for export data
export interface ExportData {
  timePeriod: string;
  metrics: Array<{
    title: string;
    value: string;
    change: string;
    changeType: string;
  }>;
  chartData: Array<{
    month: string;
    revenue: number;
    users: number;
  }>;
  platformData: Array<{
    platform: string;
    clicks: number;
    sales: number;
  }>;
}

// CSV Export utility
export const exportToCSV = (data: ExportData): string => {
  let csvContent = "data:text/csv;charset=utf-8,";
  
  // Add header
  csvContent += "Dashboard Export - " + data.timePeriod + "\n\n";
  
  // Add metrics
  csvContent += "Metrics\n";
  csvContent += "Title,Value,Change,Change Type\n";
  data.metrics.forEach(metric => {
    csvContent += `${metric.title},${metric.value},${metric.change},${metric.changeType}\n`;
  });
  
  csvContent += "\n";
  
  // Add chart data
  csvContent += "Chart Data\n";
  csvContent += "Month,Revenue,Users\n";
  data.chartData.forEach(item => {
    csvContent += `${item.month},${item.revenue},${item.users}\n`;
  });
  
  csvContent += "\n";
  
  // Add platform data
  csvContent += "Platform Performance\n";
  csvContent += "Platform,Clicks,Sales\n";
  data.platformData.forEach(item => {
    csvContent += `${item.platform},${item.clicks},${item.sales}\n`;
  });
  
  return csvContent;
};

// PDF Export utility
export const exportToPDF = async (data: ExportData): Promise<void> => {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.text('Dashboard Report', 20, 20);
  doc.setFontSize(12);
  doc.text(`Period: ${data.timePeriod}`, 20, 30);
  
  // Metrics section
  doc.setFontSize(16);
  doc.text('Key Metrics', 20, 50);
  doc.setFontSize(10);
  
  data.metrics.forEach((metric, index) => {
    const y = 60 + (index * 10);
    doc.text(`${metric.title}: ${metric.value} (${metric.change})`, 20, y);
  });
  
  // Chart data section
  doc.setFontSize(16);
  doc.text('Revenue & Users Data', 20, 120);
  doc.setFontSize(10);
  
  data.chartData.forEach((item, index) => {
    const y = 130 + (index * 10);
    doc.text(`${item.month}: Revenue $${item.revenue.toLocaleString()}, Users ${item.users}`, 20, y);
  });
  
  // Platform data section
  doc.setFontSize(16);
  doc.text('Platform Performance', 20, 180);
  doc.setFontSize(10);
  
  data.platformData.forEach((item, index) => {
    const y = 190 + (index * 10);
    doc.text(`${item.platform}: ${item.clicks.toLocaleString()} clicks, ${item.sales} sales`, 20, y);
  });
  
  // Save the PDF
  doc.save(`dashboard-report-${data.timePeriod.toLowerCase().replace(' ', '-')}.pdf`);
};

// Data validation utility
export const validateExportData = (data: Partial<ExportData>): string | null => {
  if (!data.metrics || data.metrics.length === 0) {
    return "No metrics data available for export";
  }
  
  if (!data.chartData || data.chartData.length === 0) {
    return "No chart data available for export";
  }
  
  if (!data.platformData || data.platformData.length === 0) {
    return "No platform data available for export";
  }
  
  return null;
}; 