import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  Easing 
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH;
const CHART_HEIGHT = 120;

// Generate sample data points for the chart
const generateChartData = (trend: 'up' | 'down', points: number = 50): number[] => {
  const result: number[] = [];
  let value = 50;
  
  for (let i = 0; i < points; i++) {
    if (trend === 'up') {
      // Generate points that generally trend upward
      const change = Math.random() * 4 - 1.5;
      value += change;
    } else {
      // Generate points that generally trend downward
      const change = Math.random() * 4 - 2.5;
      value += change;
    }
    
    // Keep values within a reasonable range
    value = Math.max(20, Math.min(80, value));
    result.push(value);
  }
  
  return result;
};

// Create a path string from the data points
const createPath = (data: number[], width: number, height: number): string => {
  // Find the min and max values for scaling
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  // Map each data point to a point on the path
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  });
  
  // Create the SVG path data string
  return `M0,${height} L ${points.join(' L ')}`;
};

interface ChartPreviewProps {
  trend: 'up' | 'down';
}

const ChartPreview: React.FC<ChartPreviewProps> = ({ trend }) => {
  // Generate the chart data and path
  const data = generateChartData(trend);
  const pathData = createPath(data, CHART_WIDTH, CHART_HEIGHT);
  
  // Animation value
  const progress = useSharedValue(0);
  
  // Start the animation when the component mounts
  React.useEffect(() => {
    progress.value = withTiming(1, {
      duration: 1500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, []);
  
  // Animated style for the path
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [
        { translateX: (1 - progress.value) * CHART_WIDTH * 0.1 },
        { scaleX: progress.value }
      ]
    };
  });
  
  // Determine the color based on the trend
  const strokeColor = trend === 'up' ? '#00FF9D' : '#FF5252';
  
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.chartContainer, animatedStyle]}>
        <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
          <Path
            d={pathData}
            stroke={strokeColor}
            strokeWidth={2}
            fill="none"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 16,
    height: CHART_HEIGHT,
    width: '100%',
    overflow: 'hidden',
  },
  chartContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  }
});

export default ChartPreview; 