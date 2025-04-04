import React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withSequence,
  withDelay
} from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ActionButtonProps {
  icon: string;
  label: string;
  onPress: () => void;
  delay: number;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, onPress, delay }) => {
  const scale = useSharedValue(0.8);
  
  // Animation for button appearance
  React.useEffect(() => {
    scale.value = withDelay(
      delay, 
      withSequence(
        withSpring(1.1, { damping: 10 }),
        withSpring(1, { damping: 15 })
      )
    );
  }, []);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    };
  });
  
  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.95, { damping: 10 }),
      withSpring(1, { damping: 15 })
    );
    onPress();
  };
  
  return (
    <Animated.View style={[styles.buttonContainer, animatedStyle]}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={handlePress}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={label}
      >
        <ThemedView style={styles.iconContainer}>
          <IconSymbol name={icon} size={28} color="#FFFFFF" />
        </ThemedView>
        <ThemedText style={styles.buttonText}>{label}</ThemedText>
      </TouchableOpacity>
    </Animated.View>
  );
};

interface WalletActionsProps {
  currency: string;
}

const WalletActions: React.FC<WalletActionsProps> = ({ currency }) => {
  // Define wallet actions based on currency
  const actions = React.useMemo(() => {
    const baseActions = [
      {
        icon: 'qrcode',
        label: 'Receive',
        onPress: () => console.log('Receive'),
      },
      {
        icon: 'arrow.2.squarepath',
        label: 'Swap',
        onPress: () => console.log('Swap'),
      },
      {
        icon: 'dollarsign',
        label: 'Cash Buy',
        onPress: () => console.log('Cash Buy'),
      }
    ];
    
    // Add special actions for specific cryptocurrencies
    if (currency === 'BTC') {
      baseActions.push({
        icon: 'paperplane.fill',
        label: 'Share',
        onPress: () => console.log('Share'),
      });
    } else {
      baseActions.push({
        icon: 'ellipsis',
        label: 'More',
        onPress: () => console.log('More'),
      });
    }
    
    return baseActions;
  }, [currency]);
  
  return (
    <ThemedView style={styles.container}>
      {actions.map((action, index) => (
        <ActionButton 
          key={action.label}
          icon={action.icon}
          label={action.label}
          onPress={action.onPress}
          delay={index * 100} // Stagger animation
        />
      ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    alignItems: 'center',
    width: (SCREEN_WIDTH - 64) / 4,
  },
  button: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#5D5FEF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default WalletActions; 