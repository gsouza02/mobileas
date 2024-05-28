import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function IniciarEstudos() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const flipAnim = useRef(new Animated.Value(0)).current;

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

  return (
    <View style={styles.container}>
      <View style={styles.flashcardContainer}>
        <TouchableOpacity style={styles.arrowButton}>
          <Ionicons name="chevron-back" size={32} color="white" />
        </TouchableOpacity>
        <View style={styles.flashcardWrapper}>
          <Animated.View style={[styles.flashcard, frontAnimatedStyle]}>
            <TouchableOpacity style={styles.card} onPress={flipCard}>
              <Text style={[styles.cardText, styles.questionText]}>PERGUNTA</Text>
              <Text style={styles.cardText}>Frajole</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.flashcard, styles.flashcardBack, backAnimatedStyle]}>
            <TouchableOpacity style={styles.card} onPress={flipCard}>
              <Text style={[styles.cardText, styles.answerText]}>RESPOSTA</Text>
              <Text style={styles.cardText}>Igreja</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <TouchableOpacity style={styles.arrowButton}>
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
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button}>
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
    marginBottom: 10, // Adjusted margin bottom
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
