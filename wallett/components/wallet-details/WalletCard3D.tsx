import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
  withSpring,
  interpolate,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Wallet } from '@/types';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 48;
const CARD_HEIGHT = 200;

// Format currency with the correct symbol
const formatCurrency = (value: number, currency: string): string => {
  if (currency === 'BTC') {
    return `R$ ${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  } else if (currency === 'ETH') {
    return `R$ ${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  } else {
    return `R$ ${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  }
};

interface PriceChangeProps {
  value: number;
  percentage: boolean;
}

const PriceChange: React.FC<PriceChangeProps> = ({ value, percentage }) => {
  const isPositive = value >= 0;
  const color = isPositive ? '#00FF9D' : '#FF5252';
  const prefix = isPositive ? '+' : '';

  return (
    <ThemedText style={[styles.priceChange, { color }]}>
      {prefix}R$ {Math.abs(value).toFixed(2)} {percentage && `(${prefix}${Math.abs(value / 100).toFixed(2)}%)`}
    </ThemedText>
  );
};

interface WalletCard3DProps {
  wallet: Wallet;
  priceChange: number;
}

const WalletCard3D: React.FC<WalletCard3DProps> = ({ wallet, priceChange }) => {
  // Animation values
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const scale = useSharedValue(0.95);
  const elevation = useSharedValue(0);
  
  // Card gradient colors based on trend
  const isPositive = priceChange >= 0;
  const gradientColors = isPositive 
    ? ['#151515', '#1c3231', '#193830'] 
    : ['#151515', '#2d1e29', '#31191b'];
  
  // Icon name based on currency
  const getIconName = (currency: string) => {
    switch(currency) {
      case 'BTC': return 'bitcoinsign.circle.fill';
      case 'ETH': return 'character.textbox';
      case 'SOL': return 'sparkles';
      default: return 'questionmark.circle';
    }
  };

  // Entry animation
  useEffect(() => {
    scale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withSpring(1, { damping: 12 })
    );
    elevation.value = withTiming(1, { duration: 500 });
  }, []);

  // Handle 3D rotation with gesture
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = rotateY.value;
      ctx.startY = rotateX.value;
    },
    onActive: (event, ctx) => {
      // Calculate rotation based on gesture movement
      rotateY.value = ctx.startX + event.translationX / 20;
      rotateX.value = ctx.startY - event.translationY / 30;
      // Limit rotation range
      rotateY.value = Math.min(Math.max(rotateY.value, -10), 10);
      rotateX.value = Math.min(Math.max(rotateX.value, -10), 10);
    },
    onEnd: () => {
      // Return to original position
      rotateY.value = withSpring(0, { damping: 15 });
      rotateX.value = withSpring(0, { damping: 15 });
    },
  });

  // Apply 3D perspective using animated styles
  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 800 },
        { scale: scale.value },
        { rotateX: `${rotateX.value}deg` },
        { rotateY: `${rotateY.value}deg` },
      ],
      shadowOpacity: interpolate(elevation.value, [0, 1], [0, 0.3]),
    };
  });

  // Allow tapping to trigger animation
  const handlePress = () => {
    scale.value = withSequence(
      withTiming(0.96, { duration: 100, easing: Easing.easeInOut }),
      withTiming(1, { duration: 300, easing: Easing.easeOut })
    );
    rotateY.value = withSequence(
      withTiming(4, { duration: 200 }),
      withTiming(-4, { duration: 300 }),
      withTiming(0, { duration: 200 })
    );
  };

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.cardWrapper, cardStyle]}>
        <Pressable onPress={handlePress}>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <ThemedView style={styles.header}>
              <ThemedView style={styles.currencyIconContainer}>
                <IconSymbol 
                  name={getIconName(wallet.currency) as any}
                  size={32} 
                  color="#FFFFFF"
                  style={styles.currencyIcon}
                />
              </ThemedView>
              <ThemedText style={styles.currencyName}>{wallet.name}</ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.balanceContainer}>
              <ThemedText style={styles.balance}>
                {formatCurrency(wallet.balance, wallet.currency)}
              </ThemedText>
              <PriceChange value={priceChange} percentage={true} />
            </ThemedView>
          </LinearGradient>
        </Pressable>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 10,
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    padding: 24,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  currencyIcon: {
    opacity: 0.9,
  },
  currencyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  balanceContainer: {
    marginTop: 'auto',
  },
  balance: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  priceChange: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default WalletCard3D; 