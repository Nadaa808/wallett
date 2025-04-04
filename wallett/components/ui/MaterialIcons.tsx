import React from 'react';
import { StyleSheet, View } from 'react-native';
import { 
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5
} from '@expo/vector-icons';

// The available icon names in the wallet app
export type IconType = 'material' | 'material-community' | 'ionicons' | 'fontawesome';

export interface MaterialIconProps {
  name: string;
  type?: IconType;
  size?: number;
  color?: string;
  style?: any;
}

/**
 * A unified icon component that supports multiple icon libraries
 */
const MaterialIcon: React.FC<MaterialIconProps> = ({ 
  name, 
  type = 'material', 
  size = 24, 
  color = '#FFFFFF',
  style
}) => {
  // Render the appropriate icon based on the type
  switch (type) {
    case 'material':
      return (
        <MaterialIcons 
          name={name as any} 
          size={size} 
          color={color} 
          style={style} 
        />
      );
    case 'material-community':
      return (
        <MaterialCommunityIcons 
          name={name as any} 
          size={size} 
          color={color} 
          style={style} 
        />
      );
    case 'ionicons':
      return (
        <Ionicons 
          name={name as any} 
          size={size} 
          color={color} 
          style={style} 
        />
      );
    case 'fontawesome':
      return (
        <FontAwesome5 
          name={name as any} 
          size={size} 
          color={color} 
          style={style} 
        />
      );
    default:
      return (
        <MaterialIcons 
          name="help" 
          size={size} 
          color={color} 
          style={style} 
        />
      );
  }
};

/**
 * Maps our wallet icons to the appropriate icon libraries
 */
export const mapWalletIconToMaterial = (iconName: string): { name: string; type: IconType } => {
  switch (iconName) {
    case 'receive':
      return { name: 'qr-code', type: 'material' };
    case 'swap':
      return { name: 'swap-horiz', type: 'material' };
    case 'buy':
      return { name: 'shopping-cart', type: 'material' };
    case 'more':
      return { name: 'more-horiz', type: 'material' };
    case 'bitcoin':
      return { name: 'bitcoin', type: 'fontawesome' };
    case 'ethereum':
      return { name: 'ethereum', type: 'fontawesome' };
    case 'solana':
      return { name: 'flash-on', type: 'material' };
    case 'copy':
      return { name: 'content-copy', type: 'material' };
    case 'copied':
      return { name: 'check-circle', type: 'material' };
    case 'chart':
      return { name: 'trending-up', type: 'material' };
    case 'send':
      return { name: 'send', type: 'material' };
    case 'share':
      return { name: 'share', type: 'material' };
    default:
      return { name: 'help', type: 'material' };
  }
};

/**
 * A circular container with an icon inside
 */
interface CircleIconProps extends MaterialIconProps {
  backgroundColor?: string;
  containerSize?: number;
}

export const CircleIcon: React.FC<CircleIconProps> = ({
  name,
  type,
  size,
  color,
  style,
  backgroundColor = '#6366F1',
  containerSize = 60
}) => {
  return (
    <View 
      style={[
        styles.circleContainer, 
        { 
          backgroundColor,
          width: containerSize,
          height: containerSize,
          borderRadius: containerSize / 2
        }
      ]}
    >
      <MaterialIcon 
        name={name} 
        type={type}
        size={size || containerSize * 0.45} 
        color={color} 
        style={style}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  }
});

export default MaterialIcon; 