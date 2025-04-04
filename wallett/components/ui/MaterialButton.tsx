import React from 'react';
import { StyleSheet, View, Pressable, Text, Dimensions } from 'react-native';
import * as Haptics from 'expo-haptics';
import MaterialIcon from './MaterialIcons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface MaterialButtonProps {
  label: string;
  onPress: () => void;
  mode?: 'text' | 'outlined' | 'contained' | 'elevated';
  icon?: string;
  iconType?: 'material' | 'material-community' | 'ionicons' | 'fontawesome';
  color?: string;
  textColor?: string;
  disabled?: boolean;
  loading?: boolean;
  style?: any;
  contentStyle?: any;
}

/**
 * A material-design inspired button component with haptic feedback
 */
const MaterialButton: React.FC<MaterialButtonProps> = ({
  label,
  onPress,
  mode = 'contained',
  icon,
  iconType = 'material',
  color = '#6366F1',
  textColor = '#FFFFFF',
  disabled = false,
  loading = false,
  style,
  contentStyle,
}) => {
  const handlePress = () => {
    // Provide haptic feedback when button is pressed
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  // Styles based on button mode
  const getButtonStyle = () => {
    switch (mode) {
      case 'text':
        return { backgroundColor: 'transparent' };
      case 'outlined':
        return { 
          backgroundColor: 'transparent', 
          borderWidth: 1, 
          borderColor: color 
        };
      case 'elevated':
        return { 
          backgroundColor: color,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        };
      case 'contained':
      default:
        return { backgroundColor: color };
    }
  };

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          getButtonStyle(),
          { opacity: pressed ? 0.8 : 1 },
          style
        ]}
        onPress={handlePress}
        disabled={disabled || loading}
      >
        <View style={[styles.buttonContent, contentStyle]}>
          {icon && (
            <View style={styles.iconContainer}>
              <MaterialIcon 
                name={icon} 
                type={iconType} 
                size={20} 
                color={textColor}
              />
            </View>
          )}
          <Text style={[styles.buttonLabel, { color: textColor }]}>
            {loading ? 'Loading...' : label}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 8,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 4,
  },
  buttonContent: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  iconContainer: {
    marginRight: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MaterialButton; 