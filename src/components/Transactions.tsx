import React, { useState } from 'react';
import { Plus, Search, Filter, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionsProps {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const Transactions: React.FC<TransactionsProps> = ({ transactions, addTransaction }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [formData, setFormData] = useState({
    type: 'expense' as 'income' | 'expense',
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = {
    income: ['Salary', 'Freelance', 'Investment', 'Business', 'Other'],
    expense: ['Food', 'Transportation', 'Entertainment', 'Utilities', 'Healthcare', 'Shopping', 'Other']
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || transaction.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.amount || !formData.description) return;

    addTransaction({
      type: formData.type,
      category: formData.category,
      amount: parseFloat(formData.amount),
      description: formData.description,
      date: formData.date
    });

    setFormData({
      type: 'expense',
      category: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Transactions</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="glass-button rounded-xl px-6 py-3 text-white font-medium flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Transaction
        </button>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'income', 'expense'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type as any)}
                className={`px-4 py-3 rounded-xl font-medium capitalize transition-all ${
                  filterType === type
                    ? 'glass-button text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-6">Add Transaction</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2">
                {['income', 'expense'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: type as any, category: '' })}
                    className={`flex-1 py-3 rounded-xl font-medium capitalize transition-all ${
                      formData.type === type
                        ? 'glass-button text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 glass rounded-xl text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white/30"
                required
              >
                <option value="" className="bg-gray-800">Select Category</option>
                {categories[formData.type].map((cat) => (
                  <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
                ))}
              </select>

              <input
                type="number"
                step="0.01"
                placeholder="Amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full p-3 glass rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                required
              />

              <input
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 glass rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                required
              />

              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-3 glass rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                required
              />

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-3 text-white/70 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 glass-button rounded-xl py-3 text-white font-medium"
                >
                  Add Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transactions List */}
      <div className="glass-card rounded-2xl p-6">
        <div className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 glass rounded-xl hover:bg-white/20 transition-all">
              <div className="flex items-center gap-4">
                <div className={`glass-button rounded-xl p-3 ${
                  transaction.type === 'income' ? 'text-green-300' : 'text-red-300'
                }`}>
                  {transaction.type === 'income' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-white font-medium">{transaction.description}</p>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <span>{transaction.category}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-lg font-bold ${
                  transaction.type === 'income' ? 'text-green-300' : 'text-red-300'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/60">No transactions found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
