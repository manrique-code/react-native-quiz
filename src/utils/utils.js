// ordenamos de una forma aleatoria el arreglo para que las preguntas no solo se encuentren 
// en el final de las preguntas
export const shuffleArray = (array) => {
    const sortedArray = [...array].sort(() => Math.random() - 0.5)

    return sortedArray;
};