import React, { useState, useCallback } from 'react';
import { StyleSheet, TextInput, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { WalletProvider } from '@/context/WalletContext';
import { useWallet } from '@/context/WalletContext';
import WalletListItem from '@/components/wallet-list/WalletListItem';
import { Wallet } from '@/types';

function SearchContent() {
  const { state } = useWallet();
  const { wallets, isLoading } = state;
  const [searchText, setSearchText] = useState('');

  // Filter wallets based on search text
  const filteredWallets = wallets.filter(wallet => {
    const searchLower = searchText.toLowerCase();
    return (
      wallet.name.toLowerCase().includes(searchLower) ||
      wallet.address.toLowerCase().includes(searchLower) ||
      wallet.currency.toLowerCase().includes(searchLower)
    );
  });

  const renderItem = useCallback(({ item }: { item: Wallet }) => (
    <WalletListItem wallet={item} />
  ), []);

  const keyExtractor = useCallback((item: Wallet) => item.id, []);

  const handleClearSearch = () => {
    setSearchText('');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.searchContainer}>
        <IconSymbol name="magnifyingglass" size={20} color="#6E6E6E" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search wallets by name, address, or currency"
          placeholderTextColor="#6E6E6E"
          value={searchText}
          onChangeText={setSearchText}
          accessibilityLabel="Search wallets"
        />
        {searchText.length > 0 && (
          <TouchableOpacity 
            onPress={handleClearSearch}
            accessibilityLabel="Clear search"
          >
            <IconSymbol
              name="xmark.circle.fill"
              size={20}
              color="#6E6E6E"
              style={styles.clearIcon}
            />
          </TouchableOpacity>
        )}
      </ThemedView>

      <FlatList
        data={filteredWallets}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          isLoading ? (
            <ThemedView style={styles.centered}>
              <ActivityIndicator size="large" />
            </ThemedView>
          ) : (
            <ThemedView style={styles.centered}>
              <ThemedText>
                {searchText.length > 0
                  ? `No wallets found for "${searchText}"`
                  : 'No wallets available'}
              </ThemedText>
            </ThemedView>
          )
        }
      />
    </ThemedView>
  );
}

export default function SearchScreen() {
  return (
    <WalletProvider>
      <SafeAreaView style={styles.safeArea}>
        <Stack.Screen
          options={{
            title: 'Search Wallets',
            headerTitleAlign: 'center',
            headerShown: true,
          }}
        />
        <SearchContent />
      </SafeAreaView>
    </WalletProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  clearIcon: {
    marginLeft: 8,
  },
  listContent: {
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
