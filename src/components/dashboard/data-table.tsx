import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { useData } from "@/contexts/DataContext";

interface UserData {
  id: string;
  name: string;
  avatar: string;
  platform: string;
  clicks: number;
  sales: number;
  percentage: number;
}

const userData: UserData[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'SJ',
    platform: 'Instagram',
    clicks: 12500,
    sales: 234,
    percentage: 1.87
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: 'MC',
    platform: 'TikTok',
    clicks: 15600,
    sales: 298,
    percentage: 1.91
  },
  {
    id: '3',
    name: 'Emma Davis',
    avatar: 'ED',
    platform: 'Facebook',
    clicks: 8900,
    sales: 167,
    percentage: 1.88
  },
  {
    id: '4',
    name: 'Alex Rodriguez',
    avatar: 'AR',
    platform: 'YouTube',
    clicks: 6700,
    sales: 89,
    percentage: 1.33
  },
  {
    id: '5',
    name: 'Lisa Wang',
    avatar: 'LW',
    platform: 'Instagram',
    clicks: 9800,
    sales: 156,
    percentage: 1.59
  },
  {
    id: '6',
    name: 'David Kim',
    avatar: 'DK',
    platform: 'TikTok',
    clicks: 11200,
    sales: 201,
    percentage: 1.79
  },
];

export function DataTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const { globalSearchTerm } = useData();
  const [sortField, setSortField] = useState<keyof UserData>('sales');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof UserData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredData = userData
    .filter(user => {
      const localMatch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.platform.toLowerCase().includes(searchTerm.toLowerCase());
      const globalMatch =
        !globalSearchTerm ||
        user.name.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
        user.platform.toLowerCase().includes(globalSearchTerm.toLowerCase());
      return localMatch && globalMatch;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

  const SortIcon = ({ field }: { field: keyof UserData }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="chart-container">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Per-User Performance</h3>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search users or platforms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
              <th 
                className="text-left py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('platform')}
              >
                <div className="flex items-center space-x-1">
                  <span>Platform</span>
                  <SortIcon field="platform" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('clicks')}
              >
                <div className="flex items-center space-x-1">
                  <span>Clicks</span>
                  <SortIcon field="clicks" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('sales')}
              >
                <div className="flex items-center space-x-1">
                  <span>Sales</span>
                  <SortIcon field="sales" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('percentage')}
              >
                <div className="flex items-center space-x-1">
                  <span>%</span>
                  <SortIcon field="percentage" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user) => (
              <tr key={user.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-white">{user.avatar}</span>
                      </div>
                    </Avatar>
                    <span className="font-medium text-foreground">{user.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-muted-foreground">{user.platform}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm font-medium text-foreground">{user.clicks.toLocaleString()}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm font-medium text-foreground">{user.sales}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm font-medium text-success">{user.percentage}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredData.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No users found matching your search.</p>
        </div>
      )}
    </div>
  );
}