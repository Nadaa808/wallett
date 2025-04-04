import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Wallet } from '@/types';
import { ThemedText } from '@/components/ThemedText';
import MaterialIcon, { mapWalletIconToMaterial } from '@/components/ui/MaterialIcons';

interface SimpleWalletListItemProps {
  wallet: Wallet;
}

const getCryptoIcon = (currency: string) => {
  switch (currency) {
    case 'BTC':
      return mapWalletIconToMaterial('bitcoin');
    case 'ETH':
      return mapWalletIconToMaterial('ethereum');
    case 'SOL':
      return mapWalletIconToMaterial('solana');
    default:
      return { name: 'help', type: 'material' as const };
  }
};

const SimpleWalletListItem: React.FC<SimpleWalletListItemProps> = ({ wallet }) => {
  const handlePress = () => {
    router.push(`/wallet/${wallet.id}` as any);
  };

  const iconDetails = getCryptoIcon(wallet.currency);
  const isNegative = Math.random() > 0.5; // Random for demo

  return (
    <View style={styles.surface}>
      <Pressable 
        style={({ pressed }) => [
          styles.container,
          pressed && styles.pressed
        ]}
        onPress={handlePress}
        android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', borderless: true }}
      >
        <View style={styles.row}>
          <View style={styles.leftContainer}>
            <View style={styles.iconContainer}>
              <MaterialIcon 
                name={iconDetails.name} 
                type={iconDetails.type}
                size={22} 
                color="#FFFFFF" 
              />
            </View>
            <ThemedText style={styles.walletName}>
              {wallet.name}
            </ThemedText>
          </View>
          
          <View style={styles.rightContainer}>
            <ThemedText style={styles.balance}>
              R$ {wallet.balance.toFixed(2)}
            </ThemedText>
            <ThemedText 
              style={[
                styles.change,
                isNegative ? styles.negative : styles.positive
              ]}
            >
              R$ {(Math.random() * 5).toFixed(2)} {isNegative ? '↓' : '↑'}
            </ThemedText>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  surface: {
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  container: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.9,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  walletName: {
    fontSize: 16,
    fontWeight: '500',
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  balance: {
    fontSize: 16,
    fontWeight: '600',
  },
  change: {
    fontSize: 14,
    marginTop: 2,
  },
  negative: {
    color: '#FF5252',
  },
  positive: {
    color: '#4CAF50',
  },
});

export default SimpleWalletListItem; 