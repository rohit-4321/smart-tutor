# Smart Tutor - Hackathon Project

Smart Tutor is an AI-powered application designed to assist students in enhancing their learning experience by providing interactive tools for quizzes and flashcards. With AI integration, the app simplifies content creation, making learning both efficient and engaging.

---

## Features

### 1. Quiz Generation and Management
- **AI-Powered Quiz Creation**: Users can generate quizzes by providing:
  - **Topic Name**  
  - **Number of Questions**  
  - **Question Type**: Single-choice or multiple-choice  
- **Draft and Submission**:
  - Save quizzes as drafts for later use.  
  - Submit quizzes to check answers and reevaluate with the correct options provided.  

---

### 2. Flashcard Management
- **Deck Creation**:
  - Create decks with a **Name** and **Description**.
- **Flashcard Creation**:
  - Manually add flashcards to a deck.  
  - Use AI to generate flashcards based on the deck's name and description.  
- **Practice Mode**:
  - Practice with flashcards and track performance.  
- **Editing and Deleting**:
  - Edit or delete flashcards as needed.  

---

## Technologies Used

### Frontend
- **React** with **TypeScript**: For building a responsive and intuitive user interface.  

### Backend
- **Flask** (Python): For handling APIs and server-side logic.  

### AI Integration
- **SambaNova API**: Powers the AI-driven quiz and flashcard generation.  

---

## How It Works
1. **Quiz Workflow**:
   - Input topic, number of questions, and question type.
   - Generate quiz using AI or manually create questions.  
   - Save as draft or submit to view correct answers and reevaluate performance.  

2. **Flashcard Workflow**:
   - Create a deck with a descriptive name.  
   - Add flashcards manually or generate them using AI.  
   - Practice with the flashcards, track progress, and edit/delete them as needed.  

---

## Future Enhancements
- **Enhanced Performance Metrics**: Provide detailed analytics for quiz and flashcard practice.  
- **Collaborative Learning**: Allow group-based quiz or flashcard sharing among students.  

---

## Setup and Installation

### Prerequisites
- **Node.js** and **npm**: For running the frontend.  
- **Python 3.x** and **Flask**: For the backend.  
- **API Key for SambaNova API**.  

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/smart-tutor.git
   cd smart-tutor
---

