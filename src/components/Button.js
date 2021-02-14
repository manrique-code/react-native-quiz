/*
* aqui estamos haciendo un boton de la pantalla.
*/
import React from "react";
import { StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

const Button = ({ title, callback }) => {
    return (
        <TouchableOpacity onPress={callback} style={styles.button}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignSelf: "center",
        backgroundColor: "#107eeb",
        padding: 20,
        borderRadius: 50,
        marginBottom: 10,
        width: width * 0.4
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    }
});

export default Button;