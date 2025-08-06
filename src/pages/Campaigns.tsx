import { Target, Plus, Search, Filter, Calendar, DollarSign, Users } from "lucide-react";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState, useMemo, useCallback } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";

interface Campaign {
  id: number;
  name: string;
  platform: string;
  status: 'Active' | 'Paused' | 'Scheduled';
  budget: number;
  spent: number;
  clicks: number;
  conversions: number;
  ctr: string;
  cpc: string;
  startDate: string;
  endDate: string;
}

interface NewCampaign {
  name: string;
  platform: string;
  status: 'Active' | 'Paused' | 'Scheduled';
  budget: string;
  startDate: string;
  endDate: string;
}

const campaignData: Campaign[] = [
  {
    id: 1,
    name: "Summer Sale Campaign",
    platform: "Instagram",
    status: "Active",
    budget: 5000,
    spent: 3200,
    clicks: 12500,
    conversions: 234,
    ctr: "2.1%",
    cpc: "$0.26",
    startDate: "2024-06-01",
    endDate: "2024-08-31"
  },
  {
    id: 2,
    name: "Product Launch",
    platform: "TikTok",
    status: "Active",
    budget: 8000,
    spent: 5600,
    clicks: 15600,
    conversions: 298,
    ctr: "1.9%",
    cpc: "$0.36",
    startDate: "2024-07-01",
    endDate: "2024-09-30"
  },
  {
    id: 3,
    name: "Brand Awareness",
    platform: "Facebook",
    status: "Paused",
    budget: 3000,
    spent: 1800,
    clicks: 8900,
    conversions: 167,
    ctr: "1.9%",
    cpc: "$0.20",
    startDate: "2024-05-15",
    endDate: "2024-07-15"
  },
  {
    id: 4,
    name: "Holiday Promotion",
    platform: "YouTube",
    status: "Scheduled",
    budget: 6000,
    spent: 0,
    clicks: 0,
    conversions: 0,
    ctr: "0%",
    cpc: "$0.00",
    startDate: "2024-12-01",
    endDate: "2024-12-31"
  }
];

