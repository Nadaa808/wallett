import React from 'react';
import { StyleSheet, View, Pressable, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import MaterialIcon, { CircleIcon, mapWalletIconToMaterial } from '@/components/ui/MaterialIcons';
import * as Haptics from 'expo-haptics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface FeatureButtonProps {
  iconName: string;
  label: string;
  onPress: () => void;
}

const FeatureButton: React.FC<FeatureButtonProps> = ({ iconName, label, onPress }) => {
  const scale = useSharedValue(1);
  
  // Handle button press animation
  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.9, { damping: 10 }),
      withSpring(1, { damping: 15 })
    );
    
    // Add haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  // Map our icon name to material icon details
  const iconDetails = mapWalletIconToMaterial(iconName);

  return (
    <View style={styles.buttonWrapper}>
      <Animated.View style={animatedStyle}>
        <Pressable 
          style={({ pressed }) => [
            styles.touchableArea,
            pressed && styles.pressed
          ]}
          onPress={handlePress}
          android_ripple={{ color: 'rgba(255, 255, 255, 0.2)', borderless: true }}
        >
          <CircleIcon 
            name={iconDetails.name} 
            type={iconDetails.type}
            containerSize={58}
            backgroundColor="#6366F1"
            color="#FFFFFF"
          />
        </Pressable>
      </Animated.View>
      <ThemedText style={styles.buttonLabel}>{label}</ThemedText>
    </View>
  );
};

const FeatureButtons: React.FC = () => {
  const features = [
    {
      iconName: 'receive',
      label: 'Receive',
      onPress: () => console.log('Receive pressed')
    },
    {
      iconName: 'swap',
      label: 'Swap',
      onPress: () => console.log('Swap pressed')
    },
    {
      iconName: 'buy',
      label: 'Cash Buy',
      onPress: () => console.log('Cash Buy pressed')
    },
    {
      iconName: 'more',
      label: 'More',
      onPress: () => console.log('More pressed')
    }
  ];

  return (
    <View style={styles.container}>
      {features.map((feature) => (
        <FeatureButton 
          key={feature.label}
          iconName={feature.iconName} 
          label={feature.label}
          onPress={feature.onPress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    width: '100%'
  },
  buttonWrapper: {
    alignItems: 'center',
    width: (SCREEN_WIDTH - 80) / 4,
  },
  touchableArea: {
    borderRadius: 30,
    marginBottom: 8,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.8,
  },
  buttonLabel: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  }
});

export default FeatureButtons; 