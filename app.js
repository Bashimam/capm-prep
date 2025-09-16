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

  // How it works
  document.getElementById('how-it-works').innerHTML = `
    <h2>How it works</h2>
    <p>Select the difficulty and number of questions you want to practice. Questions are randomly selected from our CAMP question bank. For each question, choose an answer or skip. The correct answer and explanation will be shown after each attempt. At the end, you'll see your score and can restart or try a new quiz.</p>
  `;

  // About CAMP
  document.getElementById('about-camp').innerHTML = `
    <h2>About the CAMP Certificate</h2>
    <p>The Certified Associate in Project Management (CAMP) is a globally recognized certification from PMI.org for those starting a career in project management. It demonstrates your understanding of fundamental project management concepts and processes.</p>
  `;

  // Setup form
  const difficulties = [
    { key: 'easy', label: 'Easy' },
    { key: 'normal', label: 'Normal' },
    { key: 'hard', label: 'Hard' },
    { key: 'very hard', label: 'Very Hard' }
  ];
  let formHtml = '<form id="quiz-setup-form">';
  formHtml += '<h2>Select Difficulty and Number of Questions</h2>';
  difficulties.forEach(diff => {
    formHtml += `
      <label>
        <input type="checkbox" name="difficulty" value="${diff.key}" id="diff-${diff.key}">
        ${diff.label}
      </label>
      <input type="number" name="num-${diff.key}" id="num-${diff.key}" min="1" max="100" placeholder="Number (1-100)" style="width:120px; margin-bottom:10px;" disabled>
    `;
  });
  formHtml += '<button type="submit">Generate Quiz</button>';
  formHtml += '</form>';
  document.getElementById('quiz-setup-form').outerHTML = formHtml;

  // Enable/disable number input based on checkbox
  difficulties.forEach(diff => {
    const cb = document.getElementById(`diff-${diff.key}`);
    const num = document.getElementById(`num-${diff.key}`);
    cb.addEventListener('change', () => {
      num.disabled = !cb.checked;
      if (!cb.checked) num.value = '';
    });
  });

  // Form submit handler
  document.getElementById('quiz-setup-form').onsubmit = function(e) {
    e.preventDefault();
    // Gather selected difficulties and question counts
    quizState.selectedDifficulties = [];
    quizState.numQuestions = {};
    let valid = false;
    difficulties.forEach(diff => {
      const cb = document.getElementById(`diff-${diff.key}`);
      const num = document.getElementById(`num-${diff.key}`);
      if (cb.checked) {
        const n = parseInt(num.value, 10);
        if (!isNaN(n) && n > 0 && n <= 100) {
          quizState.selectedDifficulties.push(diff.key);
          quizState.numQuestions[diff.key] = n;
          valid = true;
        } else {
          num.focus();
          num.style.borderColor = 'red';
          valid = false;
        }
      }
    });
    if (!valid || quizState.selectedDifficulties.length === 0) {
      alert('Please select at least one difficulty and enter a valid number of questions (1-100) for each.');
      return;
    }
    startQuiz();
  };
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
