import { startQuizz } from './utils/helpers.js';

export async function loadAllQuizzes() {
    const quizDirectory = 'js/data/';
    
    // Liste manuelle des fichiers JSON dans le dossier (pas possible de lister dynamiquement en JS côté client)
    const quizFiles = [
        'shrek.json',
        'starwars.json',
        'harrypotter.json',
        'marvel.json'
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
    const container = document.getElementById('quiz-container');
    container.innerHTML = ''; // Nettoie le conteneur

    quizzes.forEach((quiz, index) => {
      // === Structure Bootstrap : Colonne contenant la carte ===
      const col = document.createElement('div');
      col.classList.add('col-xs-12', 'col-md-6', 'col-lg-3', 'd-flex', 'justify-content-center');

      // === Carte principale ===
      const card = document.createElement('div');
      card.classList.add('card');
      card.style.width = '18rem';
      card.dataset.index = index;

      // === Image ===
      const img = document.createElement('img');
      img.classList.add('card-img-top');
      img.src = quiz.image || 'https://via.placeholder.com/286x180?text=Quizz'; // Image par défaut
      img.alt = quiz.title || 'Image du quizz';
      card.appendChild(img);

      // === Body ===
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
      const startButton = document.createElement('a');
      startButton.classList.add('btn', 'btn-primary');
      startButton.textContent = "Répondre au quizz";
      startButton.href = `quiz.html?id=${quiz.id || index}`; // lien vers la page de quiz
      // OU utiliser un bouton et une fonction JS si besoin : startButton.addEventListener('click', ...)

      // Ajoute les éléments au body
      cardBody.appendChild(title);
      cardBody.appendChild(desc);
      cardBody.appendChild(startButton);

      // Ajoute body à la carte
      card.appendChild(cardBody);

      // Ajoute la carte dans la colonne, puis au conteneur
      col.appendChild(card);
      container.appendChild(col);
    });

  } catch (error) {
    console.error("Erreur lors du chargement des quiz :", error);
  }
}

