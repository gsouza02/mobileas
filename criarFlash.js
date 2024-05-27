import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const FlashcardList = ({ flashcards }) => {
  return (
    <>
      {flashcards.map((flashcard, index) => (
        <TouchableOpacity key={index} onPress={() => {}}>
          <View style={styles.flashcardItem}>
            <View style={styles.pergunta}>

            <Text>{flashcard.pergunta}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={(event) => { event.stopPropagation();}}>
                <Text>✏️       </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={(event) => { event.stopPropagation();}}>
                <Text>❌</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
};

const CriarFlashcard = () => {
  const flashcards = [{pergunta: 'João Marcos'}, {pergunta: 'Igreja'}];
  return (
    <FlashcardList flashcards={flashcards} />
  );
};

const styles = {
  flashcardItem: {
    padding: 10,
    //marginVertical: 5,
    backgroundColor: '#eee',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    marginTop: 5,
    backgroundColor: 'yellow',
    width: '20%'
  },
  pergunta:{
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default CriarFlashcard;
