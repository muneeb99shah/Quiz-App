const question = [
  {
    question: "HTML stands for",
    answers: [
      { text: "Hyper Text Marking Language", correct: false },
      { text: "Hyperdiaper Text Markup Lingo", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
    ],
  },
  {
    question: "What is the predominant markup language for web pages?",
    answers: [
      { text: "HTML", correct: true },
      { text: "Php", correct: false },
      { text: "CSS", correct: false },
    ],
  },
  {
    question: "What is a web browser?",
    answers: [
      { text: "Something in my dashboard", correct: false },
      { text: "Used to make web pages", correct: false },
      {
        text: "Software application for retrieving and presenting information on the web",
        correct: true,
      },
    ],
  },
  {
    question: "What is web hosting?",
    answers: [
      { text: "A domain name", correct: false },
      { text: "Online space for web site and data", correct: true },
      { text: "Something people view with a browser", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerSlection = document.getElementById("answer-slection");
const nextBtn = document.getElementById("next-btn");

let currentQustinIndex = 0;
let score = 0;
function startQuiz() {
  currentQustinIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = question[currentQustinIndex];
  let questionNum = currentQustinIndex + 1;
  questionElement.innerHTML = questionNum + "." + currentQuestion.question;
  currentQuestion.answers.forEach((answers) => {
    const button = document.createElement("button");
    button.innerHTML = answers.text;
    button.classList.add("btn");
    answerSlection.appendChild(button);
    if (answers.correct) {
      button.dataset.correct = answers.correct;
    }
    button.addEventListener("click", SelectionAnswer);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  while (answerSlection.firstChild) {
    answerSlection.removeChild(answerSlection.firstChild);
  }
}
function SelectionAnswer(e) {
  const selectionBtn = e.target;
  const isCorrect = selectionBtn.dataset.correct === "true";
  if (isCorrect) {
    selectionBtn.classList.add("correct");
    score++;
  } else {
    selectionBtn.classList.add("incorrect");
  }
  Array.from(answerSlection.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}
function showScore() {
  resetState();
  questionElement.innerHTML = `Your Scored ${score} out of ${question.length}!`;
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
}
function handleNextBtn() {
  currentQustinIndex++;
  if (currentQustinIndex < question.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currentQustinIndex < question.length) {
    handleNextBtn();
  } else {
    startQuiz();
  }
});
startQuiz();
