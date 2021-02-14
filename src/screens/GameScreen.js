import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import fetchQuizQuestions from "../api";
import QuestionCard from "../components/QuestionCard";
import Button from "../components/Button"

// con route pasamos parametros desde la otra pantalla para poder tener una comunicacion
// entre ellas
const GameScreen = ({ route }) => {
    // cuando start sea verdadero va a comenzar el juego.
    const { start } = route.params;
    // asignamos estado a esta variable para que sepa cuando cambia  el estado de la misma
    // el useState es el hook que se encarga de ejecutar esa accion, estamos usando hooks, porque, como sabemos
    // no estamos usando componentes basados en clases sino en hooks.
    const [questions, setQuestions] = useState([]);
    const [number, setNumber] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [restart, setRestart] = useState(false)


    // con este hook verificamos si el componente se ha montado, en este caso, renderizado
    // normalmente cuando hacemos peticiones a un servidor web, siempre lo ponemos dentro de parentesis.
    useEffect(() => {
        handlerStart();
        // arreglo de dependencias.
        // cuando el arreglo de dependencias esta vacio solo se va a ejecutar una vez, nada mas.
        // cada vez que start cambia el handlerstart se va a ejecutar y consecuentemente la ejecucio ala API tambien.
        // siempre debemos tener mucho ojo con el arreglo de dependencias.
    }, [start, restart]);

    const handlerStart = () => {
        // reiniciar los valores por defecto cuando presionamos restart
        setScore(0);
        setNumber(0);
        setGameOver(false);

        // Aqui mandamos a llamar las preguntas, como es asincrono utilizamos el await, que solo se va a ejectura cuando
        // lleguen los resultados del servidor.
        const getQuestions = async () => {
            const newQuestions = await fetchQuizQuestions(10, "easy");

            // Aqui asignamos el valor a la variables a traves del hook.
            setQuestions(newQuestions);
            console.log(newQuestions);
        }

        getQuestions();
    }

    // maneja el incremento de las preguntas
    const handlerNextQuestion = () => {
        const nextNumber = number + 1;

        // si llegamos a las 10 preguntas hacemos un game over y nos muestra la pantalla de restart
        if (nextNumber === 10) setGameOver(true);
        setNumber(nextNumber);

        // para resetear la pregutna cuando pase a la siguiente
        setUserAnswer("");
    }

    // verificar si la respuesta seleccionada esta correcta
    const handlerCheckAnswer = (answer) => {
        const correct = questions[number].correct_answer === answer;

        if (correct) setScore(score + 1);

        setUserAnswer(answer);
    }

    const handlerRestart = () => {
        setRestart(!restart);
    }

    // texto JSX que se utiliza para renderizar los componentes.
    return (
        // solo podemos retornar JSX, en cambio, si tenemos varibles o sintaxis diferente a esta
        // tendremos que ponerlo entre llaves
        <View style={styles.container}>
            {!gameOver && questions.length ? (
                <View>
                    <View style={styles.categoryContainer}>
                        <LinearGradient
                            style={styles.categoryGradient}
                            colors={["#fc506d", "#b46ff9"]}
                            start={{ x: -1, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.category}>{questions[number].category}</Text>
                        </LinearGradient>
                    </View>
                    <QuestionCard
                        question={questions[number].question}
                        answers={questions[number].answers}
                        questionNumber={number + 1}
                        totalQuestions={10}
                        correctAnswer={questions[number].correct_answer}
                        callBack={handlerCheckAnswer}
                        userAnswer={userAnswer}
                    />
                    <View>
                        <Text style={styles.correctAnswer}>Correct answers: {score}</Text>
                        <Button title="Next" callback={handlerNextQuestion} />
                    </View>
                </View>
            ) : null}
            {gameOver ? (
                <View>
                    <Text style={styles.correctAnswer}>Correct answers: {score}</Text>
                    <Button title="Restart" callback={handlerRestart} />
                </View>
            ) : null}
        </View>
    );

}
// maneja el incremento de las preguntas disponibles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#252c4a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    correctAnswer: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#8a93bb",
        textAlign: "center",
        marginBottom: 10
    },
    categoryContainer: {
        padding: 20
    },
    categoryGradient: {
        borderWidth: 4,
        borderColor: "#414a6b",
    },
    category: {
        padding: 10,
        color: "#fff",
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold"
    }
});

export default GameScreen;