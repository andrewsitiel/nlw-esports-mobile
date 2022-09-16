import { useEffect, useState } from "react";
import { Image, FlatList } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import logoImg from "../../assets/logo-nlw-esports.png";

import { Heading } from '../../components/Heading';
import { GameCard, GameProps } from '../../components/GameCard';
import { Background } from '../../components/Background';

import { styles } from './styles';



export function Home() {
    const [games, setGames] = useState<GameProps[]>([]);
    const navigation = useNavigation();

    function handleOpenGame({ id, title, bannerUrl }:GameProps) {
      navigation.navigate('game', { id, title, bannerUrl })
    }

    useEffect(()=>{
      fetch("http://10.0.0.251:3000/games")
      .then( response => response.json() )
      .then( data => setGames(data) )
    },[])

  return (
    <Background>
    <SafeAreaView style={styles.container}>
      <Image
        source={logoImg}
        style={styles.logo}
      />

      <Heading title='Encontre seu duo' subtitle='Selecione o game que deseja jogar...'/>

      <FlatList
        contentContainerStyle={styles.list}
        data={games}
        keyExtractor={item=> item.id}
        renderItem={({item}) => 
            <GameCard 
            data={item}
            onPress={() => handleOpenGame(item)}/>
          }
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
    </Background>
  );
}