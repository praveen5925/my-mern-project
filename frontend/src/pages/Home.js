import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Newspaper, BookOpen, TrendingUp, ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';

const Home = () => {
  const [dailyQuiz, setDailyQuiz] = useState([]);
  const [latestAffairs, setLatestAffairs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [quizRes, affairsRes, userRes] = await Promise.all([
          axios.get('/api/questions/daily'),
          axios.get('/api/affairs/latest'),
          axios.get('/api/user/stats').catch(() => null)
        ]);
        setDailyQuiz(quizRes.data);
        setLatestAffairs(affairsRes.data);
        setStats(userRes?.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-accent-yellow animate-spin" /></div>;

  const subjects = [
    { name: 'History', icon: '🏛️', color: 'bg-orange-500' },
    { name: 'Geography', icon: '🗺️', color: 'bg-green-500' },
    { name: 'Polity', icon: '⚖️', color: 'bg-blue-500' },
    { name: 'Economy', icon: '💰', color: 'bg-yellow-500' },
    { name: 'Science', icon: '🔬', color: 'bg-purple-500' },
    { name: 'Environment', icon: '🌿', color: 'bg-green-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Prepare for <span className="text-accent-yellow">UPSC</span> Free</h1>
        <p className="text-text-secondary text-lg">Daily quizzes, current affairs, study materials & mock tests - All Free!</p>
      </motion.div>

      {stats && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-3 gap-4 mb-12">
          <div className="card text-center">
            <p className="text-3xl font-bold text-accent-yellow">{stats.totalQuizzes}</p>
            <p className="text-text-secondary text-sm">Quizzes Taken</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-accent-green">{stats.avgScore}%</p>
            <p className="text-text-secondary text-sm">Avg Score</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-accent-blue">{stats.streak}</p>
            <p className="text-text-secondary text-sm">Day Streak</p>
          </div>
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Link to="/quiz">
          <motion.div whileHover={{ scale: 1.02 }} className="card bg-gradient-to-br from-accent-yellow/20 to-accent-yellow/5 border-accent-yellow/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-accent-yellow/20 flex items-center justify-center">
                <Brain className="w-7 h-7 text-accent-yellow" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Daily Quiz</h3>
                <p className="text-text-secondary">{dailyQuiz.length} questions</p>
              </div>
            </div>
            <p className="text-text-secondary mb-4">Test your knowledge with daily multiple choice questions</p>
            <div className="flex items-center text-accent-yellow gap-2">Start Quiz <ArrowRight className="w-4 h-4" /></div>
          </motion.div>
        </Link>

        <Link to="/affairs">
          <motion.div whileHover={{ scale: 1.02 }} className="card bg-gradient-to-br from-accent-green/20 to-accent-green/5 border-accent-green/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-accent-green/20 flex items-center justify-center">
                <Newspaper className="w-7 h-7 text-accent-green" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Current Affairs</h3>
                <p className="text-text-secondary">{latestAffairs.length} latest</p>
              </div>
            </div>
            <p className="text-text-secondary mb-4">Stay updated with daily news and events</p>
            <div className="flex items-center text-accent-green gap-2">View All <ArrowRight className="w-4 h-4" /></div>
          </motion.div>
        </Link>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Subject Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {subjects.map((subj, i) => (
            <Link key={subj.name} to={`/materials/${subj.name}`}>
              <motion.div whileHover={{ scale: 1.05 }} className="card text-center hover:border-accent-yellow/50">
                <span className="text-4xl">{subj.icon}</span>
                <p className="mt-2 font-medium text-white">{subj.name}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Latest Current Affairs</h2>
        <div className="space-y-4">
          {latestAffairs.slice(0, 3).map((affair, i) => (
            <motion.div key={affair._id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="card">
              <div className="flex items-start justify-between">
                <div>
                  <span className={`subject-tag ${affair.importance === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-accent-green/20 text-accent-green'}`}>{affair.category}</span>
                  <h3 className="text-white font-medium mt-2">{affair.title}</h3>
                  <p className="text-text-secondary text-sm mt-1 line-clamp-2">{affair.summary}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;