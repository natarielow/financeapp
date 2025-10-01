import { useState, useEffect } from 'react';
import { Transaction, Portfolio, Budget, FinancialGoal, Investment } from '../types';

export const useFinanceData = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [goals, setGoals] = useState<FinancialGoal[]>([]);

  useEffect(() => {
    // Initialize with sample data
    const sampleTransactions: Transaction[] = [
      {
        id: '1',
        type: 'income',
        category: 'Salary',
        amount: 5000,
        description: 'Monthly salary',
        date: '2024-01-15'
      },
      {
        id: '2',
        type: 'expense',
        category: 'Food',
        amount: 450,
        description: 'Groceries and dining',
        date: '2024-01-14'
      },
      {
        id: '3',
        type: 'expense',
        category: 'Transportation',
        amount: 120,
        description: 'Gas and parking',
        date: '2024-01-13'
      },
      {
        id: '4',
        type: 'expense',
        category: 'Entertainment',
        amount: 200,
        description: 'Movies and subscriptions',
        date: '2024-01-12'
      },
      {
        id: '5',
        type: 'income',
        category: 'Freelance',
        amount: 800,
        description: 'Web development project',
        date: '2024-01-10'
      }
    ];

    const sampleInvestments: Investment[] = [
      {
        id: '1',
        symbol: 'FSMONE-SG',
        name: 'FSM One Singapore Growth Fund',
        shares: 1000,
        purchasePrice: 1.25,
        currentPrice: 1.45,
        portfolioId: '1',
        purchaseDate: '2023-12-01',
        investmentType: 'unit_trust'
      },
      {
        id: '2',
        symbol: 'FSMONE-ASIA',
        name: 'FSM One Asia Pacific Fund',
        shares: 800,
        purchasePrice: 1.80,
        currentPrice: 1.95,
        portfolioId: '1',
        purchaseDate: '2023-11-15',
        investmentType: 'unit_trust'
      },
      {
        id: '3',
        symbol: 'STASHAWAY-CORE',
        name: 'StashAway Core Portfolio',
        shares: 1,
        purchasePrice: 15000,
        currentPrice: 15800,
        portfolioId: '2',
        purchaseDate: '2023-10-20',
        investmentType: 'etf'
      },
      {
        id: '4',
        symbol: 'GE-ILPFUND',
        name: 'Great Eastern ILP Growth Fund',
        shares: 5000,
        purchasePrice: 2.20,
        currentPrice: 2.35,
        portfolioId: '3',
        purchaseDate: '2023-09-10',
        investmentType: 'unit_trust'
      }
    ];

    const samplePortfolios: Portfolio[] = [
      {
        id: '1',
        name: 'DBS Unit Trusts',
        description: 'Unit trust investments through DBS banking app',
        totalValue: 2360,
        totalGainLoss: 320,
        investments: sampleInvestments.filter(inv => inv.portfolioId === '1'),
        provider: 'DBS Bank',
        portfolioType: 'banking_app',
        accountNumber: 'DBS-123456789',
        lastUpdated: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        name: 'StashAway Portfolio',
        description: 'Robo-advisor diversified portfolio',
        totalValue: 15800,
        totalGainLoss: 800,
        investments: sampleInvestments.filter(inv => inv.portfolioId === '2'),
        provider: 'StashAway',
        portfolioType: 'robo_advisor',
        accountNumber: 'SA-987654321',
        lastUpdated: '2024-01-14T16:45:00Z'
      },
      {
        id: '3',
        name: 'Great Eastern ILP',
        description: 'Investment-linked insurance plan',
        totalValue: 11750,
        totalGainLoss: 750,
        investments: sampleInvestments.filter(inv => inv.portfolioId === '3'),
        provider: 'Great Eastern',
        portfolioType: 'insurance_linked',
        accountNumber: 'GE-ILP-456789',
        lastUpdated: '2024-01-13T09:15:00Z'
      }
    ];

    const sampleBudgets: Budget[] = [
      {
        id: '1',
        category: 'Food',
        allocated: 600,
        spent: 450,
        month: '2024-01'
      },
      {
        id: '2',
        category: 'Transportation',
        allocated: 200,
        spent: 120,
        month: '2024-01'
      },
      {
        id: '3',
        category: 'Entertainment',
        allocated: 300,
        spent: 200,
        month: '2024-01'
      },
      {
        id: '4',
        category: 'Utilities',
        allocated: 250,
        spent: 180,
        month: '2024-01'
      }
    ];

    const sampleGoals: FinancialGoal[] = [
      {
        id: '1',
        title: 'Emergency Fund',
        targetAmount: 10000,
        currentAmount: 6500,
        deadline: '2024-12-31',
        category: 'Savings'
      },
      {
        id: '2',
        title: 'Vacation Fund',
        targetAmount: 3000,
        currentAmount: 1200,
        deadline: '2024-06-30',
        category: 'Travel'
      },
      {
        id: '3',
        title: 'New Car',
        targetAmount: 25000,
        currentAmount: 8500,
        deadline: '2025-03-31',
        category: 'Transportation'
      }
    ];

    setTransactions(sampleTransactions);
    setPortfolios(samplePortfolios);
    setBudgets(sampleBudgets);
    setGoals(sampleGoals);
  }, []);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString()
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const addPortfolio = (portfolio: Omit<Portfolio, 'id' | 'lastUpdated'>) => {
    const newPortfolio = {
      ...portfolio,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString()
    };
    setPortfolios(prev => [...prev, newPortfolio]);
  };

  const addInvestment = (investment: Omit<Investment, 'id'>) => {
    const newInvestment = {
      ...investment,
      id: Date.now().toString()
    };

    // Add investment to the portfolio
    setPortfolios(prev => prev.map(portfolio => {
      if (portfolio.id === investment.portfolioId) {
        const updatedInvestments = [...portfolio.investments, newInvestment];
        const totalValue = updatedInvestments.reduce((sum, inv) => sum + (inv.shares * inv.currentPrice), 0);
        const totalCost = updatedInvestments.reduce((sum, inv) => sum + (inv.shares * inv.purchasePrice), 0);
        const totalGainLoss = totalValue - totalCost;

        return {
          ...portfolio,
          investments: updatedInvestments,
          totalValue,
          totalGainLoss,
          lastUpdated: new Date().toISOString()
        };
      }
      return portfolio;
    }));
  };

  const updatePortfolio = (portfolioId: string, updates: Partial<Portfolio>) => {
    setPortfolios(prev => prev.map(portfolio => 
      portfolio.id === portfolioId 
        ? { ...portfolio, ...updates, lastUpdated: new Date().toISOString() }
        : portfolio
    ));
  };

  const updateInvestment = (portfolioId: string, investmentId: string, updates: Partial<Investment>) => {
    setPortfolios(prev => prev.map(portfolio => {
      if (portfolio.id === portfolioId) {
        const updatedInvestments = portfolio.investments.map(investment =>
          investment.id === investmentId ? { ...investment, ...updates } : investment
        );
        
        return {
          ...portfolio,
          investments: updatedInvestments,
          lastUpdated: new Date().toISOString()
        };
      }
      return portfolio;
    }));
  };

  const deletePortfolio = (portfolioId: string) => {
    setPortfolios(prev => prev.filter(portfolio => portfolio.id !== portfolioId));
  };

  const deleteInvestment = (portfolioId: string, investmentId: string) => {
    setPortfolios(prev => prev.map(portfolio => {
      if (portfolio.id === portfolioId) {
        const updatedInvestments = portfolio.investments.filter(investment => investment.id !== investmentId);
        const totalValue = updatedInvestments.reduce((sum, inv) => sum + (inv.shares * inv.currentPrice), 0);
        const totalCost = updatedInvestments.reduce((sum, inv) => sum + (inv.shares * inv.purchasePrice), 0);
        const totalGainLoss = totalValue - totalCost;

        return {
          ...portfolio,
          investments: updatedInvestments,
          totalValue,
          totalGainLoss,
          lastUpdated: new Date().toISOString()
        };
      }
      return portfolio;
    }));
  };

  const addGoal = (goal: Omit<FinancialGoal, 'id'>) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString()
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoal = (goalId: string, amount: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, currentAmount: Math.min(goal.targetAmount, goal.currentAmount + amount) }
        : goal
    ));
  };

  return {
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
  };
};
