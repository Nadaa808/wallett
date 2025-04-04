import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

// The available icon names in the wallet app
export type WalletIconName =
  | 'receive'
  | 'swap'
  | 'buy'
  | 'more'
  | 'bitcoin'
  | 'ethereum'
  | 'solana'
  | 'copy'
  | 'copied'
  | 'chart'
  | 'send'
  | 'share';

interface WalletIconProps {
  name: WalletIconName;
  size?: number;
  color?: string;
  style?: any;
}

/**
 * Maps our custom icon names to SFSymbols names to avoid type errors
 */
const mapIconNameToSFSymbol = (name: WalletIconName): any => {
  switch (name) {
    case 'receive':
      return 'qrcode';
    case 'swap':
      return 'arrow.2.squarepath';
    case 'buy':
      return 'cart';
    case 'more':
      return 'ellipsis';
    case 'bitcoin':
      return 'bitcoinsign.circle.fill';
    case 'ethereum':
      return 'character.textbox';
    case 'solana':
      return 'sparkles';
    case 'copy':
      return 'doc.on.doc.fill';
    case 'copied':
      return 'checkmark.circle.fill';
    case 'chart':
      return 'chart.xyaxis.line';
    case 'send':
      return 'arrow.up';
    case 'share':
      return 'paperplane.fill';
    default:
      return 'questionmark.circle';
  }
};

/**
 * A wrapper around IconSymbol to provide type-safe icons for the wallet app
 */
const WalletIcon: React.FC<WalletIconProps> = ({ 
  name, 
  size = 24, 
  color = '#FFFFFF',
  style
}) => {
  // Convert our custom icon name to a valid SFSymbol name
  const sfSymbolName = mapIconNameToSFSymbol(name);
  
  return (
    <IconSymbol
      name={sfSymbolName}
      size={size}
      color={color}
      style={style}
    />
  );
};

/**
 * A circular container with an icon inside
 */
interface CircleIconProps extends WalletIconProps {
  backgroundColor?: string;
  containerSize?: number;
}

export const CircleIcon: React.FC<CircleIconProps> = ({
  name,
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
      <WalletIcon 
        name={name} 
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

export default WalletIcon; 