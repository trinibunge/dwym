import { styles } from '@/components/styles';
import { expoDevServerUri } from '@/components/utils';
import { useFetchRandomCountries } from '@/hooks/api';
import { Image } from 'expo-image';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Trivia() {
  const { data, error, isLoading } = useFetchRandomCountries(3);
  // TODO: change this to get the name chosen in the previous screen
  const name = '';

  return (
    <View style={styles.container}>
      {name ? (
        <Text style={styles.titleText}>Hello, {name}!</Text>
      ) : (
        <Text style={styles.titleText}>Anybody there?</Text>
      )}

      {isLoading && <Text>Loading random countries...</Text>}
      {error && (
        <Text style={styles.errorText}>
          Error loading random countries: {error.message}
        </Text>
      )}
      {data && (
        <>
          <Text style={styles.errorText}>Some random countries</Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'space-between',
              margin: 20,
            }}
          >
            {data.map((cca3) => (
              <View key={cca3} style={{ alignItems: 'center' }}>
                <Image
                  source={{
                    uri: expoDevServerUri(`/static/flags/${cca3}.svg`),
                  }}
                  style={{ width: 50, height: 30 }}
                />
                <Text style={styles.normalText}>{cca3}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}
