import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';

import WalletCardSimple from '@/components/wallet-details/WalletCardSimple';
import FeatureButtons from '@/components/wallet-details/FeatureButtons';
import ChartPreview from '@/components/wallet-details/ChartPreview';
import { ThemedView } from '@/components/ThemedView';
import { WalletProvider } from '@/context/WalletContext';

export default function HomeScreen() {
  // Mock wallet data for the screen
  const walletData = {
    name: 'Ethereum Wallet',
    balance: 15.67, 
    change: -26.87,
    changePercent: 0.27
  };

  return (
    <WalletProvider>
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ 
          title: 'Home',
          headerShown: false,
        }} />
        
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Wallet Card */}
            <View style={styles.cardContainer}>
              <WalletCardSimple 
                name={walletData.name}
                balance={walletData.balance}
                change={walletData.change}
                changePercent={walletData.changePercent}
              />
            </View>

            {/* Feature Buttons */}
            <FeatureButtons />
            
            {/* Chart Preview */}
            <View style={styles.chartContainer}>
              <ChartPreview trend="down" />
            </View>
          </ScrollView>
        </SafeAreaView>
      </ThemedView>
    </WalletProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  cardContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  chartContainer: {
    marginTop: 16,
  },
});
