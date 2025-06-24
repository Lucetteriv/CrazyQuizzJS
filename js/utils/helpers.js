import { loadAllQuizzes } from "../QuizLoader.js";

export function startQuizz() {
    const stop = document.querySelector('.stop-button')
    stop.classList.remove('d-none');
    document.querySelectorAll('.card').forEach(card => {
        card.classList.add('d-none');
    });
     const progressContainer = document.querySelector('.progress');
    const progressBar = document.querySelector('.progress-bar');
    if (progressContainer && progressBar) {
        progressContainer.classList.remove('d-none');
        progressBar.classList.remove('d-none');
        progressBar.classList.add('d-flex');
        progressBar.style.width = '0%';
        progressBar.textContent = '0%';
    }
    document.querySelector('.question').classList.remove('d-none');
    document.querySelector('.question').classList.add('d-flex');

    let answers = document.querySelectorAll('.answers');
    answers.forEach(answer => {
        answer.classList.remove('d-none');
        answer.classList.add('d-flex');
    });
}

export function endQuizz(){
    document.querySelector('.container.game-view').classList.remove('d-block');
    document.querySelector('.container.game-view').classList.add('d-none');
    document.querySelector('.container.result-view').classList.remove('d-none');
    document.querySelector('.container.result-view').classList.add('d-block');
    console.log("Quizz ended");
}

export async function getQuizz(index) {
    const quizzes = await loadAllQuizzes();
    return quizzes[index];
}


