import React, { useCallback } from 'react';
import { FlatList, RefreshControl, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WalletListItem from './WalletListItem';
import { useWallet } from '@/context/WalletContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Wallet } from '@/types';

export default function WalletList() {
  const { state, dispatch } = useWallet();
  const { wallets, isLoading, error } = state;

  const handleRefresh = useCallback(() => {
    dispatch({ type: 'FETCH_WALLETS_START' });
    // Simulate API fetch
    setTimeout(() => {
      dispatch({ type: 'FETCH_WALLETS_SUCCESS', payload: wallets });
    }, 1000);
  }, [dispatch, wallets]);

  const renderItem = useCallback(({ item }: { item: Wallet }) => (
    <WalletListItem wallet={item} />
  ), []);

  const keyExtractor = useCallback((item: Wallet) => item.id, []);

  if (error) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText style={styles.errorText}>{error}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={wallets}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefresh}
          />
        }
        ListEmptyComponent={
          isLoading ? (
            <ThemedView style={styles.centered}>
              <ActivityIndicator size="large" />
            </ThemedView>
          ) : (
            <ThemedView style={styles.centered}>
              <ThemedText>No wallets found</ThemedText>
            </ThemedView>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
}); 