# CAMP Practice Quiz

A simple, mobile-friendly web app for practicing CAMP (Certified Associate in Project Management) exam questions, based on the PMI.org certification.

## 🌐 Try It Live
**[https://bashimam.github.io/capm-prep/](https://bashimam.github.io/capm-prep/)**

## Features
- **Multi-difficulty selection**: Choose from easy, normal, hard, and very hard questions
- **Customizable quiz length**: Select 1-100 questions per difficulty level
- **Smart question selection**: Random, unique questions from a comprehensive JSON question bank
- **Instant visual feedback**: Clear "Correct!" or "Incorrect" indicators with color coding
- **Detailed explanations**: Learn from each answer with comprehensive explanations
- **Skip option**: Skip questions you're unsure about
- **Progress tracking**: Visual progress bar and final score summary
- **Auto-scroll**: Automatically scrolls to quiz content for better UX
- **Continue button**: Manual control over question progression (no auto-advance)
- **Restart functionality**: Easy quiz restart and new quiz generation
- **Fully responsive**: Optimized for mobile, tablet, and desktop
- **SEO optimized**: Meta tags in English, Arabic, and Turkish for better search visibility

## Getting Started

### Option 1: Use the Live Version
Visit **[https://bashimam.github.io/capm-prep/](https://bashimam.github.io/capm-prep/)** to start practicing immediately.

### Option 2: Run Locally
1. **Clone or Download**
   ```bash
   git clone https://github.com/bashimam/capm-prep.git
   cd capm-prep
   ```

2. **Start Local Server** (required due to CORS restrictions)
   ```bash
   # Using Python
   python -m http.server 8000
   # Or using Node.js
   npx http-server -p 8000
   ```

3. **Open in Browser**
   Navigate to `http://localhost:8000`

### Option 3: Deploy to GitHub Pages
1. Fork this repository
2. Go to Settings → Pages
3. Select "Deploy from a branch" → main branch
4. Your site will be available at `https://yourusername.github.io/capm-prep/`

## Question Bank Management

### Current Question Count
- **Easy**: 40 questions
- **Normal**: 25 questions  
- **Hard**: 45 questions
- **Very Hard**: 45 questions
- **Total**: 155+ questions

### Adding New Questions
Edit `questions.json` to add, remove, or update questions. Each question should follow this format:

```json
{
  "qid": 156,
  "difficulty": "easy",
  "QuestionText": "Which document formally authorizes the existence of a project?",
  "Choices": [
    { "id": 1, "choicetext": "Project Charter", "iscorrect": true },
    { "id": 2, "choicetext": "Business Case", "iscorrect": false },
    { "id": 3, "choicetext": "Project Management Plan", "iscorrect": false },
    { "id": 4, "choicetext": "Statement of Work", "iscorrect": false }
  ],
  "Explenation": "The Project Charter formally authorizes the existence of a project and provides the project manager with authority."
}
```

**Important**: When adding questions, ensure `qid` values are unique and sequential. The app will auto-increment from the highest existing `qid`.

### Supported Difficulties
- `easy` - Basic concepts and definitions
- `normal` - Intermediate application of concepts
- `hard` - Complex scenarios and analysis
- `very hard` - Advanced integration and expert-level questions

## Technical Details

### File Structure
```
capm-prep/
├── index.html          # Main HTML structure
├── style.css           # Responsive styling
├── app.js             # Quiz logic and functionality
├── questions.json     # Question bank (155+ questions)
└── README.md          # This file
```

### Key Features Implemented
- **CORS-safe loading**: Handles both local development and production deployment
- **DOM safety**: Robust initialization with fallback DOM creation
- **Mobile optimization**: Touch-friendly buttons and responsive design
- **Accessibility**: Clear visual feedback and keyboard navigation
- **Performance**: Efficient question selection and state management

## Customization
- **Styling**: Edit `style.css` for colors, fonts, and layout
- **Functionality**: Modify `app.js` for quiz behavior and features
- **Content**: Update `index.html` for page structure and meta tags
- **Questions**: Add to `questions.json` following the established format

## Browser Support
- Chrome/Edge 60+
- Firefox 55+
- Safari 12+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License
This project is open source and free to use for educational purposes.

---

**Good luck with your CAMP exam preparation!** 🎯

*Ready to practice? [Start your quiz now!](https://bashimam.github.io/capm-prep/)*
