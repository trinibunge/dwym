import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../components/styles';

export default function Index() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su nombre"
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.buttonText}>Enter</Text>
      </TouchableOpacity>
    </View>
  );
}
