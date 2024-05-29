import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function IniciarEstudos({ navigation, flashcards, setFlashcards, caixa1, caixa2, caixa3, card }) {

  const [isFlipped, setIsFlipped] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [totalCorretos, setTotalCorretos] = useState(0); 
  const [totalRevisados, setTotalRevisados] = useState(0); 
  const flipAnim = useRef(new Animated.Value(0)).current;
  const perguntaCard = card.pergunta
  const respostaCard = card.resposta
  const caixaCard = card.caixa;


  let index = 0;
  while (flashcards[index].pergunta !== perguntaCard) index++;

  let i = 0;
  if (card.caixa === 1) {
    while (caixa1[i].pergunta !== perguntaCard) i++;
  } else if (card.caixa === 2) {
    while (caixa2[i].pergunta !== perguntaCard) i++;
  } else {
    while (caixa3[i].pergunta !== perguntaCard) i++;
  }


  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipCard = () => {
    if (isFlipped) {
      Animated.spring(flipAnim, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(flipAnim, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
    setIsFlipped(!isFlipped);
  };

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };



  const verificaResposta = (index, caixa, flashcardIndex, resposta) => {
    if (!resposta) return;

    if (caixa === 1) {
      if (resposta === caixa1[index].resposta) {
        flashcards[flashcardIndex].caixa = 2;
        caixa1[index].caixa = 2;
        caixa2.push(caixa1[index]);
        caixa1.splice(index, 1);
        setTotalCorretos(totalCorretos + 1); 
      }
    } else if (caixa === 2) {
      if (resposta === caixa2[index].resposta) {
        flashcards[flashcardIndex].caixa = 3;
        caixa2[index].caixa = 3;
        caixa3.push(caixa2[index]);
        setTotalCorretos(totalCorretos + 1); 
      } else {
        flashcards[flashcardIndex].caixa = 1;
        caixa2[index].caixa = 1;
        caixa1.push(caixa2[index]);
      }
      caixa2.splice(index, 1);
    } else {
      if (resposta !== caixa3[index].resposta) {
        flashcards[flashcardIndex].caixa = 2;
        caixa3[index].caixa = 2;
        caixa2.push(caixa3[index]);
        caixa3.splice(index, 1);
      } else {
        setTotalCorretos(totalCorretos + 1); 
      }
    } 

    setTotalRevisados(totalRevisados + 1); 
    setInputValue('');
  };

  const handleFinalizarEstudos = () => {
    Alert.alert(
      'Estudos finalizados',
      `Você acertou ${totalCorretos} de ${totalRevisados} respostas.`,
      [
        {
          text: 'OK',
          onPress: () => {
          
            navigation.goBack()
          }
        }
      ]
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.flashcardContainer}>
        <TouchableOpacity style={styles.arrowButton}>
          <Ionicons name="chevron-back" size={32} color="white" />
        </TouchableOpacity>
        <View style={styles.flashcardWrapper}>
          <Animated.View style={[styles.flashcard, frontAnimatedStyle]}>
            <TouchableOpacity style={styles.card} onPress={flipCard}>
              <Text style={[styles.cardText, styles.questionText, { color: caixaCard === 3 ? 'green' : (caixaCard === 2 ? 'yellow' : 'red') }]}>PERGUNTA</Text>
              <Text style={styles.cardText}>{card.pergunta}</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.flashcard, styles.flashcardBack, backAnimatedStyle]}>
            <TouchableOpacity style={styles.card} onPress={flipCard}>
              <Text style={[styles.cardText, styles.answerText]}>RESPOSTA</Text>
              <Text style={styles.cardText}>{card.resposta}</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Estudos', {
          flashcards: flashcards, setFlashcards: setFlashcards,
          caixa1: caixa1, caixa2: caixa2, caixa3: caixa3
        })} style={styles.arrowButton}>
          <Ionicons name="chevron-forward" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua resposta aqui"
          placeholderTextColor="#aaa"
          value={inputValue}
          onChangeText={setInputValue}
        />
        <TouchableOpacity onPress={() => verificaResposta(i, caixaCard, index, inputValue)} style={styles
          .sendButton}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleFinalizarEstudos} style={styles.button}>
        <Text style={styles.buttonText}>FINALIZAR ESTUDOS</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 16,
    alignItems: 'center',
  },
  flashcardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 10, 
  },
  flashcardWrapper: {
    width: 250,
    height: 350,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  flashcard: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#555',
    backfaceVisibility: 'hidden',
    borderRadius: 10,
    position: 'absolute',
  },
  flashcardBack: {
    backgroundColor: '#666',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: '#FFF',
    fontSize: 24,
    textAlign: 'center',
  },
  questionText: {
    color: 'red',
    fontSize: 28,
    marginBottom: 20,
  },
  answerText: {
    color: 'lightcoral',
    fontSize: 28,
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 10,
    color: '#FFF',
    borderWidth: 2,
    borderColor: 'white',
    marginRight: 10,
  },
  sendButton: {
    padding: 10,
    backgroundColor: '#003c66',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  sendButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
  button: {
    padding: 15,
    backgroundColor: '#003c66',
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: -10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  arrowButton: {
    padding: 10,
  },
});

