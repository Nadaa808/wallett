import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  Easing 
} from 'react-native-reanimated';
import { Path, Svg } from 'react-native-svg';
import { ThemedView } from '@/components/ThemedView';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 40;
const CHART_HEIGHT = 180;

// Generate sample chart data
const generateChartData = (points: number, trend: 'up' | 'down' | 'mixed'): number[] => {
  let data: number[] = [];
  const startValue = 50;
  let currentValue = startValue;
  
  for (let i = 0; i < points; i++) {
    if (trend === 'up') {
      const change = Math.random() * 5 - 1.5; // More likely to go up
      currentValue += change;
    } else if (trend === 'down') {
      const change = Math.random() * 5 - 3.5; // More likely to go down
      currentValue += change;
    } else { // mixed
      const change = Math.random() * 8 - 4;
      currentValue += change;
    }
    
    // Keep values within chart range
    currentValue = Math.max(10, Math.min(90, currentValue));
    data.push(currentValue);
  }
  
  return data;
};

// Create SVG path from data points
const createPath = (data: number[], width: number, height: number): string => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  // Map points to SVG coordinates
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  });
  
  return `M 0,${height} L ${points.join(' L ')} L ${width},${height} Z`;
};

interface PriceChartProps {
  currency: string;
  trend: 'up' | 'down';
}

const PriceChart: React.FC<PriceChartProps> = ({ currency, trend }) => {
  const animatedHeight = useSharedValue(0);
  const animatedOpacity = useSharedValue(0);
  
  // Generate simulated chart data
  const chartData = generateChartData(50, trend);
  const pathD = createPath(chartData, CHART_WIDTH, CHART_HEIGHT);
  
  // Animate chart appearance
  useEffect(() => {
    animatedHeight.value = withTiming(1, {
      duration: 1000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    
    animatedOpacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [currency]);
  
  const chartStyle = useAnimatedStyle(() => {
    return {
      height: CHART_HEIGHT * animatedHeight.value,
      opacity: animatedOpacity.value,
    };
  });

  // Determine chart color based on trend
  const chartColor = trend === 'up' ? '#00FF9D' : '#FF5252';
  const gradientId = `gradient-${currency}`;
  
  return (
    <ThemedView style={styles.container}>
      <Animated.View style={[styles.chartContainer, chartStyle]}>
        <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={chartColor} stopOpacity="0.3" />
              <stop offset="1" stopColor={chartColor} stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <Path
            d={pathD}
            fill={`url(#${gradientId})`}
            stroke={chartColor}
            strokeWidth={2}
          />
        </Svg>
      </Animated.View>
      
      <View style={styles.timeFrameContainer}>
        {['1H', '1D', '1W', '1M', 'YTD', 'ALL'].map((timeFrame) => (
          <ThemedView 
            key={timeFrame} 
            style={[
              styles.timeFrameButton, 
              timeFrame === '1D' && styles.selectedTimeFrame
            ]}
          >
            <Animated.Text 
              style={[
                styles.timeFrameText,
                timeFrame === '1D' && { color: chartColor }
              ]}
            >
              {timeFrame}
            </Animated.Text>
          </ThemedView>
        ))}
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
  chartContainer: {
    width: CHART_WIDTH,
    height: CHART_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 8,
  },
  timeFrameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
  },
  timeFrameButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  selectedTimeFrame: {
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
  },
  timeFrameText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default PriceChart; 