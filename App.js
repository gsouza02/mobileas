import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Animated } from 'react-native';
import { useFonts } from 'expo-font';

export default function App() {
  const [backgroundColor, setBackgroundColor] = useState('#4c88bd');
  const [loaded] = useFonts({
    Minecraft: require('./assets/fonts/Minecraft.ttf'),
  });

  const bombeamento = useState(new Animated.Value(1))[0];

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bombeamento, {
          toValue: 1.1,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(bombeamento, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bombeamento]);


  if (!loaded) {
    return null;
  }

  const iniciar = () => {
    setBackgroundColor("#003c66");
  };
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.title}>
        FLASHCARDS
      </Text>
      <Animated.Text style={[styles.subtitle, { transform: [{ rotate: '-30deg' }, { scale: bombeamento }] }]}>
        GALVÃO BUENO!
      </Animated.Text>
      <View style={styles.line}></View>

      <TouchableOpacity style={styles.button} onPress={iniciar}>
        <Text style={styles.buttonText}>INICIAR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={iniciar}>
        <Text style={styles.buttonText}>VOLTAR</Text>
      </TouchableOpacity>
    </View>
  );
}

function Iniciar({ setBackgroundColor }) {
  const sorteio = () => {
    setBackgroundColor('#444');
  };

  const criarConjunto = () => {
    setBackgroundColor('#444');
  };

  const voltar = () => {
    setBackgroundColor('#444');
  };

  return (
    <View style={styles.container}>
      <Button title="Iniciar Estudos" onPress={sorteio} />
      <Button title="CRIAR FLASHCARDS" onPress={criarConjunto} />
      <Button title="VOLTAR" onPress={voltar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontFamily: 'Minecraft',
    color: '#e0f2ff',
    marginBottom: 10,
    textShadowColor: 'black',
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    color: 'yellow',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    transform: [{ rotate: '-30deg' }],
    justifyContent: 1,
    top: -54, // Ajusta a distância do topo
    right: -110,
  },
  line: {
    width: '70%',
    height: 3,
    backgroundColor: '#e0f2ff',
    marginVertical: 7,
    
  },
  button: {
    backgroundColor: '#4c88bd',
    borderWidth: 2,
    borderColor: '#e0f2ff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: 300,
    alignItems: 'center',
    marginVertical: 7,
  },
  buttonText: {
    color: '#e0f2ff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});