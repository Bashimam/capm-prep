# CAMP Practice Quiz

A simple, mobile-friendly web app for practicing CAMP (Certified Associate in Project Management) exam questions, based on the PMI.org certification.

## Features
- Select one or more difficulties (easy, normal, hard, very hard)
- Choose number of questions per difficulty (1–100)
- Random, unique questions from a JSON question bank
- Instant feedback: see correct answer and explanation after each question
- Option to skip questions
- Progress bar and score summary at the end
- Restart and try new quizzes easily
- Fully responsive and mobile-friendly

## Getting Started

### 1. Clone or Download
Clone this repository or download the ZIP and extract it.

```
git clone https://github.com/yourusername/camp-practice-quiz.git
```

### 2. Open in Browser
No build step is required. Simply open `index.html` in your web browser.

Or, deploy to [GitHub Pages](https://pages.github.com/) for free hosting.

### 3. Update the Question Bank
- Edit `questions.json` to add, remove, or update questions.
- Each question should follow this format:

```json
{
  "qid": 1,
  "difficulty": "easy",
  "QuestionText": "Which document formally authorizes the existence of a project?",
  "Choices": [
    { "id": 1, "choicetext": "Project Charter", "iscorrect": true },
    { "id": 2, "choicetext": "Business Case", "iscorrect": false },
    ...
  ],
  "Explenation": "The Project Charter formally authorizes the existence of a project..."
}
```
- Supported difficulties: `easy`, `normal`, `hard`, `very hard`

## Customization
- Edit `style.css` for colors, fonts, and layout.
- Edit `index.html` and `app.js` for further customization.

## License
This project is open source and free to use for educational purposes.

---

**Good luck with your CAMP exam preparation!**
