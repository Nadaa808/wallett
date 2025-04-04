import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

// Transaction types
type TransactionType = 'sent' | 'received' | 'swap' | 'buy';

interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  amount: number;
  currency: string;
  address: string;
  status: 'completed' | 'pending' | 'failed';
}

// Generate mock transactions
const generateTransactions = (currency: string): Transaction[] => {
  const types: TransactionType[] = ['sent', 'received', 'swap', 'buy'];
  const dates = [
    '2023-04-15',
    '2023-04-10',
    '2023-04-05',
    '2023-03-29',
    '2023-03-22',
  ];
  
  return Array.from({ length: 5 }, (_, i) => ({
    id: `tx-${i}`,
    date: dates[i],
    type: types[Math.floor(Math.random() * types.length)],
    amount: parseFloat((Math.random() * (i === 0 ? 0.1 : 1)).toFixed(4)),
    currency,
    address: `0x${Math.random().toString(16).substring(2, 14)}...${Math.random().toString(16).substring(2, 6)}`,
    status: i === 1 ? 'pending' : i === 4 ? 'failed' : 'completed',
  }));
};

const getTransactionIcon = (type: TransactionType) => {
  switch (type) {
    case 'sent':
      return { name: 'arrow.up', color: '#FF5252' };
    case 'received':
      return { name: 'arrow.down', color: '#00FF9D' };
    case 'swap':
      return { name: 'arrow.2.squarepath', color: '#627eea' };
    case 'buy':
      return { name: 'cart', color: '#f7931a' };
  }
};

interface TransactionItemProps {
  transaction: Transaction;
  index: number;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, index }) => {
  const { name, color } = getTransactionIcon(transaction.type);
  
  const getTransactionTitle = () => {
    switch (transaction.type) {
      case 'sent':
        return `Sent ${transaction.currency}`;
      case 'received':
        return `Received ${transaction.currency}`;
      case 'swap':
        return `Swapped for ${transaction.currency}`;
      case 'buy':
        return `Bought ${transaction.currency}`;
    }
  };

  return (
    <Animated.View 
      entering={FadeInDown.delay(index * 100).springify()}
      style={styles.transactionContainer}
    >
      <ThemedView style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
        <IconSymbol name={name as any} size={22} color={color} />
      </ThemedView>
      
      <ThemedView style={styles.transactionDetails}>
        <ThemedView style={styles.transactionRow}>
          <ThemedText style={styles.transactionTitle}>
            {getTransactionTitle()}
          </ThemedText>
          <ThemedText 
            style={[
              styles.transactionAmount, 
              { color: transaction.type === 'sent' ? '#FF5252' : undefined }
            ]}
          >
            {transaction.type === 'sent' ? '-' : '+'}{transaction.amount} {transaction.currency}
          </ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.transactionRow}>
          <ThemedText style={styles.transactionDate}>
            {transaction.date}
          </ThemedText>
          <ThemedText 
            style={[
              styles.transactionStatus,
              {
                color: transaction.status === 'completed' 
                  ? '#00FF9D' 
                  : transaction.status === 'failed' 
                  ? '#FF5252' 
                  : '#F7931A'
              }
            ]}
          >
            {transaction.status}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </Animated.View>
  );
};

interface TransactionHistoryProps {
  currency: string;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ currency }) => {
  const transactions = generateTransactions(currency);
  
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="defaultSemiBold" style={styles.title}>
        Transaction History
      </ThemedText>
      
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TransactionItem transaction={item} index={index} />
        )}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
  },
  listContent: {
    gap: 12,
  },
  transactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  transactionDate: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
  transactionStatus: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
});

export default TransactionHistory; 