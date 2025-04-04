import React from 'react';
import { StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import WalletDetails from '@/components/wallet-details/WalletDetails';
import { ThemedView } from '@/components/ThemedView';
import { WalletProvider } from '@/context/WalletContext';

export default function WalletDetailScreen() {
  return (
    <WalletProvider>
      <ThemedView style={styles.container}>
        <Stack.Screen 
          options={{ 
            title: 'Wallet Details',
            headerTitleAlign: 'center',
            headerShown: true,
          }} 
        />
        <WalletDetails />
      </ThemedView>
    </WalletProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 