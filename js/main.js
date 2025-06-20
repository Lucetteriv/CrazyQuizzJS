import { loadAllQuizzes } from './QuizLoader.js';
import { startQuizz, endQuizz } from './utils/helpers.js';
import { afficherCartesQuizz } from './QuizLoader.js';

document.querySelector('.create-quizz').addEventListener('click', () => {
    startQuizz(1);
});

document.querySelector('.end').addEventListener('click', () => {
    endQuizz();
    document.querySelector('.end').classList.add('d-none');
});


async function init() {
    const allQuizzes = await loadAllQuizzes();
    console.log(allQuizzes); // Tableau contenant les objets quiz
    // Tu peux ensuite instancier ton QuizApp avec ce tableau
    return allQuizzes;
}

let quizzes = init();

document.addEventListener('DOMContentLoaded', () => {
    afficherCartesQuizz(quizzes); // Affiche les cartes de quiz au chargement de la page
});
