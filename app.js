// CAMP Practice Quiz App
let questions = [];
let quizState = {
  selectedDifficulties: [],
  numQuestions: {},
  quizQuestions: [],
  current: 0,
  correct: 0,
  answers: [],
};

// Load questions.json
fetch('questions.json')
  .then(res => res.json())
  .then(data => {
    questions = data.questions;
    renderSetup();
  });

function renderSetup() {
  document.getElementById('setup-section').style.display = '';
  document.getElementById('quiz-section').style.display = 'none';
  document.getElementById('results-section').style.display = 'none';
  // TODO: Render descriptions and setup form
}

function startQuiz() {
  // TODO: Generate quizQuestions based on user selection
  // TODO: Shuffle and pick unique questions
  quizState.current = 0;
  quizState.correct = 0;
  quizState.answers = [];
  renderQuiz();
}

function renderQuiz() {
  document.getElementById('setup-section').style.display = 'none';
  document.getElementById('quiz-section').style.display = '';
  document.getElementById('results-section').style.display = 'none';
  // TODO: Render current question, choices, skip, and progress
}

function answerQuestion(choiceId) {
  // TODO: Handle answer, reveal correct, show explanation
}

function skipQuestion() {
  // TODO: Move to next question
}

function showResults() {
  document.getElementById('setup-section').style.display = 'none';
  document.getElementById('quiz-section').style.display = 'none';
  document.getElementById('results-section').style.display = '';
  // TODO: Show score and restart option
}

function restartQuiz() {
  renderSetup();
}
