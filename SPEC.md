# UPSC Prep - Free UPSC Preparation Platform

## Project Overview
- **Project Name**: UPSC Prep
- **Type**: Full-stack web application (Education Platform)
- **Core Functionality**: Free UPSC preparation with quizzes, current affairs, study materials, mock tests
- **Target Users**: UPSC aspirants preparing for Civil Services Examination

## Tech Stack
- **Frontend**: React 18 + Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt

---

## UI/UX Specification

### Color Palette
```css
--bg-primary: #0f172a;
--bg-secondary: #1e293b;
--bg-tertiary: #334155;
--accent-primary: #f59e0b;
--accent-secondary: #22c55e;
--accent-tertiary: #3b82f6;
--text-primary: #ffffff;
--text-secondary: #94a3b8;
--text-muted: #64748b;
```

### Typography
- **Primary Font**: 'Poppins', sans-serif
- **Secondary Font**: 'Inter', sans-serif

---

## Pages & Features

### 1. Home Page
- Daily Current Affairs
- Quick Quiz (Daily)
- Subject-wise categories
- Progress dashboard
- Study planner

### 2. Daily Quiz
- Multiple choice questions
- Timer for each question
- Instant results & explanations
- Score tracking

### 3. Current Affairs
- Daily news updates
- Monthly compilations
- Topic-wise sorting
- Bookmark feature

### 4. Subjects
- History (Ancient, Medieval, Modern)
- Geography
- Polity
- Economy
- Science & Technology
- Environment
- Ethics

### 5. Mock Tests
- Full length tests
- Section-wise tests
- Previous year papers
- Timer & evaluation

### 6. PYQ (Previous Year Questions)
- Year-wise questions
- Subject-wise filtering
- Answer explanations

### 7. Study Materials
- NCERT summaries
- Important topics
- Quick revision notes

### 8. Profile
- Progress tracking
- Quiz history
- Bookmarks
- Statistics

---

## Database Schema

### User
- username, email, password
- quizResults, bookmarks
- studyPlan, preferences

### Question
- question, options, correctAnswer
- explanation, subject, topic
- difficulty, createdAt

### CurrentAffairs
- title, content, date
- category, tags, source

### StudyMaterial
- title, content, subject
- topic, type, createdAt

---

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Questions
- GET /api/questions (with filters)
- GET /api/questions/daily
- GET /api/questions/random

### Current Affairs
- GET /api/affairs (with date filter)
- GET /api/affairs/:id

### Study Materials
- GET /api/materials (with subject filter)

### User
- POST /api/user/bookmark
- GET /api/user/bookmarks
- POST /api/user/quiz-result
- GET /api/user/stats
- PUT /api/user/progress

---

## Acceptance Criteria
- [x] Clean dark UI with orange/green accents
- [x] Quiz system with timer & scoring
- [x] Current affairs with daily updates
- [x] Subject-wise study materials
- [x] Progress tracking
- [x] Bookmark system
- [x] JWT authentication
- [x] Responsive design
- [x] Free access to all featurescd ..