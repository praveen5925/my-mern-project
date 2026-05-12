import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle, ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Quiz = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('/api/questions/random?count=10');
        setQuestions(res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchQuestions();
  }, []);

  const handleAnswer = async (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === questions[current].correctAnswer;
    if (correct) setScore(s => s + 1);

    setTimeout(async () => {
      if (current < questions.length - 1) {
        setCurrent(c => c + 1);
        setSelected(null);
      } else {
        setShowResult(true);
        if (user) {
          try {
            await axios.post('/api/user/quiz-result', { quizId: Date.now(), score: correct ? score + 1 : score, total: questions.length, subject: questions[0]?.subject });
          } catch (e) {}
        }
      }
    }, 1500);
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-accent-yellow animate-spin" /></div>;

  if (showResult) {
    const percent = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="card py-12">
          <h2 className="text-3xl font-bold text-white mb-4">Quiz Complete!</h2>
          <p className="text-6xl font-bold text-accent-yellow mb-4">{percent}%</p>
          <p className="text-text-secondary mb-8">{score} out of {questions.length} correct</p>
          <button onClick={() => window.location.reload()} className="btn-primary">Try Again</button>
        </motion.div>
      </div>
    );
  }

  const q = questions[current];
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-text-secondary">Question</span>
          <p className="text-2xl font-bold text-white">{current + 1} / {questions.length}</p>
        </div>
        <div className="flex items-center gap-2 text-accent-green">
          <span className="font-bold">{score}</span>
          <span className="text-text-secondary">correct</span>
        </div>
      </div>

      <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card mb-8">
        <span className="subject-tag bg-accent-yellow/20 text-accent-yellow">{q?.subject}</span>
        <h3 className="text-xl text-white mt-4">{q?.question}</h3>
      </motion.div>

      <div className="space-y-3">
        {q?.options.map((opt, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleAnswer(i)}
            disabled={selected !== null}
            className={`w-full p-4 rounded-xl text-left transition-all ${
              selected === i
                ? i === q.correctAnswer ? 'bg-accent-green/20 border-2 border-accent-green' : 'bg-red-500/20 border-2 border-red-500'
                : selected !== null && i === q.correctAnswer ? 'bg-accent-green/20 border-2 border-accent-green'
                : 'card hover:border-accent-yellow/50'
            }`}
          >
            <span className="text-white">{opt}</span>
            {selected !== null && i === q.correctAnswer && <CheckCircle className="inline ml-2 w-5 h-5 text-accent-green" />}
            {selected === i && i !== q.correctAnswer && <XCircle className="inline ml-2 w-5 h-5 text-red-500" />}
          </motion.button>
        ))}
      </div>

      {selected !== null && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 p-4 bg-accent-yellow/10 rounded-xl border border-accent-yellow/30">
          <p className="text-white font-medium mb-2">Explanation:</p>
          <p className="text-text-secondary text-sm">{q?.explanation}</p>
        </motion.div>
      )}
    </div>
  );
};
export default Quiz;