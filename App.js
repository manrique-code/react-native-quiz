import React from "react";

// importamos la pantalla del juego
import GameScreen from "./src/screens/GameScreen"

// importamos la pantalla de inicio
import HomeScreen from "./src/screens/HomeScreen"

// importamos estas librerias para poder hacer stacknavigation entre las pantallas de nuestra aplicacion.
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

/*
* cuando el proyecto esta creciendo no es muy recomendable tener todas las pantallas dentro de App
* es necesario separarlas.
*/

// hacemos un objeto de la clase.
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* dividimos las pantallas, para que no se encuentren mezcladas. */}
      <Stack.Navigator>
        {/* asi montamos una pantalla. Va a mostrar la primera pantalla que encuentre. */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}