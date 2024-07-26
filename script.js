const questions = [
    {
        question: 'What is the full form of HTML?',
        answers: [
            { text: 'HyperText Markup Language', correct: true },
            { text: 'HyperText Media Language', correct: false },
            { text: 'HyperTransfer Markup Language', correct: false },
            { text: 'HyperText Management Language', correct: false }
        ]
    },
    {
        question: 'What is the full form of CSS?',
        answers: [
            { text: 'Cascading Style Sheets', correct: true },
            { text: 'Computer Style Sheets', correct: false },
            { text: 'Creative Style Sheets', correct: false },
            { text: 'Cascading Script Sheets', correct: false }
        ]
    },
    {
        question: 'What is JavaScript used for?',
        answers: [
            { text: 'Styling web pages', correct: false },
            { text: 'Structuring web content', correct: false },
            { text: 'Adding interactivity to web pages', correct: true },
            { text: 'Managing databases', correct: false }
        ]
    },
    {
        question: 'What is the difference between HTML and CSS?',
        answers: [
            { text: 'HTML is used for layout, CSS is used for styling', correct: true },
            { text: 'HTML is used for styling, CSS is used for layout', correct: false },
            { text: 'Both are used for styling', correct: false },
            { text: 'Both are used for layout', correct: false }
        ]
    },
    {
        question: 'Which languages belong to front-end development?',
        answers: [
            { text: 'JavaScript, HTML, CSS', correct: true },
            { text: 'JavaScript, Python, SQL', correct: false },
            { text: 'HTML, Java, C++', correct: false },
            { text: 'CSS, PHP, Ruby', correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

const startButton = document.getElementById('start-btn');
const mainContainer = document.getElementById('main-container');
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const submitButton = document.getElementById('submit-btn');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-btn');
const timeLeftElement = document.getElementById('time-left');
const currentQuestionElement = document.querySelector('.current');
const totalQuestionsElement = document.querySelector('.total');
const progressBar = document.getElementById('progress-bar');

startButton.addEventListener('click', startQuiz);
submitButton.addEventListener('click', submitAnswer);
nextButton.addEventListener('click', handleNextButton);
restartButton.addEventListener('click', startQuiz);

function startQuiz() {
    mainContainer.classList.add('hidden');
    resultContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hidden');
    submitButton.classList.remove('hidden');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    resetState();
    questionElement.innerText = question.question;
    currentQuestionElement.innerText = currentQuestionIndex + 1;
    totalQuestionsElement.innerText = `${questions.length}`;
    question.answers.forEach(answer => {
        const answerDiv = document.createElement('div');
        answerDiv.classList.add('answer');
        answerDiv.innerHTML = 
            `<span class="text">${answer.text}</span>
            <span class="checkbox"><i class="fas fa-check"></i></span>`;
        if (answer.correct) {
            answerDiv.dataset.correct = answer.correct;
        }
        answerDiv.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(answerDiv);
    });
    startTimer();
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    timeLeft = 10;
    timeLeftElement.innerText = timeLeft;
    clearInterval(timer);
    progressBar.style.width = '0%';
}

function selectAnswer(e) {
    const selectedAnswer = e.currentTarget;
    const correct = selectedAnswer.dataset.correct === 'true';
    
    Array.from(answerButtonsElement.children).forEach(button => {
        button.classList.remove('selected');
        button.removeEventListener('click', selectAnswer);
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }
    });
    
    selectedAnswer.classList.add('selected');
    
    if (correct) {
        selectedAnswer.classList.add('correct');
        score++;
    } else {
        selectedAnswer.classList.add('wrong');
    }
    
    submitButton.classList.remove('hidden');
    clearInterval(timer);
    progressBar.style.width = '100%';
}

function submitAnswer() {
    submitButton.classList.add('hidden');
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hidden');
    } else {
        nextButton.classList.add('hidden');
        showResult();
    }
    clearInterval(timer);
}

function showResult() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    finalScoreElement.innerText = `${score} out of ${questions.length}`;
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResult();
    }
}

function startTimer() {
    timeLeftElement.innerText = timeLeft;
    progressBar.style.width = '0%';
    timer = setInterval(() => {
        timeLeft--;
        timeLeftElement.innerText = timeLeft;
        progressBar.style.width = `${((10 - timeLeft) / 10) * 100}%`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitAnswer();
        }
    }, 1000);
}
