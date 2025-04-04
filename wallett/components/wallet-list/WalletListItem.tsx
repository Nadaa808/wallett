import React, { memo } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Wallet } from '@/types';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface WalletListItemProps {
  wallet: Wallet;
}

// Helper function to shorten wallet address
const shortenAddress = (address: string): string => {
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
};

function WalletListItem({ wallet }: WalletListItemProps) {
  const handlePress = () => {
    // For simplicity, use string-based navigation
    router.push(`/wallet/${wallet.id}` as any);
  };

  return (
    <Pressable 
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${wallet.name} wallet with ${wallet.balance} ${wallet.currency}`}
    >
      <ThemedView style={styles.content}>
        <ThemedView style={styles.iconContainer}>
          <IconSymbol 
            name={wallet.icon === 'bitcoin' ? 'chart.pie.fill' : 
                wallet.icon === 'ethereum' ? 'chart.bar.fill' : 
                'chart.line.uptrend.xyaxis.circle.fill'} 
            size={40} 
            color={wallet.icon === 'bitcoin' ? '#f7931a' : 
                wallet.icon === 'ethereum' ? '#627eea' : 
                '#00ffbd'} 
          />
        </ThemedView>
        
        <ThemedView style={styles.textContainer}>
          <ThemedText type="defaultSemiBold" style={styles.name}>
            {wallet.name}
          </ThemedText>
          <ThemedText style={styles.address}>
            {shortenAddress(wallet.address)}
          </ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.balanceContainer}>
          <ThemedText type="defaultSemiBold" style={styles.balance}>
            {wallet.balance.toFixed(2)} {wallet.currency}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.7,
  },
  content: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderRadius: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    opacity: 0.7,
  },
  balanceContainer: {
    alignItems: 'flex-end',
  },
  balance: {
    fontSize: 16,
  },
});

export default memo(WalletListItem); 