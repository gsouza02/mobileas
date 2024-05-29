import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';



export default function EditarFlash({navigation, route}){

  const flashcards = route.params.flashcards;
  const setFlashcards = route.params.setFlashcards;
  const index = route.params.index;
  const caixa1= route.params.caixa1;
  //const setCaixa1 = route.params.setCaixa1;
  const caixa2 = route.params.caixa2;
  //const setCaixa2 = route.params.setCaixa2;
  const caixa3 = route.params.caixa3;
  //const setCaixa3 = route.params.setCaixa3;
  const [errorMessage, setErrorMessage] = useState('');

    const card = flashcards[index];
    const perguntaCard = card.pergunta 
    const [pergunta, setNovaPergunta] = useState(perguntaCard);
    const [resp, setNovaResp] = useState(card.resposta);
    const caixa = card.caixa;

  const salvarEdicao = () => {
  
    const perguntaExistente = flashcards.find(flashcard => flashcard.pergunta === pergunta);
   
    if(perguntaExistente){
     if(pergunta != perguntaCard){
      setErrorMessage('Já existe um flashcard com esta pergunta!');
      return;
     }
    }
  
    if (pergunta === '' || resp === '') {
      setErrorMessage('Por favor, preencha tanto a pergunta quanto a resposta.');
      return;
    }
  
  
    let i = 0;
    if (caixa === 1) {
      while(caixa1[i].pergunta != perguntaCard) i++;
      caixa1[i] = { pergunta: pergunta, resposta: resp, caixa: caixa};
    } else if (caixa === 2) {
      while(caixa2[i].pergunta != perguntaCard) i++;
      caixa2[i] = { pergunta: pergunta, resposta: resp, caixa: caixa};
    } else {
      while(caixa3[i].pergunta != perguntaCard) i++;
      caixa3[i] = { pergunta: pergunta, resposta: resp, caixa: caixa };
    }
  
    
    flashcards[index] = { pergunta: pergunta, resposta: resp, caixa: caixa };

    const novoArray = [...flashcards];
    setFlashcards(novoArray);

    navigation.goBack();
  }
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Editar Flashcard</Text>
          <View style={styles.line}></View>
          <View style={[styles.inputContainer, { marginBottom: 1 }]}>
            <TextInput
              style={styles.input}
              //placeholder="Pergunta"
              placeholderTextColor="white" 
              color="white"
              value={pergunta}
              onChangeText={setNovaPergunta}
            />
            <TextInput
              style={styles.input}
              //placeholder="Resposta"
              value={resp}
              placeholderTextColor="white" // Cor do texto do placeholder
              onChangeText={setNovaResp}
              color="white" // Cor do texto digitado
            />
          </View>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <View style={[styles.buttonContainer, { marginBottom: -10 }]}>
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={() => salvarEdicao()}>
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
  