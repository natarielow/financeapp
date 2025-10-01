import React from 'react';
import { 
  Home, 
  CreditCard, 
  TrendingUp, 
  PieChart, 
  Target, 
  Settings,
  Wallet
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'portfolios', label: 'Portfolios', icon: TrendingUp },
    { id: 'budgets', label: 'Budgets', icon: PieChart },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="glass-card rounded-2xl p-4 mb-6">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="glass-button rounded-xl p-2">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white hidden sm:block">FinanceFlow</h1>
        </div>
        
        {/* Navigation */}
        <nav className="flex items-center gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
                  activeTab === item.id
                    ? 'glass-button text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium hidden md:block">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
