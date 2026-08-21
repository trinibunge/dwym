import { expoDevServerUri } from '@/common/utils';
import { Image } from 'expo-image';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../common/styles';
import { useRouter } from 'expo-router';
import { useTeamData } from './utils';
import { useState } from 'react';

export default function Stickers() {
  const router = useRouter();
  const teamCode = 'URU';
  const [stickers, setStickers] = useState(null);
  const { data, error } = useTeamData(teamCode, stickers);

  return (
    <View style={styles.container}>
      {!data && !error && <Text>Cargando...</Text>}
      {error && <Text style={styles.errorText}>{`Fallo al cargar equipo ${teamCode}: ${error.message}`}</Text>}
      {data && (<>
        <Text style={styles.normalText}>Equipo: {data.name}</Text>
        <Image source={{ uri: expoDevServerUri(`/static/flags/${teamCode}.png`) }} style={styles.flagImage} />
        <View style={styles.flagGrid}>
          {(data.stickers ?? []).map((hasSticker, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.flagGridItem, hasSticker && styles.flagGridItemSelected]}
              onPress={() => setStickers((prevStickers) => {
                const newStickers = [...(prevStickers ?? data.stickers)];
                newStickers[index] = !newStickers[index];
                return newStickers;
              })}
            >
              <Text style={styles.normalText}>{index + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </>)}
      
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={() => router.push('/')}
      >
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};
