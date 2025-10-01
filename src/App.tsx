import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Portfolios from './components/Portfolios';
import Budgets from './components/Budgets';
import Goals from './components/Goals';
import Settings from './components/Settings';
import { useFinanceData } from './hooks/useFinanceData';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { 
    transactions, 
    portfolios, 
    budgets, 
    goals, 
    addTransaction, 
    addPortfolio,
    addInvestment,
    updatePortfolio,
    updateInvestment,
    deletePortfolio,
    deleteInvestment,
    addGoal, 
    updateGoal 
  } = useFinanceData();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard transactions={transactions} portfolios={portfolios} budgets={budgets} goals={goals} />;
      case 'transactions':
        return <Transactions transactions={transactions} addTransaction={addTransaction} />;
      case 'portfolios':
        return (
          <Portfolios 
            portfolios={portfolios} 
            addPortfolio={addPortfolio}
            addInvestment={addInvestment}
            updatePortfolio={updatePortfolio}
            updateInvestment={updateInvestment}
            deletePortfolio={deletePortfolio}
            deleteInvestment={deleteInvestment}
          />
        );
      case 'budgets':
        return <Budgets budgets={budgets} />;
      case 'goals':
        return <Goals goals={goals} addGoal={addGoal} updateGoal={updateGoal} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard transactions={transactions} portfolios={portfolios} budgets={budgets} goals={goals} />;
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="w-full">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;
