import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../components/styles';

export default function Index() {

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Home Screen</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
      />
      
      <TouchableOpacity 
        style={styles.primaryButton}
      >
        <Text style={styles.buttonText}>Enter</Text>
      </TouchableOpacity>
    </View>
  );
}
