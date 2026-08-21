import { expoDevServerUri } from '@/common/utils';
import { useFetchRandomCountries } from '@/common/api';
import { Image } from 'expo-image';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../common/styles';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Trivia() {
  const router = useRouter();
  const { data, error, isLoading } = useFetchRandomCountries(9);
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <View style={styles.container}>
      {isLoading && <Text>Cargando...</Text>}
      {error && <Text style={styles.errorText}>Fallo al cargar países aleatorios: {error.message}</Text>}
      {data && (<>
        <Text style={styles.errorText}>Países aleatorios</Text>
        <View style={styles.flagGrid}>
          {data.map((cca3) => (
            <TouchableOpacity
              key={cca3}
              style={[styles.flagGridItem, cca3 === selectedCountry && styles.flagGridItemSelected]}
              onPress={() => setSelectedCountry(cca3)}
            >
              <Image source={{ uri: expoDevServerUri(`/static/flags/${cca3}.svg`) }} style={styles.flagImage} />
              <Text style={styles.normalText}>{cca3}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </>)}
      
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={() => router.push('/')}
      >
        <Text style={styles.buttonText}>Salir</Text>
      </TouchableOpacity>
    </View>
  );
};
