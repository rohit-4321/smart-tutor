# Smart Tutor - Hackathon Project

Smart Tutor is an AI-powered application designed to assist students in enhancing their learning experience by providing interactive tools for quizzes and flashcards. With AI integration, user can get quizzes and flash card in an instant, making learning both efficient and engaging.


## Live demo:-
  You can check out the live demo of the application here: [Live Demo](https://smart-tutor-client.vercel.app)

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
- **Firebase Admin Sdk**: For user authentication

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

#### **Make sure you have firebse project set up on firebase console and have added all env varaible to you system as that is important for authentication in the app**

1. Clone the repository:
   ```bash
   git clone https://github.com/rohit-4321/smart-tutor.git
   cd smart-tutor
   ```

2. FrontEnd:
    - cd client
    - npm install
    - npm run dev 

3. Backend:
    - cd server
    - python -m venv venv  
    - source venv/bin/activate  # On Linux/Mac
      venv\Scripts\activate     # On Windows
    - pip install -r requirements.txt
    - flask run --host=0.0.0.0 --port=3000 --debug # Run flask app in debug mode for development
