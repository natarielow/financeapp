import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Percent, Plus, Building2, Bot, Shield, Briefcase, Edit3, Trash2, RefreshCw } from 'lucide-react';
import { Portfolio, Investment } from '../types';
import AddPortfolioModal from './AddPortfolioModal';
import AddInvestmentModal from './AddInvestmentModal';
import EditInvestmentModal from './EditInvestmentModal';
import EditPortfolioModal from './EditPortfolioModal';

interface PortfoliosProps {
  portfolios: Portfolio[];
  addPortfolio: (portfolio: Omit<Portfolio, 'id' | 'lastUpdated'>) => void;
  addInvestment: (investment: Omit<Investment, 'id'>) => void;
  updatePortfolio: (portfolioId: string, updates: Partial<Portfolio>) => void;
  updateInvestment: (portfolioId: string, investmentId: string, updates: Partial<Investment>) => void;
  deletePortfolio: (portfolioId: string) => void;
  deleteInvestment: (portfolioId: string, investmentId: string) => void;
}

const Portfolios: React.FC<PortfoliosProps> = ({ 
  portfolios, 
  addPortfolio, 
  addInvestment, 
  updatePortfolio,
  updateInvestment,
  deletePortfolio,
  deleteInvestment
}) => {
  const [showAddPortfolio, setShowAddPortfolio] = useState(false);
  const [showAddInvestment, setShowAddInvestment] = useState(false);
  const [showEditInvestment, setShowEditInvestment] = useState(false);
  const [showEditPortfolio, setShowEditPortfolio] = useState(false);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string>('');
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);

  const totalValue = portfolios.reduce((sum, p) => sum + p.totalValue, 0);
  const totalGainLoss = portfolios.reduce((sum, p) => sum + p.totalGainLoss, 0);
  const totalGainLossPercent = totalValue > 0 ? ((totalGainLoss / (totalValue - totalGainLoss)) * 100).toFixed(2) : '0.00';

  const getPortfolioIcon = (type: Portfolio['portfolioType']) => {
    switch (type) {
      case 'banking_app':
        return Building2;
      case 'robo_advisor':
        return Bot;
      case 'insurance_linked':
        return Shield;
      case 'brokerage':
        return Briefcase;
      default:
        return TrendingUp;
    }
  };

  const getPortfolioTypeLabel = (type: Portfolio['portfolioType']) => {
    switch (type) {
      case 'banking_app':
        return 'Banking App';
      case 'robo_advisor':
        return 'Robo-Advisor';
      case 'insurance_linked':
        return 'Insurance-Linked';
      case 'brokerage':
        return 'Brokerage';
      default:
        return 'Other';
    }
  };

  const handleAddInvestment = (portfolioId: string) => {
    setSelectedPortfolioId(portfolioId);
    setShowAddInvestment(true);
  };

  const handleEditInvestment = (portfolioId: string, investment: Investment) => {
    setSelectedPortfolioId(portfolioId);
    setSelectedInvestment(investment);
    setShowEditInvestment(true);
  };

  const handleEditPortfolio = (portfolio: Portfolio) => {
    setSelectedPortfolio(portfolio);
    setShowEditPortfolio(true);
  };

  const handleUpdatePortfolioValues = (portfolioId: string) => {
    const portfolio = portfolios.find(p => p.id === portfolioId);
    if (!portfolio) return;

    // Recalculate portfolio values based on current investments
    const totalValue = portfolio.investments.reduce((sum, inv) => sum + (inv.shares * inv.currentPrice), 0);
    const totalCost = portfolio.investments.reduce((sum, inv) => sum + (inv.shares * inv.purchasePrice), 0);
    const totalGainLoss = totalValue - totalCost;

    updatePortfolio(portfolioId, {
      totalValue,
      totalGainLoss
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Investment Portfolios</h2>
        <button
          onClick={() => setShowAddPortfolio(true)}
          className="glass-button rounded-xl px-4 py-2 flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <Plus className="w-5 h-5 text-white" />
          <span className="text-white font-medium">Add Portfolio</span>
        </button>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="glass-button rounded-xl p-3">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-medium">Total Value</h3>
          </div>
          <p className="text-3xl font-bold text-white">${totalValue.toLocaleString()}</p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="glass-button rounded-xl p-3">
              {totalGainLoss >= 0 ? (
                <TrendingUp className="w-6 h-6 text-green-300" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-300" />
              )}
            </div>
            <h3 className="text-white font-medium">Total Gain/Loss</h3>
          </div>
          <p className={`text-3xl font-bold ${totalGainLoss >= 0 ? 'text-green-300' : 'text-red-300'}`}>
            {totalGainLoss >= 0 ? '+' : ''}${totalGainLoss.toLocaleString()}
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="glass-button rounded-xl p-3">
              <Percent className="w-6 h-6 text-blue-300" />
            </div>
            <h3 className="text-white font-medium">Return %</h3>
          </div>
          <p className={`text-3xl font-bold ${totalGainLoss >= 0 ? 'text-green-300' : 'text-red-300'}`}>
            {totalGainLoss >= 0 ? '+' : ''}{totalGainLossPercent}%
          </p>
        </div>
      </div>

      {/* Portfolio Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {portfolios.map((portfolio) => {
          const gainLossPercent = portfolio.totalValue > 0 ? 
            ((portfolio.totalGainLoss / (portfolio.totalValue - portfolio.totalGainLoss)) * 100).toFixed(2) : '0.00';
          const PortfolioIcon = getPortfolioIcon(portfolio.portfolioType);
          
          return (
            <div key={portfolio.id} className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="glass-button rounded-xl p-3">
                    <PortfolioIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{portfolio.name}</h3>
                    <p className="text-white/60 text-sm">{getPortfolioTypeLabel(portfolio.portfolioType)} • {portfolio.provider}</p>
                    <p className="text-white/40 text-xs">Updated: {new Date(portfolio.lastUpdated).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`flex items-center gap-1 ${
                    portfolio.totalGainLoss >= 0 ? 'text-green-300' : 'text-red-300'
                  }`}>
                    {portfolio.totalGainLoss >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                    <span className="font-bold">{portfolio.totalGainLoss >= 0 ? '+' : ''}{gainLossPercent}%</span>
                  </div>
                  <button
                    onClick={() => handleUpdatePortfolioValues(portfolio.id)}
                    className="p-2 text-white/60 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-colors"
                    title="Recalculate portfolio values"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEditPortfolio(portfolio)}
                    className="p-2 text-white/60 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deletePortfolio(portfolio.id)}
                    className="p-2 text-white/60 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-white/60 text-sm">Total Value</p>
                  <p className="text-2xl font-bold text-white">${portfolio.totalValue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Gain/Loss</p>
                  <p className={`text-2xl font-bold ${
                    portfolio.totalGainLoss >= 0 ? 'text-green-300' : 'text-red-300'
                  }`}>
                    {portfolio.totalGainLoss >= 0 ? '+' : ''}${portfolio.totalGainLoss.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-medium">Holdings ({portfolio.investments.length})</h4>
                  <button
                    onClick={() => handleAddInvestment(portfolio.id)}
                    className="text-blue-300 hover:text-blue-200 text-sm font-medium flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Investment
                  </button>
                </div>
                
                {portfolio.investments.length === 0 ? (
                  <div className="text-center py-8 text-white/60">
                    <p>No investments added yet</p>
                    <button
                      onClick={() => handleAddInvestment(portfolio.id)}
                      className="mt-2 text-blue-300 hover:text-blue-200 text-sm"
                    >
                      Add your first investment
                    </button>
                  </div>
                ) : (
                  portfolio.investments.map((investment) => {
                    const currentValue = investment.shares * investment.currentPrice;
                    const purchaseValue = investment.shares * investment.purchasePrice;
                    const gainLoss = currentValue - purchaseValue;
                    const gainLossPercent = purchaseValue > 0 ? ((gainLoss / purchaseValue) * 100).toFixed(2) : '0.00';

                    return (
                      <div key={investment.id} className="flex items-center justify-between p-3 glass rounded-xl group">
                        <div className="flex-1">
                          <p className="text-white font-medium">{investment.symbol}</p>
                          <p className="text-white/60 text-sm">{investment.name}</p>
                          <p className="text-white/40 text-xs">{investment.shares} shares • {investment.investmentType}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium">${currentValue.toLocaleString()}</p>
                          <p className={`text-sm ${gainLoss >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                            {gainLoss >= 0 ? '+' : ''}${gainLoss.toLocaleString()} ({gainLoss >= 0 ? '+' : ''}{gainLossPercent}%)
                          </p>
                        </div>
                        <div className="flex items-center gap-1 ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEditInvestment(portfolio.id, investment)}
                            className="p-1 text-white/60 hover:text-blue-300 hover:bg-blue-500/20 rounded"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => deleteInvestment(portfolio.id, investment.id)}
                            className="p-1 text-white/60 hover:text-red-300 hover:bg-red-500/20 rounded"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {portfolios.length === 0 && (
        <div className="glass-card rounded-2xl p-12 text-center">
          <div className="glass-button rounded-xl p-4 w-fit mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Portfolios Yet</h3>
          <p className="text-white/60 mb-6">Start by adding your first investment portfolio to track all your investments in one place.</p>
          <button
            onClick={() => setShowAddPortfolio(true)}
            className="glass-button rounded-xl px-6 py-3 flex items-center gap-2 mx-auto hover:scale-105 transition-transform"
          >
            <Plus className="w-5 h-5 text-white" />
            <span className="text-white font-medium">Add Your First Portfolio</span>
          </button>
        </div>
      )}

      {/* Modals */}
      {showAddPortfolio && (
        <AddPortfolioModal
          onClose={() => setShowAddPortfolio(false)}
          onAdd={addPortfolio}
        />
      )}

      {showAddInvestment && (
        <AddInvestmentModal
          portfolioId={selectedPortfolioId}
          onClose={() => setShowAddInvestment(false)}
          onAdd={addInvestment}
        />
      )}

      {showEditInvestment && selectedInvestment && (
        <EditInvestmentModal
          portfolioId={selectedPortfolioId}
          investment={selectedInvestment}
          onClose={() => {
            setShowEditInvestment(false);
            setSelectedInvestment(null);
          }}
          onUpdate={(updates) => {
            updateInvestment(selectedPortfolioId, selectedInvestment.id, updates);
            handleUpdatePortfolioValues(selectedPortfolioId);
          }}
          onDelete={() => {
            deleteInvestment(selectedPortfolioId, selectedInvestment.id);
            handleUpdatePortfolioValues(selectedPortfolioId);
          }}
        />
      )}

      {showEditPortfolio && selectedPortfolio && (
        <EditPortfolioModal
          portfolio={selectedPortfolio}
          onClose={() => {
            setShowEditPortfolio(false);
            setSelectedPortfolio(null);
          }}
          onUpdate={(updates) => updatePortfolio(selectedPortfolio.id, updates)}
          onDelete={() => deletePortfolio(selectedPortfolio.id)}
        />
      )}
    </div>
  );
};

export default Portfolios;
