import { loadAllQuizzes } from './QuizLoader.js';
import { startQuizz, endQuizz } from './utils/helpers.js';
import { afficherCartesQuizz } from './QuizLoader.js';
import { getQuizz } from './utils/helpers.js';
import { showQuestions } from './QuizLoader.js';
import { nextQuestion } from './QuizLoader.js';
import { getMostFrequentString } from './QuizResult.js';


document.addEventListener('DOMContentLoaded', async () => {
  try {
    let tabId = [];
    let currentQuestion = 0;
    let result = document.querySelector('.perso') 
    const quizzes = await loadAllQuizzes(); // 👈 Cette fonction doit retourner un tableau
    await afficherCartesQuizz(quizzes);
    const buttons = await document.querySelectorAll('.quiz-button')
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            startQuizz();
            getQuizz(index);
            showQuestions(quizzes[index], currentQuestion);
            document.querySelectorAll('.answer-btn').forEach(button => {
              button.addEventListener('click', (event) => {
                const selectedAnswer = event.target;
                tabId.push(selectedAnswer.id);
                // Gère la réponse ici si tu veux stocker les profils par exemple :
                console.log("Réponse sélectionnée :", selectedAnswer.textContent);
                console.log(quizzes[index]);
                if (quizzes[index] && currentQuestion < quizzes[index].questions.length - 1) {
                    
                    currentQuestion++;
                    showQuestions(quizzes[index], currentQuestion);
                } else {
                    endQuizz();
                }
                result = getMostFrequentString(tabId);
                if (result){
                    document.querySelector('.perso').textContent = result;
                }
              });
            });
        });
    });
        
    } catch (error) {
    console.error("Erreur dans main.js :", error);
    }
});






