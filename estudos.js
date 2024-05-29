import IniciarEstudos from "./iniciarEstudos";

export default function Sorteio({navigation, route}) {

    
    const flashcards = route.params.flashcards;
    const setFlashcards = route.params.setFlashcards;
    const caixa1 = route.params.caixa1;
    const caixa2 = route.params.caixa2;
    const caixa3 = route.params.caixa3;
    
    
    let caixa = sortearCaixa();
    let index = -1;

    if (caixa === 3) {
        index = sortearCaixa3();
       
        
        return(<IniciarEstudos navigation={navigation} card={caixa3[index]} setFlashcards={setFlashcards} 
          caixa1={caixa1} caixa2={caixa2} caixa3={caixa3} flashcards={flashcards}/>)
      } else if (caixa === 2) {
        
        index = sortearCaixa2();
   
        return(<IniciarEstudos navigation={navigation} flashcards={flashcards} setFlashcards={setFlashcards} 
          caixa1={caixa1} caixa2={caixa2} caixa3={caixa3} card={caixa2[index]}/>)
      } else if (caixa === 1) {
      
        index = sortearCaixa1();
      
        return(<IniciarEstudos navigation={navigation} flashcards={flashcards} setFlashcards={setFlashcards} 
          caixa1={caixa1} caixa2={caixa2} caixa3={caixa3} card={caixa1[index]}/>)
      }

  function getRandomInt (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  function sortearCaixa (){
    let sorteio = getRandomInt(1, 101);
  
    let res = 0;
    let result = 0;
  
    if (sorteio > 50) {
      res = 1;
    } else if (sorteio > 20) {
      res = 2;
    } else {
      res = 3;
    }

    if (res === 3) {
      if (caixa3.length === 0) {
        if (caixa2.length !== 0) result = 2;
        else result = 1;
      } else result = 3;
    } else if (res === 2) {
      if (caixa2.length === 0) {
        if (caixa1.length !== 0) result = 1;
        else result = 3;
      } else result = 2;
    } else {
      if (caixa1.length === 0) {
        if (caixa2.length !== 0) result = 2;
        else result = 3;
      } else result = 1;
    }
  
    return result;
  }
  
  function sortearCaixa1() {
    const indiceAleatorio = Math.floor(Math.random() * caixa1.length);
    return indiceAleatorio;
  }
  
  function sortearCaixa2 () {
    const indiceAleatorio = Math.floor(Math.random() * caixa2.length);
    return indiceAleatorio;
  }
  
  function sortearCaixa3() {
    const indiceAleatorio = Math.floor(Math.random() * caixa3.length);
    return indiceAleatorio;
  }
}