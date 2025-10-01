import React, { useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import { Investment } from '../types';

interface EditInvestmentModalProps {
  portfolioId: string;
  investment: Investment;
  onClose: () => void;
  onUpdate: (updates: Partial<Investment>) => void;
  onDelete: () => void;
}

const EditInvestmentModal: React.FC<EditInvestmentModalProps> = ({ 
  portfolioId, 
  investment, 
  onClose, 
  onUpdate, 
  onDelete 
}) => {
  const [formData, setFormData] = useState({
    symbol: investment.symbol,
    name: investment.name,
    shares: investment.shares,
    purchasePrice: investment.purchasePrice,
    currentPrice: investment.currentPrice,
    purchaseDate: investment.purchaseDate,
    investmentType: investment.investmentType
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const investmentTypes = [
    { value: 'unit_trust', label: 'Unit Trust' },
    { value: 'stock', label: 'Stock' },
    { value: 'etf', label: 'ETF' },
    { value: 'bond', label: 'Bond' },
    { value: 'crypto', label: 'Cryptocurrency' },
    { value: 'other', label: 'Other' }
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

  const originalValue = investment.shares * investment.purchasePrice;
  const originalCurrentValue = investment.shares * investment.currentPrice;
  const newValue = formData.shares * formData.purchasePrice;
  const newCurrentValue = formData.shares * formData.currentPrice;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass-card rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Edit Investment</h2>
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
              <h3 className="text-xl font-bold text-white mb-2">Delete Investment?</h3>
              <p className="text-white/60 mb-4">
                Are you sure you want to delete <strong>{investment.symbol}</strong>? This action cannot be undone.
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
                  Delete Investment
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Investment Type */}
            <div>
              <label className="block text-white font-medium mb-2">Investment Type</label>
              <select
                value={formData.investmentType}
                onChange={(e) => setFormData({ ...formData, investmentType: e.target.value as Investment['investmentType'] })}
                className="w-full p-3 glass rounded-xl text-white border border-white/20 focus:border-blue-400 focus:outline-none bg-transparent"
              >
                {investmentTypes.map((type) => (
                  <option key={type.value} value={type.value} className="bg-gray-800">
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Symbol/Code</label>
                <input
                  type="text"
                  required
                  value={formData.symbol}
                  onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                  className="w-full p-3 glass rounded-xl text-white placeholder-white/60 border border-white/20 focus:border-blue-400 focus:outline-none"
                  placeholder="e.g., AAPL, FSMONE-SG"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Investment Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 glass rounded-xl text-white placeholder-white/60 border border-white/20 focus:border-blue-400 focus:outline-none"
                  placeholder="e.g., Apple Inc., FSM One Singapore Fund"
                />
              </div>
            </div>

            {/* Quantity and Prices */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-white font-medium mb-2">Shares/Units</label>
                <input
                  type="number"
                  step="0.001"
                  min="0"
                  required
                  value={formData.shares}
                  onChange={(e) => setFormData({ ...formData, shares: parseFloat(e.target.value) || 0 })}
                  className="w-full p-3 glass rounded-xl text-white placeholder-white/60 border border-white/20 focus:border-blue-400 focus:outline-none"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Purchase Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={formData.purchasePrice}
                  onChange={(e) => setFormData({ ...formData, purchasePrice: parseFloat(e.target.value) || 0 })}
                  className="w-full p-3 glass rounded-xl text-white placeholder-white/60 border border-white/20 focus:border-blue-400 focus:outline-none"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Current Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={formData.currentPrice}
                  onChange={(e) => setFormData({ ...formData, currentPrice: parseFloat(e.target.value) || 0 })}
                  className="w-full p-3 glass rounded-xl text-white placeholder-white/60 border border-white/20 focus:border-blue-400 focus:outline-none"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Purchase Date</label>
              <input
                type="date"
                required
                value={formData.purchaseDate}
                onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                className="w-full p-3 glass rounded-xl text-white border border-white/20 focus:border-blue-400 focus:outline-none bg-transparent"
              />
            </div>

            {/* Comparison Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass rounded-xl p-4">
                <h4 className="text-white font-medium mb-3">Original Values</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Purchase Value:</span>
                    <span className="text-white">${originalValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Current Value:</span>
                    <span className="text-white">${originalCurrentValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Gain/Loss:</span>
                    <span className={originalCurrentValue >= originalValue ? 'text-green-300' : 'text-red-300'}>
                      ${(originalCurrentValue - originalValue).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {(formData.shares > 0 && formData.purchasePrice > 0 && formData.currentPrice > 0) && (
                <div className="glass rounded-xl p-4">
                  <h4 className="text-white font-medium mb-3">Updated Values</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Purchase Value:</span>
                      <span className="text-white">${newValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Current Value:</span>
                      <span className="text-white">${newCurrentValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Gain/Loss:</span>
                      <span className={newCurrentValue >= newValue ? 'text-green-300' : 'text-red-300'}>
                        ${(newCurrentValue - newValue).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Return %:</span>
                      <span className={formData.currentPrice >= formData.purchasePrice ? 'text-green-300' : 'text-red-300'}>
                        {(((formData.currentPrice - formData.purchasePrice) / formData.purchasePrice) * 100).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
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
                Update Investment
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditInvestmentModal;
