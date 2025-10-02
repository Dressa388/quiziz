let level = 1;
let score = 0;

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");

function generateQuestions(level) {
  const questions = [
    {
      question: "Qual é o valor de 7 × 8?",
      options: ["54", "56", "58", "64"],
      answer: 1
    },
    {
      question: "Resolva: 2x + 4 = 10. Qual o valor de x?",
      options: ["2", "3", "4", "5"],
      answer: 1
    },
    {
      question: "Qual é a raiz quadrada de 81?",
      options: ["7", "8", "9", "10"],
      answer: 2
    },
    {
      question: "Qual é o valor de (3² + 4²)?",
      options: ["25", "49", "16", "7"],
      answer: 0
    },
    {
      question: "Resolva: (5 + 3) × 2",
      options: ["16", "13", "10", "8"],
      answer: 0
    }
  ];

  if (level > 1) {
    questions.push({
      question: "Resolva: x² - 4x + 4 = 0. Qual o valor de x?",
      options: ["2", "4", "0", "1"],
      answer: 0
    });
    questions.push({
      question: "Qual é o valor de log₂(8)?",
      options: ["2", "3", "4", "8"],
      answer: 1
    });
  }

  return questions;
}

function buildQuiz() {
  const questions = generateQuestions(level);
  const output = [];

  questions.forEach((q, i) => {
    const options = q.options.map((opt, idx) => `
      <label>
        <input type="radio" name="question${i}" value="${idx}" />
        ${opt}
      </label>
    `).join("");

    output.push(`
      <div class="question">
        <p>${q.question}</p>
        ${options}
      </div>
    `);
  });

  quizContainer.innerHTML = output.join("");
}

function showResults() {
  const questions = generateQuestions(level);
  let localScore = 0;

  questions.forEach((q, i) => {
    const selected = document.querySelector(`input[name=question${i}]:checked`);
    if (selected && parseInt(selected.value) === q.answer) {
      localScore++;
    }
  });

  score += localScore;
  resultsContainer.innerHTML = `
    <p>Você acertou ${localScore} de ${questions.length} perguntas.</p>
    <p>Pontuação total: ${score}</p>
  `;

  submitButton.style.display = "none";
  retryButton.style.display = "block";
}

function resetQuiz() {
  level++;
  resultsContainer.innerHTML = "";
  submitButton.style.display = "block";
  retryButton.style.display = "none";
  buildQuiz();
}

buildQuiz();
submitButton.addEventListener("click", showResults);
retryButton.addEventListener("click", resetQuiz);
