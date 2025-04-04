import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams } from 'expo-router';
import { useWallet } from '@/context/WalletContext';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import WalletCard3D from './WalletCard3D';
import PriceChart from './PriceChart';
import FeatureButtons from './FeatureButtons';
import TransactionHistory from './TransactionHistory';

export default function WalletDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getWalletById } = useWallet();
  const [isCopied, setIsCopied] = useState(false);
  
  const wallet = getWalletById(id);

  // Mock price change data
  const getPriceChangeData = (currency: string) => {
    switch(currency) {
      case 'BTC':
        return -1162.17;
      case 'ETH':
        return -26.87;
      case 'SOL':
        return 0.28;
      default:
        return Math.random() > 0.5 ? 10.5 : -10.5;
    }
  };

  if (!wallet) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedView style={styles.centered}>
          <ActivityIndicator size="large" />
          <ThemedText style={styles.loadingText}>Loading wallet details...</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  const priceChangeValue = getPriceChangeData(wallet.currency);
  const isTrendUp = priceChangeValue >= 0;

  const handleCopyAddress = async () => {
    await Clipboard.setStringAsync(wallet.address);
    setIsCopied(true);
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.content}>
          {/* 3D Card */}
          <ThemedView style={styles.cardContainer}>
            <WalletCard3D 
              wallet={wallet} 
              priceChange={priceChangeValue} 
            />
          </ThemedView>

          {/* Feature Buttons */}
          <FeatureButtons />
          
          {/* Price Chart */}
          <PriceChart 
            currency={wallet.currency} 
            trend={isTrendUp ? 'up' : 'down'} 
          />
          
          {/* Transaction History */}
          <TransactionHistory currency={wallet.currency} />
          
          {/* Address Section */}
          <ThemedView style={styles.section}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Wallet Address
            </ThemedText>
            <ThemedView style={styles.addressContainer}>
              <ThemedText style={styles.address} selectable>
                {wallet.address}
              </ThemedText>
            </ThemedView>
            
            <TouchableOpacity 
              style={styles.copyButton}
              onPress={handleCopyAddress}
              accessibilityRole="button"
              accessibilityLabel="Copy wallet address to clipboard"
            >
              <IconSymbol 
                name={isCopied ? "checkmark.circle.fill" : "doc.on.doc.fill"} 
                size={20} 
                color={isCopied ? "#4CAF50" : "#6E6E6E"} 
                style={styles.copyIcon}
              />
              <ThemedText style={styles.copyText}>
                {isCopied ? "Copied!" : "Copy Address"}
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
  },
  cardContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  section: {
    marginTop: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  addressContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  address: {
    fontSize: 16,
    lineHeight: 24,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  copyIcon: {
    marginRight: 8,
  },
  copyText: {
    fontSize: 14,
    fontWeight: '600',
  },
}); 