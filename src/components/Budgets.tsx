import React from 'react';
import { PieChart, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { Budget } from '../types';

interface BudgetsProps {
  budgets: Budget[];
}

const Budgets: React.FC<BudgetsProps> = ({ budgets }) => {
  const totalAllocated = budgets.reduce((sum, b) => sum + b.allocated, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const remainingBudget = totalAllocated - totalSpent;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Budget Overview</h2>
        <div className="glass-button rounded-xl px-4 py-2">
          <span className="text-white font-medium">January 2024</span>
        </div>
      </div>

      {/* Budget Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="glass-button rounded-xl p-3">
              <PieChart className="w-6 h-6 text-blue-300" />
            </div>
            <h3 className="text-white font-medium">Total Budget</h3>
          </div>
          <p className="text-3xl font-bold text-white">${totalAllocated.toLocaleString()}</p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="glass-button rounded-xl p-3">
              <TrendingUp className="w-6 h-6 text-red-300" />
            </div>
            <h3 className="text-white font-medium">Total Spent</h3>
          </div>
          <p className="text-3xl font-bold text-red-300">${totalSpent.toLocaleString()}</p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="glass-button rounded-xl p-3">
              <CheckCircle className="w-6 h-6 text-green-300" />
            </div>
            <h3 className="text-white font-medium">Remaining</h3>
          </div>
          <p className="text-3xl font-bold text-green-300">${remainingBudget.toLocaleString()}</p>
        </div>
      </div>

      {/* Budget Categories */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Budget Categories</h3>
        <div className="space-y-6">
          {budgets.map((budget) => {
            const spentPercentage = (budget.spent / budget.allocated) * 100;
            const isOverBudget = budget.spent > budget.allocated;
            const remaining = budget.allocated - budget.spent;

            return (
              <div key={budget.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h4 className="text-white font-medium">{budget.category}</h4>
                    {isOverBudget ? (
                      <AlertCircle className="w-5 h-5 text-red-300" />
                    ) : spentPercentage > 80 ? (
                      <AlertCircle className="w-5 h-5 text-yellow-300" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-300" />
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">
                      ${budget.spent.toLocaleString()} / ${budget.allocated.toLocaleString()}
                    </p>
                    <p className={`text-sm ${
                      isOverBudget ? 'text-red-300' : remaining < budget.allocated * 0.2 ? 'text-yellow-300' : 'text-green-300'
                    }`}>
                      {isOverBudget ? 'Over by' : 'Remaining'}: ${Math.abs(remaining).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="glass rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isOverBudget 
                        ? 'bg-red-400' 
                        : spentPercentage > 80 
                        ? 'bg-yellow-400' 
                        : 'bg-green-400'
                    }`}
                    style={{ width: `${Math.min(spentPercentage, 100)}%` }}
                  />
                </div>

                <div className="flex justify-between text-sm text-white/60">
                  <span>0%</span>
                  <span className={`font-medium ${
                    isOverBudget ? 'text-red-300' : 'text-white'
                  }`}>
                    {spentPercentage.toFixed(1)}%
                  </span>
                  <span>100%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Budget Tips */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Budget Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span className="text-white font-medium">On Track</span>
            </div>
            <p className="text-white/70 text-sm">
              You're staying within budget for {budgets.filter(b => b.spent <= b.allocated).length} out of {budgets.length} categories.
            </p>
          </div>
          
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-300" />
              <span className="text-white font-medium">Savings Rate</span>
            </div>
            <p className="text-white/70 text-sm">
              You've saved {((remainingBudget / totalAllocated) * 100).toFixed(1)}% of your total budget this month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budgets;
