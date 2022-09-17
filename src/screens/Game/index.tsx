import { FlatList, Image, TouchableOpacity, View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from 'react';

import logoImg from "../../assets/logo-nlw-esports.png";
import { styles } from './styles';
import { THEME } from '../../theme';
import { Entypo } from "@expo/vector-icons";

import { Background } from '../../components/Background';
import { GameParams } from '../../@types/navigation';
import { Heading } from '../../components/Heading';
import { DuoMatch } from '../../components/DuoMatch';
import { AdCard, AdCardProps } from '../../components/AdCard';

export function Game() {
  const route = useRoute();
  const game = route.params as GameParams;
  const navigation = useNavigation();

  const [ads, setAds] = useState<AdCardProps[]>([]);
  const [duoAdSelected, setDuoAdSelected] = useState("")

  function handleGoBack () {
    navigation.goBack()
  }

  async function getUserDiscord(adsId: string ) {
    fetch(`http://10.0.0.251:3000/ads/${adsId}/discord`)
    .then( response => response.json() )
    .then( data => console.log(data)
     )
  }

  useEffect(()=> {
    fetch(`http://10.0.0.251:3000/games/${game.id}/ads`)
    .then( response => response.json() )
    .then( data => setAds(data) )
  },[])

  return (
    <Background>
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
            
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image 
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right}/>
          </View>

          <Image
            source={{uri: game.bannerUrl}}
            style={styles.cover}
          />

          <Heading
            title={game.title}
            subtitle="Conecte-se e comece a jogar"
          />

          <FlatList
            data={ads}
            style={styles.containerList}
            contentContainerStyle={[ads.length > 0 ? styles.adsList : styles.emptyListContent]}
            keyExtractor={item => item.id}
            renderItem={ ({ item }) => (
              <AdCard
                data={item}
                onConnect={() => {getUserDiscord(item.id)}}
                />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={()=> (
                <Text style={styles.emptyListText}>
                  Não há anúncios publicados ainda.
                </Text>
            )}
          />

        <DuoMatch
          visible={duoAdSelected.length > 0}
          discord="andrewsItiel#2341"
          onClose={() => setDuoAdSelected("")}
        />

      </SafeAreaView>
    </Background>
  );
}