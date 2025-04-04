// Wallet interface
export interface Wallet {
  id: string;
  name: string;
  address: string;
  balance: number;
  currency: string;
  icon: string;
}

// Shortened wallet data for the list view
export interface WalletListItem {
  id: string;
  name: string;
  shortAddress: string;
  balance: number;
  currency: string;
  icon: string;
}

// State context types
export interface WalletState {
  wallets: Wallet[];
  isLoading: boolean;
  error: string | null;
}

export type WalletAction =
  | { type: 'FETCH_WALLETS_START' }
  | { type: 'FETCH_WALLETS_SUCCESS'; payload: Wallet[] }
  | { type: 'FETCH_WALLETS_ERROR'; payload: string }
  | { type: 'ADD_WALLET'; payload: Wallet }
  | { type: 'REMOVE_WALLET'; payload: string }; 