document.addEventListener('DOMContentLoaded', () => {
    const builsQuestions = document.querySelector('#build-questions');
    const results = {};
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
            const quizImage = document.querySelector('#image');
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

                const blocks = document.querySelectorAll('.block');
                
                
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
                    
                    const selectResult = document.createElement('select');
                    let options = '';


                    blocks.forEach((block, i) => {
                    const resultInput = block.querySelector('#result');
                    const titleInput = block.querySelector('#result-title');
                    const descInput = block.querySelector('#result-description');

                    const resultValue = resultInput.value || 'Résultat sans nom';

                    options += `<option value="${resultInput.value}">${resultInput.value}</option>`;
                    
                    results[resultValue] = {
                        title: titleInput.value || 'Aucun titre défini',
                        description: descInput.value || 'Aucune description définie'
                    };
                });
                
                console.log(results);

                    selectResult.innerHTML = options;
                    selectResult.classList.add('form-select');
                    selectResult.setAttribute('id', `profile-${i}-${j}`);
                    answerContainer.appendChild(selectResult);
                    
                }
                
                questionContainer.appendChild(answerContainer);
                builderView.appendChild(questionContainer);
                
                
            }
            
        });
        
        const createButton = document.querySelector('.create-button');
        createButton.addEventListener('click', () => {
            const quizTitle = document.querySelector('#title').value;
            const quizDescription = document.querySelector('#description').value;
            const questions = [];
            const countQuestions = document.querySelector('#count').value;
            const questionContainers = document.querySelectorAll('.question-container');
            const quizImage = document.querySelector('#image').value;
            
            questionContainers.forEach((container, index) => {
                const questionText = container.querySelector(`#question-${index}`).value;
                const answers = [];
                
                
                for (let j = 0; j < 4; j++) {
                    const answerText = container.querySelector(`#answer-${index}-${j}`).value;
                    const profile = container.querySelector(`#profile-${index}-${j}`).value;
                    answers.push({ text: answerText, profile: profile });
                    
                }
                questions.push({ question: questionText, answers: answers });
            });

            const newQuiz = {
                title: quizTitle,
                description: quizDescription,
                image: quizImage,
                count: countQuestions,
                questions: questions,
                results : results
            };
            console.log("Nouveau quiz créé :", newQuiz);

             // 🔽 Convertir en JSON
            const json = JSON.stringify(newQuiz, null, 2);

            // 🔽 Créer un blob
            const blob = new Blob([json], { type: "application/json" });

            // 🔽 Créer un lien de téléchargement
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${quizTitle.replace(/\s+/g, '_').toLowerCase() || "quiz"}.json`;
            document.body.appendChild(link);
            link.click();

            // 🔽 Nettoyer
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        });
    }
});


