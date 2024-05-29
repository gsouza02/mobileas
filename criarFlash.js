import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
//import { flashcards, caixa1 } from './variaveis';

export default function CriarFlash({navigation, route}) {
  const [pergunta, setPergunta] = useState('');
  const [resposta, setResposta] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const flashcards = route.params.flashcards
  const setFlashcards = route.params.setFlashcards
  const caixa1 = route.params.caixa1
  const setCaixa1 = route.params.setCaixa1
  
  const salvarNovoFlashcard = (perguntaUser, respostaUser) => {
    const perguntaExistente = flashcards.find(flashcard => flashcard.pergunta === perguntaUser);

    if (perguntaUser === '' || respostaUser === '') {
      setErrorMessage('Preencha tanto a pergunta quanto a resposta.');
      return;
    }

    if (perguntaExistente) {
      setErrorMessage('Já existe um flashcard com esta pergunta!');
      return;
    }

    const box = 1;
    flashcards.push({ pergunta: perguntaUser, resposta: respostaUser, caixa: box });
    caixa1.push({ pergunta: perguntaUser, resposta: respostaUser, caixa: box});

    const newFlashcards = [...flashcards];
    setFlashcards(newFlashcards);

    const newCaixa1 = [...caixa1];
    setCaixa1(newCaixa1);

    // Limpar os campos após salvar
    setPergunta('');
    setResposta('');
    setErrorMessage('');

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Flashcard</Text>
      <View style={styles.line}></View>
      <View style={[styles.inputContainer, { marginBottom: 1 }]}>
        <TextInput
          style={styles.input}
          placeholder="Pergunta"
          value={pergunta}
          onChangeText={setPergunta}
          placeholderTextColor="white" 
          color="white" 
        />
        <TextInput
          style={styles.input}
          placeholder="Resposta"
          value={resposta}
          onChangeText={setResposta}
          placeholderTextColor="white" // Cor do texto do placeholder
          color="white" // Cor do texto digitado
        />
      </View>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <View style={[styles.buttonContainer, { marginBottom: -10 }]}>
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={() => salvarNovoFlashcard(pergunta, resposta)}>
          <Text style={styles.buttonText}>SALVAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => {navigation.navigate('CriarTela')}}>
          <Text style={styles.buttonText}>CANCELAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e0f2ff', // Cor corrigida
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#444', 
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    width: 300,
    borderWidth: 2,
    borderColor: 'white',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#444',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginLeft: 10, 
  },
  buttonText: {
    color: '#e0f2ff', 
    fontWeight: 'bold',
  },
  saveButton: {
    borderWidth: 2,
    borderColor: 'white',
  },
  cancelButton: {
    borderWidth: 2,
    borderColor: 'white',
  },
  line: {
    width: '70%',
    height: 3,
    backgroundColor: 'white',
    marginVertical: 15, 
    borderWidth: 2,
    borderColor: '#e0f2ff',
  },


});
