import React, { useState } from 'react';
import { X, Trash2, Building2, Bot, Shield, Briefcase, TrendingUp } from 'lucide-react';
import { Portfolio } from '../types';

interface EditPortfolioModalProps {
  portfolio: Portfolio;
  onClose: () => void;
  onUpdate: (updates: Partial<Portfolio>) => void;
  onDelete: () => void;
}

const EditPortfolioModal: React.FC<EditPortfolioModalProps> = ({ 
  portfolio, 
  onClose, 
  onUpdate, 
  onDelete 
}) => {
  const [formData, setFormData] = useState({
    name: portfolio.name,
    description: portfolio.description,
    provider: portfolio.provider,
    portfolioType: portfolio.portfolioType,
    accountNumber: portfolio.accountNumber || '',
    totalValue: portfolio.totalValue,
    totalGainLoss: portfolio.totalGainLoss
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const portfolioTypes = [
    { value: 'banking_app', label: 'Banking App', icon: Building2, description: 'Unit trusts and investments through your bank' },
    { value: 'robo_advisor', label: 'Robo-Advisor', icon: Bot, description: 'Automated investment platforms' },
    { value: 'insurance_linked', label: 'Insurance-Linked', icon: Shield, description: 'Investment-linked insurance plans' },
    { value: 'brokerage', label: 'Brokerage', icon: Briefcase, description: 'Traditional brokerage accounts' },
    { value: 'other', label: 'Other', icon: TrendingUp, description: 'Other investment platforms' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass-card rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Edit Portfolio</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-2 text-white/60 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {showDeleteConfirm ? (
          <div className="text-center space-y-6">
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-2">Delete Portfolio?</h3>
              <p className="text-white/60 mb-4">
                Are you sure you want to delete <strong>{portfolio.name}</strong>? This will also delete all {portfolio.investments.length} investments in this portfolio. This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 p-3 glass rounded-xl text-white font-medium hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 p-3 bg-red-500/20 border border-red-500/40 rounded-xl text-red-300 font-medium hover:bg-red-500/30 transition-colors"
                >
                  Delete Portfolio
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Portfolio Type Selection */}
            <div>
              <label className="block text-white font-medium mb-3">Portfolio Type</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {portfolioTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, portfolioType: type.value as Portfolio['portfolioType'] })}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        formData.portfolioType === type.value
                          ? 'border-blue-400 bg-blue-500/20'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-5 h-5 text-white" />
                        <span className="text-white font-medium">{type.label}</span>
                      </div>
                      <p className="text-white/60 text-sm">{type.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Portfolio Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 glass rounded-xl text-white placeholder-white/60 border border-white/20 focus:border-blue-400 focus:outline-none"
                  placeholder="e.g., DBS Unit Trusts"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Provider</label>
                <input
                  type="text"
                  required
                  value={formData.provider}
                  onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                  className="w-full p-3 glass rounded-xl text-white placeholder-white/60 border border-white/20 focus:border-blue-400 focus:outline-none"
                  placeholder="e.g., DBS Bank, StashAway, Great Eastern"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 glass rounded-xl text-white placeholder-white/60 border border-white/20 focus:border-blue-400 focus:outline-none"
                placeholder="Brief description of this portfolio"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Account Number (Optional)</label>
              <input
                type="text"
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                className="w-full p-3 glass rounded-xl text-white placeholder-white/60 border border-white/20 focus:border-blue-400 focus:outline-none"
                placeholder="Account or policy number"
              />
            </div>

            {/* Manual Override Values */}
            <div className="glass rounded-xl p-4">
              <h4 className="text-white font-medium mb-4">Manual Value Override</h4>
              <p className="text-white/60 text-sm mb-4">
                These values will be automatically calculated from your investments, but you can manually override them if needed.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-medium mb-2">Total Value ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.totalValue}
                    onChange={(e) => setFormData({ ...formData, totalValue: parseFloat(e.target.value) || 0 })}
                    className="w-full p-3 glass rounded-xl text-white placeholder-white/60 border border-white/20 focus:border-blue-400 focus:outline-none"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Total Gain/Loss ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.totalGainLoss}
                    onChange={(e) => setFormData({ ...formData, totalGainLoss: parseFloat(e.target.value) || 0 })}
                    className="w-full p-3 glass rounded-xl text-white placeholder-white/60 border border-white/20 focus:border-blue-400 focus:outline-none"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Portfolio Summary */}
            <div className="glass rounded-xl p-4">
              <h4 className="text-white font-medium mb-3">Portfolio Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-white/60">Investments:</span>
                  <span className="text-white font-medium ml-2">{portfolio.investments.length}</span>
                </div>
                <div>
                  <span className="text-white/60">Return %:</span>
                  <span className={`font-medium ml-2 ${
                    formData.totalGainLoss >= 0 ? 'text-green-300' : 'text-red-300'
                  }`}>
                    {formData.totalValue > 0 ? 
                      (((formData.totalGainLoss / (formData.totalValue - formData.totalGainLoss)) * 100).toFixed(2)) : '0.00'}%
                  </span>
                </div>
                <div>
                  <span className="text-white/60">Created:</span>
                  <span className="text-white font-medium ml-2">
                    {new Date(portfolio.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-white/60">Provider:</span>
                  <span className="text-white font-medium ml-2">{formData.provider}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 p-3 glass rounded-xl text-white font-medium hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 p-3 glass-button rounded-xl text-white font-medium hover:scale-105 transition-transform"
              >
                Update Portfolio
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditPortfolioModal;
