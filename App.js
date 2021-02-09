import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import fetchQuizQuestions from "./src/api";

export default function App() {
  // asignamos estado a esta variable para que sepa cuando cambia  el estado de la misma
  // el useState es el hook que se encarga de ejecutar esa accion, estamos usando hooks, porque, como sabemos
  // no estamos usando componentes basados en clases sino en hooks.
  const [questions, setQuestions] = useState([]);

  // componenteDidUpdate
  // con este hook verificamos si el componente se ha montado, en este caso, renderizado  
  useEffect(() => {
    // Aqui mandamos a llamar las preguntas, como es asincrono utilizamos el await, que solo se va a ejectura cuando
    // lleguen los resultados del servidor.
    const getQuestions = async () => {
    const questions = await fetchQuizQuestions(10, "easy");

    console.log(questions);
    }

    const newQuestions = getQuestions();
    // Aqui asignamos el valor a la variables a traves del hook.
    setQuestions(newQuestions);
    // arreglo de dependencias.
    // cuando el arreglo de dependencias esta vacio solo se va a ejecutar una vez, nada mas.
  }, []);

  
  if(questions.length){
    // texto JSX que se utiliza para renderizar los componentes.
    return (
      // solo podemos retornar JSX, en cambio, si tenemos varibles o sintaxis diferente a esta
      // tendremos que ponerlo entre llaves
      <View style={styles.container}>
        <Text>Hello World!</Text>
        <Text>{questions[0].question}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  return(
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <StatusBar style="auto" />
    </View>
  );
  
}
// maneja el incremento de las preguntas disponibles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
