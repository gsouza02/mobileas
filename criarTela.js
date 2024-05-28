import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import EditarFlash from './EditarFlash';
//import { flashcards, caixa1, caixa2, caixa3, setFlashcards } from './variaveis';

const LimitedText = ({ text, maxLength }) => {
  const displayText = text.length > maxLength ? text.substring(0, maxLength) + '...' : text;

  return (
    <Text style={styles.text}>{displayText}</Text>
  );
};


const FlashcardList = ({ flashcards, setFlashcards, navigation}) => {
  const renderItem = ({ item, index}) => {

    const  excluirFlashcard = (index) => {
        const card = flashcards[index];
        const perguntaCard = card.pergunta;
      
       /* let i = 0;
        if (card.caixa === 1) {
          while(caixa1[i].pergunta != perguntaCard) i++;
          caixa1.splice(i, 1)
        } else if (card.caixa === 2) {
          while(caixa2[i].pergunta != perguntaCard) i++;
          caixa2.splice(i, 1)
        } else {
          while(caixa3[i].pergunta != perguntaCard) i++;
          caixa3.splice(i, 1)
        }*/
      
        const newFlashcards = [...flashcards];
        newFlashcards.splice(index, 1);
        setFlashcards(newFlashcards);
      }

    return(
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.flashcardItem}>
        <View style={styles.pergunta}>
          <LimitedText text={item.pergunta} maxLength={20} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Editar', {
            flashcards: flashcards,
            setFlashcards: setFlashcards,
            index: index
          })}>
            <Text style={styles.icon}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={(event) => { event.stopPropagation(); excluirFlashcard(index)}}>
            <Text style={styles.icon}>❌</Text>
         </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

  return (
    <FlatList
      data={flashcards}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const CriarTela = ({ navigation }) => {


  const [flashcards, setFlashcards] = useState([]);

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.headerText}>LISTA DE FLASHCARDS</Text>
        <Text style={[styles.subHeaderText, {color: flashcards.length >= 10 ? 'green' : 'red'}]}>{flashcards.length + " / 10 (Mínimo: 10)" }</Text>
        <FlashcardList flashcards={flashcards} setFlashcards={setFlashcards} navigation={navigation}/>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity  onPress={() => navigation.navigate('CriarFlash', { flashcards: flashcards, setFlashcards: setFlashcards })} style={styles.Buttons}>
            <Text style={styles.buttonText}>CRIAR FLASHCARD!</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={styles.Buttons}>
            <Text style={styles.buttonText}>REINICIAR!</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Estudos')} style={styles.Buttons2}>
      <Text style={styles.buttonText}>INICIAR ESTUDOS</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#4c88bd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    height: '80%',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
  },
  flashcardItem: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#666',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  pergunta: {
    flex: 1, 
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  icon: {
    fontSize: 20,
    color: 'white',
    marginHorizontal: 5,
  },
  buttonWrapper: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  Buttons: {
    backgroundColor: '#4c88bd',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    width: '90%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0f2ff',
  },
  Buttons2: {
    backgroundColor: '#003c66',
    padding: 10,
    borderRadius: 20,
    width: '63%',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#e0f2ff',
  },
  buttonText: {
    color: '#003c66',
    fontSize: 18,
    fontWeight: 'bold',
  },


});

export default CriarTela;
