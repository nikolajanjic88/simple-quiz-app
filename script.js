const questions = [
  {
    question: 'Who is the youngest of the Prime Evils?',
    answers: [
      {text: 'Diablo', correct: true},
      {text: 'Mephisto', correct: false},
      {text: 'Baal', correct: false},
      {text: 'Andariel', correct: false},
    ]
  },
  {
    question: 'Mephisto is the Lord of?',
    answers: [
      {text: 'Hatred', correct: true},
      {text: 'Terror', correct: false},
      {text: 'Sin', correct: false},
      {text: 'Destruction', correct: false},
    ]
  },
  {
    question: 'How many Lesser Evils of the Burning Hells are there?',
    answers: [
      {text: '3', correct: false},
      {text: '4', correct: true},
      {text: '5', correct: false},
      {text: '6', correct: false},
    ]
  },
  {
    question: 'Which Angel became Angel of Death?',
    answers: [
      {text: 'Tyrael', correct: false},
      {text: 'Imperius', correct: false},
      {text: 'Malthael', correct: true},
      {text: 'Itherael', correct: false},
    ]
  },
  {
    question: 'Imperius is Archangel of?',
    answers: [
      {text: 'Justice', correct: false},
      {text: 'Wisdom', correct: false},
      {text: 'Valor', correct: true},
      {text: 'Hope', correct: false},
    ]
  }
]

const startBtn = document.getElementById('start-btn');
const controls = document.getElementById('controls');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainer = document.getElementById('result-container');
const resultElement = document.getElementById('result');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset-btn');

let shuffledQuestions, currentQuestionIndex;
let score = 0;

startBtn.addEventListener('click', startGame);

function startGame() {
  score = 0;
  controls.classList.add('hide');
  questionContainer.classList.remove('hide');
  resultContainer.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerHTML = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    button.addEventListener('click', () => {
      if(answer.correct) score++;
    })
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
  
}

function resetState() {
  while(answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer() {  
    if(shuffledQuestions.length > currentQuestionIndex + 1) {
      currentQuestionIndex++;
      setNextQuestion();
    } else {
      questionContainer.classList.add('hide');
      resultContainer.classList.remove('hide');
      resultElement.innerHTML = 'Your result: ' + score;

      if(score === shuffledQuestions.length) 
        messageElement.innerHTML = 'You are Diablo lore master';
  
      if(score < shuffledQuestions.length && score >= shuffledQuestions.length * 0.8) 
        messageElement.innerHTML = 'Pretty good';

      if(score < shuffledQuestions.length * 0.8 && score >= shuffledQuestions.length / 2) 
        messageElement.innerHTML = 'Not great, not terrible';

      if(score < shuffledQuestions.length / 2) 
        messageElement.innerHTML ='This is not for you';

      resetButton.addEventListener('click', startGame);
    };
}
