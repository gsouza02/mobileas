import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Menu ({ navigation }) {
  const [backgroundColor, setBackgroundColor] = useState('#003c66');
  const [loaded, setLoaded] = useState(true); // Adicionei uma variável de estado para simular a condição de carregamento
  const flashcards = []

  if (!loaded) {
    return null;
  }

  const iniciar = () => {
    setBackgroundColor('#003c66');
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TouchableOpacity style={styles.button} onPress={iniciar}>
        <Text style={styles.buttonText}>INICIAR ESTUDOS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Criar')}>
        <Text style={styles.buttonText}>CRIAR FLASHCARDS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>VOLTAR</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    position: 'absolute',
    top: '37%',
    left: '59%',
    transform: [{ rotate: '-30deg' }],
  },
  line: {
    width: '70%',
    height: 3,
    backgroundColor: '#e0f2ff',
    marginVertical: 7,
  },
  button: {
    backgroundColor: '#003c66',
    borderWidth: 2,
    borderColor: '#e0f2ff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: 300,
    alignItems: 'center',
  },
  buttonText: {
    color: '#e0f2ff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
