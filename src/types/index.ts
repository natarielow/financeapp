export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
}

export interface Investment {
  id: string;
  symbol: string;
  name: string;
  shares: number;
  purchasePrice: number;
  currentPrice: number;
  portfolioId: string;
  purchaseDate: string;
  investmentType: 'stock' | 'unit_trust' | 'etf' | 'bond' | 'crypto' | 'other';
}

export interface Portfolio {
  id: string;
  name: string;
  description: string;
  totalValue: number;
  totalGainLoss: number;
  investments: Investment[];
  provider: string;
  portfolioType: 'banking_app' | 'robo_advisor' | 'insurance_linked' | 'brokerage' | 'other';
  accountNumber?: string;
  lastUpdated: string;
}

export interface Budget {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  month: string;
}

export interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
}
