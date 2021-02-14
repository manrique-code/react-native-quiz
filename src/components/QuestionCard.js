import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const QuestionCard = ({
    question,
    answers,
    userAnswer,
    questionNumber,
    totalQuestions,
    correctAnswer,
    callBack
}) => {
    return (
        <View style={Styles.container}>
            <Text style={Styles.counter}>
                Question: {questionNumber} / {totalQuestions}
            </Text>
            <Text style={Styles.question}>
                {question}
            </Text>
            <View>
                {answers.map((answer) => (
                    <TouchableOpacity
                        key={answer}
                        style={
                            userAnswer
                                ? userAnswer === answer && answer === correctAnswer
                                    ? Styles.correctAnswer
                                    : answer === correctAnswer
                                        ? Styles.correctAnswer
                                        : Styles.incorrectAnswer
                                : Styles.answerButton
                        }
                        onPress={() => {
                            callBack(answer)
                        }}
                        disabled={userAnswer ? true : false}
                    >
                        <Text style={Styles.answerButtonText}>{answer}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        justifyContent: "center"
    },
    counter: {
        fontSize: 26,
        color: "#8a93bb",
        marginBottom: 50,
        paddingBottom: 10,
        borderStyle: "dotted",
        borderBottomWidth: 2,
        borderColor: "#454d6e"
    },
    question: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 5
    },
    answerButton: {
        textAlign: "center",
        padding: 15,
        borderWidth: 3,
        borderColor: "#21486a",
        borderRadius: 20,
        marginBottom: 5
    },
    answerButtonText: {
        fontSize: 18,
        color: "#fff"
    },
    correctAnswer: {
        textAlign: "center",
        padding: 15,
        borderWidth: 3,
        borderColor: "#06d6a0",
        borderRadius: 20,
        marginBottom: 5
    },
    incorrectAnswer: {
        textAlign: "center",
        padding: 15,
        borderWidth: 3,
        borderColor: "#ef476f",
        borderRadius: 20,
        marginBottom: 5
    }
});

export default QuestionCard;