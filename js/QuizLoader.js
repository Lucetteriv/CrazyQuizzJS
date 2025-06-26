import { startQuizz } from './utils/helpers.js';

export async function loadAllQuizzes() {
    const quizDirectory = 'js/data/';
    
    // Liste manuelle des fichiers JSON dans le dossier (pas possible de lister dynamiquement en JS côté client)
    const quizFiles = [
        'shrek.json',
        'starwars.json',
        'harrypotter.json',
        'marvel.json',
        'jj.json'
        // Ajoute ici tous les autres fichiers .json que tu as dans js/data
    ];

    const quizzes = [];

    for (const file of quizFiles) {
        try {
            const response = await fetch(`${quizDirectory}${file}`);
            if (!response.ok) {
                throw new Error(`Erreur lors du chargement de ${file}`);
            }
            const data = await response.json();
            quizzes.push(data);
        } catch (error) {
            console.error(`Erreur avec le fichier ${file} :`, error);
        }
    }

    return quizzes;
}

export async function afficherCartesQuizz(quizzes) {
  try {
    const container = document.querySelector('.main-card');
    if (!container) {
      console.error("Le conteneur avec l'id 'quiz-container' est introuvable dans le DOM.");
      return;
    }
    container.innerHTML = ''; // Nettoie le conteneur

    quizzes.forEach((quiz, index) => {

      // === Carte principale ===
      const card = document.createElement('div');
      card.classList.add('card', 'px-0', 'col-xs-12', 'col-md-6', 'col-lg-3');
      card.style.width = '18rem';
      card.dataset.index = index;

      // === Image ===
      const img = document.createElement('img');
      img.classList.add('card-img-top', 'h-100', 'object-fit-cover');
      img.src = quiz.image || 'https://via.placeholder.com/286x180?text=Quizz'; // Image par défaut
      img.alt = quiz.title || 'Image du quizz';
      card.appendChild(img);

      // === card-body ===
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      // === Titre ===
      const title = document.createElement('h5');
      title.classList.add('card-title');
      title.textContent = quiz.title || "Titre inconnu";

      // === Description ===
      const desc = document.createElement('p');
      desc.classList.add('card-text');
      desc.textContent = quiz.description || "Pas de description disponible.";

      // === Bouton ===
      const startButton = document.createElement('button');
      startButton.classList.add('btn', 'btn-primary', 'quiz-button');
      startButton.textContent = "Répondre au quizz";

      // Ajoute les éléments à card-body
      cardBody.appendChild(title);
      cardBody.appendChild(desc);
      cardBody.appendChild(startButton);

      // Ajoute card-body à la carte
      card.appendChild(cardBody);

      // Ajoute la carte complète au conteneur
      container.appendChild(card);
    });

  } catch (error) {
    console.error("Erreur lors du chargement des quiz :", error);
  }
}

export function showQuestions(quiz, currentQuestion) {
  const questionContainer = document.querySelector('.question');
  const answersContainer = document.querySelectorAll('.answer-btn');

  const questions = quiz.questions;

  questionContainer.textContent = questions[currentQuestion].question || "Question inconnue";
  answersContainer.forEach((answer, index) => {
    answer.textContent = questions[currentQuestion].answers[index].text || `Réponse ${index + 1} inconnue`;
    answer.setAttribute('id', questions[currentQuestion].answers[index].profile || `profile-${index + 1}`);
    answer.setAttribute('description', questions[currentQuestion].answers[index].profile || `description-${index + 1}`);
  });
}

export function nextQuestion(currentQuestion) {
  currentQuestion++;
  return currentQuestion;
};

export function replayQuiz() {
  const container = document.querySelector('.container.result-view');
  container.classList.remove('d-block');
  container.classList.add('d-none');

  const baseView = document.querySelector('.container.base-view');
  baseView.classList.remove('d-none');

  const card = document.querySelectorAll('.card');
  card.forEach(c => {
    c.classList.remove('d-none');
  });
  
}

export function updateProgressBar(currentQuestion, totalQuestions) {
  const progressBar = document.querySelector('.progress-bar');
  if (!progressBar) return;

  const percentage = Math.round((currentQuestion / totalQuestions) * 100);
  progressBar.style.width = `${percentage}%`;
  progressBar.textContent = `${percentage}%`;
}



