import { shuffleArray } from "../utils/utils"
const fetchQuizQuestions = async (amount, dificulty, category = '') => {
    const endPoints = `https://opentdb.com/api.php?amount=${amount}&difficulty=${dificulty}&category=${category}&type=multiple`

    const results = await fetch(endPoints);
    const data = await results.json();

    return data.results.map((question) => ({
        ...question,
        answers: shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer
        ])
    }));
}

export default fetchQuizQuestions