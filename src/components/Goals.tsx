import React, { useState } from 'react';
import { Target, Plus, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { FinancialGoal } from '../types';

interface GoalsProps {
  goals: FinancialGoal[];
  addGoal: (goal: Omit<FinancialGoal, 'id'>) => void;
  updateGoal: (goalId: string, amount: number) => void;
}

const Goals: React.FC<GoalsProps> = ({ goals, addGoal, updateGoal }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showContributeModal, setShowContributeModal] = useState<string | null>(null);
  const [contributeAmount, setContributeAmount] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    category: ''
  });

  const categories = ['Savings', 'Travel', 'Transportation', 'Home', 'Education', 'Emergency', 'Other'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.targetAmount || !formData.deadline || !formData.category) return;

    addGoal({
      title: formData.title,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount) || 0,
      deadline: formData.deadline,
      category: formData.category
    });

    setFormData({
      title: '',
      targetAmount: '',
      currentAmount: '',
      deadline: '',
      category: ''
    });
    setShowAddForm(false);
  };

  const handleContribute = (goalId: string) => {
    if (!contributeAmount) return;
    updateGoal(goalId, parseFloat(contributeAmount));
    setContributeAmount('');
    setShowContributeModal(null);
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Financial Goals</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="glass-button rounded-xl px-6 py-3 text-white font-medium flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Goal
        </button>
      </div>

      {/* Goals Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="glass-button rounded-xl p-3">
              <Target className="w-6 h-6 text-blue-300" />
            </div>
            <h3 className="text-white font-medium">Total Goals</h3>
          </div>
          <p className="text-3xl font-bold text-white">{goals.length}</p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="glass-button rounded-xl p-3">
              <DollarSign className="w-6 h-6 text-green-300" />
            </div>
            <h3 className="text-white font-medium">Total Saved</h3>
          </div>
          <p className="text-3xl font-bold text-green-300">
            ${goals.reduce((sum, g) => sum + g.currentAmount, 0).toLocaleString()}
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="glass-button rounded-xl p-3">
              <TrendingUp className="w-6 h-6 text-purple-300" />
            </div>
            <h3 className="text-white font-medium">Target Amount</h3>
          </div>
          <p className="text-3xl font-bold text-white">
            ${goals.reduce((sum, g) => sum + g.targetAmount, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Goals List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const daysRemaining = getDaysRemaining(goal.deadline);
          const isCompleted = goal.currentAmount >= goal.targetAmount;

          return (
            <div key={goal.id} className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{goal.title}</h3>
                  <p className="text-white/60">{goal.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{progress.toFixed(1)}%</p>
                  <p className={`text-sm ${
                    daysRemaining < 0 ? 'text-red-300' : daysRemaining < 30 ? 'text-yellow-300' : 'text-green-300'
                  }`}>
                    {daysRemaining < 0 ? 'Overdue' : `${daysRemaining} days left`}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-white/70 mb-2">
                    <span>${goal.currentAmount.toLocaleString()}</span>
                    <span>${goal.targetAmount.toLocaleString()}</span>
                  </div>
                  <div className="glass rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isCompleted ? 'bg-green-400' : 'bg-blue-400'
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/60">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>
                  {!isCompleted && (
                    <button
                      onClick={() => setShowContributeModal(goal.id)}
                      className="glass-button rounded-lg px-4 py-2 text-white text-sm font-medium"
                    >
                      Contribute
                    </button>
                  )}
                </div>

                {isCompleted && (
                  <div className="flex items-center gap-2 text-green-300 bg-green-400/20 rounded-lg p-3">
                    <Target className="w-5 h-5" />
                    <span className="font-medium">Goal Completed! 🎉</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Goal Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-6">Add Financial Goal</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Goal title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 glass rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                required
              />

              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 glass rounded-xl text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white/30"
                required
              >
                <option value="" className="bg-gray-800">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
                ))}
              </select>

              <input
                type="number"
                step="0.01"
                placeholder="Target amount"
                value={formData.targetAmount}
                onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                className="w-full p-3 glass rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                required
              />

              <input
                type="number"
                step="0.01"
                placeholder="Current amount (optional)"
                value={formData.currentAmount}
                onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
                className="w-full p-3 glass rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />

              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
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
                  Add Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Contribute Modal */}
      {showContributeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-xl font-bold text-white mb-6">Contribute to Goal</h3>
            <div className="space-y-4">
              <input
                type="number"
                step="0.01"
                placeholder="Amount to contribute"
                value={contributeAmount}
                onChange={(e) => setContributeAmount(e.target.value)}
                className="w-full p-3 glass rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                autoFocus
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowContributeModal(null)}
                  className="flex-1 py-3 text-white/70 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleContribute(showContributeModal)}
                  className="flex-1 glass-button rounded-xl py-3 text-white font-medium"
                >
                  Contribute
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals;