export default function Campaigns() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>(campaignData);
  const [newCampaign, setNewCampaign] = useState<NewCampaign>({
    name: "",
    platform: "",
    status: "Scheduled",
    budget: "",
    startDate: "",
    endDate: ""
  });

  // Get unique platforms and statuses
  const platforms = useMemo(() => Array.from(new Set(campaigns.map(c => c.platform))), [campaigns]);
  const statuses = useMemo(() => Array.from(new Set(campaigns.map(c => c.status))), [campaigns]);

  // Filter campaigns based on search term and filters
  const filteredCampaigns = useMemo(() => campaigns.filter((campaign) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      campaign.name.toLowerCase().includes(term) ||
      campaign.platform.toLowerCase().includes(term) ||
      campaign.status.toLowerCase().includes(term);
    const matchesPlatform = selectedPlatforms.length === 0 || selectedPlatforms.includes(campaign.platform);
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(campaign.status);
    return matchesSearch && matchesPlatform && matchesStatus;
  }), [campaigns, searchTerm, selectedPlatforms, selectedStatuses]);

  const handleCreateCampaign = useCallback(() => {
    if (!newCampaign.name || !newCampaign.platform || !newCampaign.budget || !newCampaign.startDate || !newCampaign.endDate) {
      return;
    }

    // Validate budget is a positive number
    const budgetValue = parseInt(newCampaign.budget);
    if (isNaN(budgetValue) || budgetValue <= 0) {
      return;
    }

    // Validate dates
    const startDate = new Date(newCampaign.startDate);
    const endDate = new Date(newCampaign.endDate);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || endDate <= startDate) {
      return;
    }

    // Generate unique ID safely
    const maxId = campaigns.length > 0 ? Math.max(...campaigns.map(c => c.id)) : 0;
    const newId = maxId + 1;

    const campaign = {
      id: newId,
      name: newCampaign.name.trim(),
      platform: newCampaign.platform,
      status: newCampaign.status,
      budget: budgetValue,
      spent: 0,
      clicks: 0,
      conversions: 0,
      ctr: "0%",
      cpc: "$0.00",
      startDate: newCampaign.startDate,
      endDate: newCampaign.endDate
    };

    setCampaigns([...campaigns, campaign]);
    setNewCampaign({
      name: "",
      platform: "",
      status: "Scheduled",
      budget: "",
      startDate: "",
      endDate: ""
    });
    setIsDialogOpen(false);
  }, [newCampaign, campaigns]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Campaigns</h1>
            <p className="text-muted-foreground">Manage and monitor your marketing campaigns</p>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:bg-gradient-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
              <DialogDescription>
                Fill in the details below to create a new marketing campaign.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input
                  id="name"
                  placeholder="Enter campaign name"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="platform">Platform</Label>
                <Select value={newCampaign.platform} onValueChange={(value) => setNewCampaign({...newCampaign, platform: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="TikTok">TikTok</SelectItem>
                    <SelectItem value="YouTube">YouTube</SelectItem>
                    <SelectItem value="Twitter">Twitter</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={newCampaign.status} onValueChange={(value) => setNewCampaign({...newCampaign, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Paused">Paused</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="budget">Budget ($)</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="Enter budget amount"
                  value={newCampaign.budget}
                  onChange={(e) => setNewCampaign({...newCampaign, budget: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newCampaign.startDate}
                    onChange={(e) => setNewCampaign({...newCampaign, startDate: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newCampaign.endDate}
                    onChange={(e) => setNewCampaign({...newCampaign, endDate: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCampaign} disabled={!newCampaign.name || !newCampaign.platform || !newCampaign.budget || !newCampaign.startDate || !newCampaign.endDate}>
                Create Campaign
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Campaign Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Campaigns"
          value={campaigns.filter(c => c.status === 'Active').length.toString()}
          change="+1"
          changeType="positive"
          icon={Target}
        />
        <MetricCard
          title="Total Budget"
          value={`$${campaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}`}
          change="+$5,000"
          changeType="positive"
          icon={DollarSign}
        />
        <MetricCard
          title="Total Spent"
          value={`$${campaigns.reduce((sum, c) => sum + c.spent, 0).toLocaleString()}`}
          change="+$2,400"
          changeType="positive"
          icon={DollarSign}
        />
        <MetricCard
          title="Total Conversions"
          value={campaigns.reduce((sum, c) => sum + c.conversions, 0).toString()}
          change="+45"
          changeType="positive"
          icon={Users}
        />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search campaigns..."
            className="pl-10"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Platform</div>
            {platforms.map(platform => (
              <DropdownMenuCheckboxItem
                key={platform}
                checked={selectedPlatforms.includes(platform)}
                onCheckedChange={checked => {
                  setSelectedPlatforms(prev =>
                    checked ? [...prev, platform] : prev.filter(p => p !== platform)
                  );
                }}
              >
                {platform}
              </DropdownMenuCheckboxItem>
            ))}
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground mt-2">Status</div>
            {statuses.map(status => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={selectedStatuses.includes(status)}
                onCheckedChange={checked => {
                  setSelectedStatuses(prev =>
                    checked ? [...prev, status] : prev.filter(s => s !== status)
                  );
                }}
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Campaigns Table */}
      <div className="bg-card rounded-lg border">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Campaign List</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Campaign</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Platform</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Budget</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Spent</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Clicks</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Conversions</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">CTR</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">CPC</th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b hover:bg-muted/50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-foreground">{campaign.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {campaign.startDate} - {campaign.endDate}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="secondary">{campaign.platform}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Badge 
                        variant={campaign.status === 'Active' ? 'default' : 
                                campaign.status === 'Paused' ? 'secondary' : 'outline'}
                      >
                        {campaign.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-foreground">${campaign.budget.toLocaleString()}</td>
                    <td className="py-4 px-4 text-foreground">${campaign.spent.toLocaleString()}</td>
                    <td className="py-4 px-4 text-foreground">{campaign.clicks.toLocaleString()}</td>
                    <td className="py-4 px-4 text-foreground">{campaign.conversions}</td>
                    <td className="py-4 px-4 text-foreground">{campaign.ctr}</td>
                    <td className="py-4 px-4 text-foreground">{campaign.cpc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 