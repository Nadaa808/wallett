import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 32;

interface WalletCardSimpleProps {
  name: string;
  balance: number;
  change: number;
  changePercent: number;
}

const WalletCardSimple: React.FC<WalletCardSimpleProps> = ({ 
  name, 
  balance, 
  change, 
  changePercent 
}) => {
  const isNegative = change < 0;
  
  return (
    <View style={styles.cardWrapper}>
      <LinearGradient
        colors={['#1B1B1B', '#101010']}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardContent}>
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <IconSymbol 
                name="character.textbox" 
                size={24} 
                color="white" 
              />
            </View>
            <ThemedText style={styles.walletName}>
              {name}
            </ThemedText>
          </View>
          
          <View style={styles.balanceSection}>
            <ThemedText style={styles.balance}>
              R$ {balance.toFixed(2)}
            </ThemedText>
            
            <View style={styles.changeContainer}>
              <ThemedText style={[
                styles.changeText, 
                { color: isNegative ? '#FF5252' : '#00FF9D' }
              ]}>
                R$ {Math.abs(change).toFixed(2)} ({isNegative ? '-' : '+'}{Math.abs(changePercent).toFixed(2)}%)
              </ThemedText>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    width: CARD_WIDTH,
    height: 170,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginVertical: 16,
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  walletName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  balanceSection: {
    marginTop: 'auto',
  },
  balance: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default WalletCardSimple; 