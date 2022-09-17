import { TouchableOpacity, View, Text } from 'react-native';
import { THEME } from '../../theme';
import { AdsInfo } from '../AdsInfo';
import { GameController } from "phosphor-react-native";

import { styles } from './styles';

export interface AdCardProps {
  id: string;
  hourStart: string;
  hourEnd: string;
  name: string;
  yearsPlaying: number;
  weekDays: number[];
  useVoiceChannel: boolean;
}

interface Props {
  data: AdCardProps;
  onConnect: () => void;
}

export function AdCard({data, onConnect}:Props) {
  return (
    <View style={styles.container}>

      <AdsInfo
        label='Nome'
        value={data.name}
      />
      
      <AdsInfo
        label='Tempo de Jogo'
        value={`${data.yearsPlaying}`}
      />
      
      <AdsInfo
        label='Disponibilidade'
        value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
      />
      
      <AdsInfo
        label='Chamada de áudio'
        value={ data.useVoiceChannel ? "Sim" : "Não" }
        colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT }
      />

      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController
          color={THEME.COLORS.TEXT}
          size={20}
        />

        <Text style={styles.buttonTitle}>
          Conectar
        </Text>
      </TouchableOpacity>

    </View>
  );
}