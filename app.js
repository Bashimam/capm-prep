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
  // Generate quizQuestions based on user selection
  let selected = [];
  quizState.selectedDifficulties.forEach(diff => {
    const pool = questions.filter(q => q.difficulty === diff);
    // Shuffle pool
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    selected = selected.concat(pool.slice(0, quizState.numQuestions[diff]));
  });
  // Shuffle all selected questions
  for (let i = selected.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selected[i], selected[j]] = [selected[j], selected[i]];
  }
  quizState.quizQuestions = selected;
  quizState.current = 0;
  quizState.correct = 0;
  quizState.answers = [];
  renderQuiz();
}

function renderQuiz() {
  const quizSection = document.getElementById('quiz-section');
  quizSection.innerHTML = '';
  document.getElementById('setup-section').style.display = 'none';
  quizSection.style.display = '';
  document.getElementById('results-section').style.display = 'none';

  const q = quizState.quizQuestions[quizState.current];
  if (!q) {
    showResults();
    return;
  }
  // Progress bar
  const progress = ((quizState.current) / quizState.quizQuestions.length) * 100;
  quizSection.innerHTML += `
    <div class="progress-bar"><div class="progress" style="width:${progress}%;"></div></div>
    <h2>Question ${quizState.current + 1} of ${quizState.quizQuestions.length}</h2>
    <div class="question-text">${q.QuestionText}</div>
    <div class="choices"></div>
    <button id="skip-btn" style="margin-top:1rem;">Skip</button>
    <div id="explanation-box"></div>
  `;
  // Render choices
  const choicesDiv = quizSection.querySelector('.choices');
  q.Choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice.choicetext;
    btn.onclick = () => answerQuestion(choice.id);
    choicesDiv.appendChild(btn);
  });
  // Skip button
  document.getElementById('skip-btn').onclick = skipQuestion;
}

function answerQuestion(choiceId) {
  const q = quizState.quizQuestions[quizState.current];
  const userChoice = q.Choices.find(c => c.id === choiceId);
  const correctChoice = q.Choices.find(c => c.iscorrect);
  const choicesBtns = document.querySelectorAll('.choice-btn');
  // Disable all buttons
  choicesBtns.forEach(btn => btn.disabled = true);
  // Mark selected and correct/incorrect
  choicesBtns.forEach(btn => {
    if (btn.textContent === userChoice.choicetext) {
      btn.classList.add(userChoice.iscorrect ? 'correct' : 'incorrect', 'selected');
    }
    if (btn.textContent === correctChoice.choicetext && !userChoice.iscorrect) {
      btn.classList.add('correct');
    }
  });
  // Show explanation
  document.getElementById('explanation-box').innerHTML = `<div class="explanation"><strong>Explanation:</strong> ${q.Explenation}</div>`;
  // Track answer
  quizState.answers.push({
    qid: q.qid,
    selected: choiceId,
    correct: userChoice.iscorrect
  });
  if (userChoice.iscorrect) quizState.correct++;
  // Next question after short delay
  setTimeout(() => {
    quizState.current++;
    renderQuiz();
  }, 1200);
}

function skipQuestion() {
  const q = quizState.quizQuestions[quizState.current];
  quizState.answers.push({
    qid: q.qid,
    selected: null,
    correct: false
  });
  quizState.current++;
  renderQuiz();
}

function showResults() {
  const resultsSection = document.getElementById('results-section');
  resultsSection.innerHTML = '';
  document.getElementById('setup-section').style.display = 'none';
  document.getElementById('quiz-section').style.display = 'none';
  resultsSection.style.display = '';

  const total = quizState.quizQuestions.length;
  const correct = quizState.correct;
  resultsSection.innerHTML = `
    <h2>Quiz Complete!</h2>
    <p>Your Score: <strong>${correct} / ${total}</strong></p>
    <div style="margin:1.5rem 0;">
      <button id="restart-btn">Restart</button>
    </div>
  `;
  document.getElementById('restart-btn').onclick = restartQuiz;
}

function restartQuiz() {
  // Reset state
  quizState.selectedDifficulties = [];
  quizState.numQuestions = {};
  quizState.quizQuestions = [];
  quizState.current = 0;
  quizState.correct = 0;
  quizState.answers = [];
  renderSetup();
}
