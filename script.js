const questions = [
  {
    question: "The main system board of the computer is called?",
    answers: [
      { text: "Motherboard", correct: true },
      { text: "Processor", correct: false },
      { text: "Microchip", correct: false },
      { text: "None of these", correct: false },
    ],
  },
  {
    question:
      "Which of the following system components is the brain of a computer?",
    answers: [
      { text: "Circuit board", correct: false },
      { text: "CPU", correct: true },
      { text: "Network card", correct: false },
      { text: "Memory", correct: false },
    ],
  },
  {
    question: "What is the built-in permanent memory in a computer called?",
    answers: [
      { text: "RAM", correct: false },
      { text: "ROM", correct: true },
      { text: "CPU", correct: false },
      { text: "CD-ROM", correct: false },
    ],
  },
  {
    question: "Which of the following is not a hardware processing chip?",
    answers: [
      { text: "Processing chip", correct: false },
      { text: "Printer", correct: false },
      { text: "Mouse", correct: false },
      { text: "Java", correct: true },
    ],
  },
];

let questionElement = document.getElementById("question");
let answerButtons = document.getElementById("answer-btns");
let nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    let button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";
  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
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

function showScore() {
  resetState();
  questionElement.innerHTML = `your scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
startQuiz();
