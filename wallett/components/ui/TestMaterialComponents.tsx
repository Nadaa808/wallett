import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import MaterialButton from './MaterialButton';
import MaterialIcon, { CircleIcon } from './MaterialIcons';

const TestMaterialComponents: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ThemedText style={styles.title}>Material Icons</ThemedText>
      <View style={styles.row}>
        <View style={styles.iconExample}>
          <MaterialIcon 
            name="qr-code" 
            size={24} 
            color="#6366F1" 
          />
          <ThemedText style={styles.iconLabel}>Material</ThemedText>
        </View>
        
        <View style={styles.iconExample}>
          <MaterialIcon 
            name="ethereum" 
            type="fontawesome"
            size={24} 
            color="#FFD700" 
          />
          <ThemedText style={styles.iconLabel}>FontAwesome</ThemedText>
        </View>
        
        <View style={styles.iconExample}>
          <MaterialIcon 
            name="wallet" 
            type="material-community"
            size={24} 
            color="#FF5252" 
          />
          <ThemedText style={styles.iconLabel}>Community</ThemedText>
        </View>
      </View>
      
      <ThemedText style={styles.title}>Circle Icons</ThemedText>
      <View style={styles.row}>
        <CircleIcon 
          name="qr-code" 
          containerSize={50}
          backgroundColor="#6366F1"
        />
        
        <CircleIcon 
          name="ethereum"
          type="fontawesome" 
          containerSize={50}
          backgroundColor="#FFD700"
        />
        
        <CircleIcon 
          name="wallet"
          type="material-community" 
          containerSize={50}
          backgroundColor="#FF5252"
        />
      </View>
      
      <ThemedText style={styles.title}>Material Buttons</ThemedText>
      
      <MaterialButton 
        label="Contained Button"
        onPress={() => console.log('Pressed contained')}
        mode="contained"
      />
      
      <MaterialButton 
        label="Outlined Button"
        onPress={() => console.log('Pressed outlined')}
        mode="outlined"
      />
      
      <MaterialButton 
        label="Text Button"
        onPress={() => console.log('Pressed text')}
        mode="text"
        color="#FF5252"
        textColor="#FF5252"
      />
      
      <MaterialButton 
        label="With Icon"
        onPress={() => console.log('Pressed with icon')}
        icon="send"
        mode="elevated"
        color="#4CAF50"
      />
      
      <MaterialButton 
        label="Disabled Button"
        onPress={() => console.log('This should not log')}
        disabled={true}
      />
      
      <MaterialButton 
        label="Loading Button"
        onPress={() => console.log('This should not log')}
        loading={true}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  iconExample: {
    alignItems: 'center',
  },
  iconLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default TestMaterialComponents; 