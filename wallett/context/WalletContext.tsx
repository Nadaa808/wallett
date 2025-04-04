import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { WalletState, WalletAction, Wallet } from '@/types';

// Initial state
const initialState: WalletState = {
  wallets: [],
  isLoading: false,
  error: null,
};

// Sample data
const sampleWallets: Wallet[] = [
  {
    id: '1',
    name: 'Bitcoin Wallet',
    address: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t',
    balance: 2.34,
    currency: 'BTC',
    icon: 'bitcoin',
  },
  {
    id: '2',
    name: 'Ethereum Wallet',
    address: '0x9s8r7q6p5o4n3m2l1k0j9i8h7g6f5e4d3c2b1a',
    balance: 15.67,
    currency: 'ETH',
    icon: 'ethereum',
  },
  {
    id: '3',
    name: 'Solana Wallet',
    address: '0x7y6u5i4o3p2a1s9d8f7g6h5j4k3l2z1x0c9v8b',
    balance: 123.45,
    currency: 'SOL',
    icon: 'solana',
  },
];

// Reducer function
const walletReducer = (state: WalletState, action: WalletAction): WalletState => {
  switch (action.type) {
    case 'FETCH_WALLETS_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'FETCH_WALLETS_SUCCESS':
      return {
        ...state,
        wallets: action.payload,
        isLoading: false,
      };
    case 'FETCH_WALLETS_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case 'ADD_WALLET':
      return {
        ...state,
        wallets: [...state.wallets, action.payload],
      };
    case 'REMOVE_WALLET':
      return {
        ...state,
        wallets: state.wallets.filter(wallet => wallet.id !== action.payload),
      };
    default:
      return state;
  }
};

// Context
interface WalletContextProps {
  state: WalletState;
  dispatch: React.Dispatch<WalletAction>;
  getWalletById: (id: string) => Wallet | undefined;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

// Provider component
interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  // Initialize with sample data
  React.useEffect(() => {
    dispatch({ type: 'FETCH_WALLETS_START' });
    
    // Simulate API fetch
    setTimeout(() => {
      dispatch({ type: 'FETCH_WALLETS_SUCCESS', payload: sampleWallets });
    }, 1000);
  }, []);

  // Helper function to get wallet by ID
  const getWalletById = (id: string) => {
    return state.wallets.find(wallet => wallet.id === id);
  };

  return (
    <WalletContext.Provider value={{ state, dispatch, getWalletById }}>
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook for using the wallet context
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}; 