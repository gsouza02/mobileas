import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';



export default function EditarFlash({navigation, route}){

    const salvarEdicao = () =>{

    }
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Editar Flashcard</Text>
          <View style={styles.line}></View>
          <View style={[styles.inputContainer, { marginBottom: 1 }]}>
            <TextInput
              style={styles.input}
              placeholder="Pergunta"
              placeholderTextColor="white" 
              color="white" 
            />
            <TextInput
              style={styles.input}
              placeholder="Resposta"
              placeholderTextColor="white" // Cor do texto do placeholder
              color="white" // Cor do texto digitado
            />
          </View>
          <Text style={styles.errorMessage}></Text>
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
  