##Project Structure
```bash
.
├── client
│   ├── biome.json
│   ├── dist
│   │   ├── assets
│   │   │   ├── class_room-Bz5F8O-X.webp
│   │   │   ├── french_revolution-BTMgGQ69.webp
│   │   │   ├── google-DuXP27S6.png
│   │   │   ├── index-C2AiMS_0.css
│   │   │   ├── index-O-Iu2Aax.js
│   │   │   ├── invention_and_discoveries-Dltan6-2.jpeg
│   │   │   ├── smart_tutor_logo-DuSXCUYb.png
│   │   │   ├── tech_history-CcVl3KuS.jpeg
│   │   │   ├── the_impact_of_indutrial_revolution-CXl5JKX5.jpeg
│   │   │   ├── The Rise and Fall of the Roman Empire-BOoaZj8A.webp
│   │   │   └── women_suffrage_movement-BfotucKT.jpeg
│   │   ├── index.html
│   │   └── vite.svg
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   └── vite.svg
│   ├── README.md
│   ├── src
│   │   ├── api
│   │   │   ├── auth.api.ts
│   │   │   ├── baseApi.ts
│   │   │   ├── flashCard.api.ts
│   │   │   ├── flashCard.interface.ts
│   │   │   ├── home.api.ts
│   │   │   ├── home.interface.ts
│   │   │   └── user.api.ts
│   │   ├── App.tsx
│   │   ├── assets
│   │   │   ├── bouncing-circles.svg
│   │   │   ├── class_room.webp
│   │   │   ├── create-card.svg
│   │   │   ├── french_revolution.webp
│   │   │   ├── google.png
│   │   │   ├── invention_and_discoveries.jpeg
│   │   │   ├── smart_tutor_logo_light.png
│   │   │   ├── smart_tutor_logo.png
│   │   │   ├── tech_history.jpeg
│   │   │   ├── the_impact_of_indutrial_revolution.jpeg
│   │   │   ├── The Rise and Fall of the Roman Empire.webp
│   │   │   └── women_suffrage_movement.jpeg
│   │   ├── components
│   │   │   ├── Drawer.module.css
│   │   │   ├── Drawer.tsx
│   │   │   ├── header.module.css
│   │   │   ├── header.tsx
│   │   │   ├── pages
│   │   │   │   ├── auth
│   │   │   │   │   ├── Login.module.css
│   │   │   │   │   └── Login.tsx
│   │   │   │   ├── deck
│   │   │   │   │   ├── CardDialog.tsx
│   │   │   │   │   ├── CreateCardDialogAI.module.css
│   │   │   │   │   ├── CreateCardDialogAI.tsx
│   │   │   │   │   ├── CreateCardDialogManual.tsx
│   │   │   │   │   ├── CreateCardDialog.module.css
│   │   │   │   │   ├── CreateCardDialog.tsx
│   │   │   │   │   ├── Deck.module.css
│   │   │   │   │   ├── Deck.tsx
│   │   │   │   │   ├── FlipCard.module.css
│   │   │   │   │   └── FlipCard.tsx
│   │   │   │   ├── flashCard
│   │   │   │   │   ├── ActionMenu.tsx
│   │   │   │   │   ├── EditDeckDialog.tsx
│   │   │   │   │   ├── Flash.module.css
│   │   │   │   │   └── Flash.tsx
│   │   │   │   ├── flashcardplay
│   │   │   │   │   ├── Card.module.css
│   │   │   │   │   ├── Card.tsx
│   │   │   │   │   └── FlashCardPlay.tsx
│   │   │   │   ├── home
│   │   │   │   │   ├── CreateQuizDialog.tsx
│   │   │   │   │   ├── Home.module.css
│   │   │   │   │   ├── Home.tsx
│   │   │   │   │   ├── Recommended.module.css
│   │   │   │   │   └── Recommended.tsx
│   │   │   │   └── quiz
│   │   │   │       ├── QuestionList.tsx
│   │   │   │       ├── questions
│   │   │   │       │   ├── MultipleChoiceQuestion.module.css
│   │   │   │       │   ├── MultipleChoiceQuestion.tsx
│   │   │   │       │   ├── SingleChoiceQuestion.module.css
│   │   │   │       │   └── SingleChoiceQuestion.tsx
│   │   │   │       ├── QuizHaeader.tsx
│   │   │   │       ├── QuizLoading.tsx
│   │   │   │       └── Quiz.tsx
│   │   │   └── ui
│   │   │       ├── Button.module.css
│   │   │       ├── Button.tsx
│   │   │       ├── CreateDeck.tsx
│   │   │       ├── CreateFlashCard.module.css
│   │   │       ├── DialogInput.module.css
│   │   │       ├── DialogInput.tsx
│   │   │       ├── DialogTextArea.tsx
│   │   │       ├── DrawerLink.module.css
│   │   │       ├── DrawerLink.tsx
│   │   │       ├── HomeInputBox.module.css
│   │   │       ├── HomeInputBox.tsx
│   │   │       ├── HomeTab.module.css
│   │   │       ├── HomeTab.tsx
│   │   │       ├── LogoutButton.module.css
│   │   │       ├── LogoutButton.tsx
│   │   │       ├── NoRowOverlay.tsx
│   │   │       └── RenderMarkDownLatex.tsx
│   │   ├── firebase.ts
│   │   ├── index.css
│   │   ├── main.tsx
│   │   ├── redux
│   │   │   ├── slices
│   │   │   │   ├── counter.ts
│   │   │   │   ├── flashCardSlice.ts
│   │   │   │   ├── quizSlice.ts
│   │   │   │   └── userSlice.ts
│   │   │   └── store.ts
│   │   ├── routes.tsx
│   │   └── vite-env.d.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.app.tsbuildinfo
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── tsconfig.node.tsbuildinfo
│   └── vite.config.ts
├── README.md
└── server
    ├── app
    │   ├── __init__.py
    │   ├── modals
    │   │   ├── flashCard.py
    │   │   └── quiz.py
    │   ├── prompt.py
    │   └── routes
    │       ├── auth.py
    │       ├── flashCard.py
    │       ├── __init__.py
    │       └── quiz.py
    ├── config.py
    ├── requirements.txt
    ├── schema
    │   ├── flashCard.py
    │   ├── newQuiz.json
    │   └── quiz.py
    └── wsgi.py

```
