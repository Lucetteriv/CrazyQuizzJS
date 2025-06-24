import { loadAllQuizzes } from './QuizLoader.js';
import { startQuizz, endQuizz } from './utils/helpers.js';
import { afficherCartesQuizz } from './QuizLoader.js';
import { getQuizz } from './utils/helpers.js';
import { showQuestions } from './QuizLoader.js';
import { nextQuestion } from './QuizLoader.js';
import { getMostFrequentString } from './QuizResult.js';
import { replayQuiz } from './QuizLoader.js';
import { updateProgressBar } from './QuizLoader.js';


document.addEventListener('DOMContentLoaded', async () => {
  try {
    let tabId = [];
    let currentQuestion = 0;
    let result = document.querySelector('.perso') 
    let description = document.querySelector('.description');
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
                  updateProgressBar(currentQuestion, quizzes[index].questions.length);
              } else {
                  endQuizz();
              }
              const resultKey = getMostFrequentString(tabId);
              const quizResult = quizzes[index].results[resultKey];

              if (quizResult) {
                  // Affiche les résultats
                  document.querySelector('.perso').textContent = quizResult.title;
                  document.querySelector('.result-text').textContent = quizResult.description;
              } else {
                  console.error("Aucun résultat correspondant trouvé pour :", resultKey);
              }
            });
          });
      });
        
    });
     const replayButton = document.querySelector('.replay.btn.btn-primary');
     replayButton.addEventListener('click', () => {
        tabId = [];
        currentQuestion = 0;
        replayQuiz();
     });
    } catch (error) {
    console.error("Erreur dans main.js :", error);
    }
});






