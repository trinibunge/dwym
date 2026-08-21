import { Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '../common/styles';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Bienvenido</Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push('/stickers')}
      >
        <Text style={styles.buttonText}>Empezar</Text>
      </TouchableOpacity>
    </View>
  );
}
