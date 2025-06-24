document.addEventListener('DOMContentLoaded', () => {
    const builsQuestions = document.querySelector('#build-questions');
    if (builsQuestions) {
        builsQuestions.addEventListener('click', () => {
            const container = document.querySelector('.container.create-quizz-view');
            container.classList.add('d-none');

            const builderView = document.querySelector('.questions-container');
            builderView.classList.remove('d-none');
            builderView.classList.add('d-block');

            const createButton = document.querySelector('.create-button');
            createButton.classList.remove('d-none');

            const quizTitle = document.querySelector('#title');
            const quizDescription = document.querySelector('#description');
            const countQuestions = document.querySelector('#count');

            for (let i = 0; i < countQuestions.value; i++) {
                const questionContainer = document.createElement('div');
                questionContainer.classList.add('question-container', 'card', 'm-3', 'p-3');

                const questionLabel = document.createElement('label');
                questionLabel.textContent = `Question ${i + 1}:`;
                questionLabel.setAttribute('for', `question-${i}`);
                questionContainer.appendChild(questionLabel);
                
                const questionInput = document.createElement('input');
                questionInput.setAttribute('type', 'text');
                questionInput.setAttribute('id', `question-${i}`);
                questionInput.classList.add('form-control');
                questionContainer.appendChild(questionInput);

                const answerContainer = document.createElement('div');
                answerContainer.classList.add('answer-container', 'mt-2');

                
                for (let j = 0; j < 4; j++) {
                    const answerLabel = document.createElement('label');
                    answerLabel.textContent = `Réponse ${j + 1}:`;
                    answerLabel.setAttribute('for', `answer-${i}-${j}`);
                    answerContainer.appendChild(answerLabel);
                    
                    const answerInput = document.createElement('input');
                    answerInput.setAttribute('type', 'text');
                    answerInput.setAttribute('id', `answer-${i}-${j}`);
                    answerInput.classList.add('form-control', 'mb-2');
                    answerContainer.appendChild(answerInput);
                }

                questionContainer.appendChild(answerContainer);
                builderView.appendChild(questionContainer);
            }
            
        });

        const createButton = document.querySelector('.create-button');
        createButton.addEventListener('click', () => {
            const quizTitle = document.querySelector('#title');
            const quizDescription = document.querySelector('#description');
            const questions = [];
            const questionContainers = document.querySelectorAll('.question-container');

            questionContainers.forEach((container, index) => {
                const questionText = container.querySelector(`#question-${index}`).value;
                const answers = [];
                console.log(container);
                for (let j = 0; j < 4; j++) {
                    const answerText = container.querySelector(`#answer-${index}-${j}`).value;
                    answers.push({ text: answerText, profile: `profile-${index}-${j}` });
                    console.log(answerText);
                }
                console.log(questionText);
                questions.push({ question: questionText, answers: answers });
            });

            const newQuiz = {
                title: quizTitle,
                description: quizDescription,
                questions: questions
            };
            console.log("Nouveau quiz créé :", newQuiz);
        });
    }
});


