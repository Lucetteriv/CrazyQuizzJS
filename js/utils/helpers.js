export function startQuizz(quizzID){
    quizzID = 1;
    document.querySelectorAll('.card').forEach(card => {
        card.classList.add('d-none');
    });
    document.querySelector('.progress').classList.remove('d-none');
    document.querySelector('.progress').classList.add('d-block');
    document.querySelector('.question').classList.remove('d-none');
    document.querySelector('.question').classList.add('d-flex');

    let answers = document.querySelectorAll('.answers');
    answers.forEach(answer => {
        answer.classList.remove('d-none');
        answer.classList.add('d-flex');
    });
    console.log("Quizz started with ID:", quizzID);
}

export function endQuizz(){
    document.querySelector('.container game-view').classList.remove('d-block');
    document.querySelector('.container game-view').classList.add('d-none');
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('d-none');
        card.classList.add('d-block');
    });
    console.log("Quizz ended");
}

