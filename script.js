const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false }
    ]
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      { text: "Vatican City", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "Sri Lanka", correct: false }
    ]
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
      { text: "Antarctica", correct: true }
    ]
  },
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Africa", correct: false }
    ]
  },
  {
    question: "Which is the highest lake in India?",
    answers: [
      { text: "Dal Lake", correct: false },
      { text: "Wular Lake", correct: false },
      { text: "Kolleru Lake", correct: false },
      { text: "Gurudongmar Lake", correct: true }
    ]
  },
  {
    question: "Largest state of India is?",
    answers: [
      { text: "Madhya Pradesh", correct: false },
      { text: "Andhra Pradesh", correct: false },
      { text: "Rajasthan", correct: true },
      { text: "Uttar Pradesh", correct: false }
    ]
  },
  {
    question: "Which river flows through the city of Kolkata?",
    answers: [
      { text: "Mahanadi", correct: false },
      { text: "Yamuna", correct: false },
      { text: "Ganga", correct: false },
      { text: "Hooghly", correct: true }
    ]
  },
  {
    question: "Which is the longest river in India?",
    answers: [
      { text: "Ganga", correct: true },
      { text: "Godavari", correct: false },
      { text: "Krishna", correct: false },
      { text: "Kaveri", correct: false }
    ]
  },
  {
    question: "Which metal is present in human blood?",
    answers: [
      { text: "Iron", correct: true },
      { text: "Silver", correct: false },
      { text: "Nickel", correct: false },
      { text: "Copper", correct: false }
    ]
  },
  {
    question: "Dandiya is a famous folk dance of which state?",
    answers: [
      { text: "Bihar", correct: false },
      { text: "Odisha", correct: false },
      { text: "Uttarakhand", correct: false },
      { text: "Gujarat", correct: true }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  startTimer();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  clearInterval(timer);
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function startTimer() {
  timeLeft = 10;
  timerElement.innerHTML = `Time left: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerElement.innerHTML = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      disableAnswers();
      nextButton.style.display = "inline-block";
    }
  }, 1000);
}

function selectAnswer(e) {
  clearInterval(timer);
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "inline-block";
}

function disableAnswers() {
  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "inline-block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
