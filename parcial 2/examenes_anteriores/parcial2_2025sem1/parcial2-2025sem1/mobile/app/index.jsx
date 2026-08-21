import { Text, View, StyleSheet } from 'react-native';
import { useFetchIcons } from './api';

export default function Index() {
  const {
    data: iconsData,
    error: iconsError,
  } = useFetchIcons();
  const text = !iconsData && !iconsError ? 'Loading...'
    : iconsData ? `This is a random task icon: ${iconsData[Math.trunc(Math.random() * iconsData.length)]?.icon}.`
    : `⚠️ ${iconsError.message}`;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
