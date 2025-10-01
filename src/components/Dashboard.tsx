import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Target, PieChart, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts';
import { Transaction, Portfolio, Budget, FinancialGoal } from '../types';

interface DashboardProps {
  transactions: Transaction[];
  portfolios: Portfolio[];
  budgets: Budget[];
  goals: FinancialGoal[];
}

const Dashboard: React.FC<DashboardProps> = ({ transactions, portfolios, budgets, goals }) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const netWorth = totalIncome - totalExpenses;
  
  const totalPortfolioValue = portfolios.reduce((sum, p) => sum + p.totalValue, 0);
  const totalPortfolioGains = portfolios.reduce((sum, p) => sum + p.totalGainLoss, 0);

  const monthlyData = [
    { month: 'Oct', income: 4800, expenses: 3200 },
    { month: 'Nov', income: 5200, expenses: 3800 },
    { month: 'Dec', income: 5000, expenses: 3500 },
    { month: 'Jan', income: 5800, expenses: 3900 },
  ];

  const expenseData = [
    { name: 'Food', value: 450, color: '#8884d8' },
    { name: 'Transportation', value: 120, color: '#82ca9d' },
    { name: 'Entertainment', value: 200, color: '#ffc658' },
    { name: 'Utilities', value: 180, color: '#ff7300' },
  ];

  const StatCard = ({ title, value, change, icon: Icon, positive }: any) => (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="glass-button rounded-xl p-3">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`flex items-center gap-1 text-sm ${positive ? 'text-green-300' : 'text-red-300'}`}>
          {positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {change}
        </div>
      </div>
      <h3 className="text-white/70 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white">${value.toLocaleString()}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Dashboard</h2>
        <div className="glass-button rounded-xl px-4 py-2">
          <span className="text-white font-medium">January 2024</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Net Worth"
          value={netWorth}
          change="+12.5%"
          icon={DollarSign}
          positive={true}
        />
        <StatCard
          title="Portfolio Value"
          value={totalPortfolioValue}
          change="+8.2%"
          icon={TrendingUp}
          positive={true}
        />
        <StatCard
          title="Monthly Expenses"
          value={totalExpenses}
          change="-5.1%"
          icon={Activity}
          positive={true}
        />
        <StatCard
          title="Goals Progress"
          value={goals.reduce((sum, g) => sum + g.currentAmount, 0)}
          change="+15.3%"
          icon={Target}
          positive={true}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses Chart */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Income vs Expenses</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                <YAxis stroke="rgba(255,255,255,0.7)" />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#4ade80" 
                  strokeWidth={3}
                  dot={{ fill: '#4ade80', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#f87171" 
                  strokeWidth={3}
                  dot={{ fill: '#f87171', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Expense Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <RechartsPieChart
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </RechartsPieChart>
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {expenseData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-white/70 text-sm">{item.name}</span>
                <span className="text-white font-medium text-sm ml-auto">${item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Recent Transactions</h3>
        <div className="space-y-4">
          {transactions.slice(0, 5).map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 glass rounded-xl">
              <div className="flex items-center gap-4">
                <div className={`glass-button rounded-xl p-2 ${
                  transaction.type === 'income' ? 'text-green-300' : 'text-red-300'
                }`}>
                  {transaction.type === 'income' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-white font-medium">{transaction.description}</p>
                  <p className="text-white/60 text-sm">{transaction.category} • {transaction.date}</p>
                </div>
              </div>
              <span className={`font-bold ${
                transaction.type === 'income' ? 'text-green-300' : 'text-red-300'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
