import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, LogOut, Loader2, BookOpen, Brain, TrendingUp } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) { navigate('/login'); return; }
    const fetchData = async () => {
      try {
        const [statsRes, historyRes] = await Promise.all([axios.get('/api/user/stats'), axios.get('/api/user/history').catch(() => ({ data: [] }))]);
        setStats(statsRes.data);
        setHistory(historyRes.data || []);
      } catch (err) { console.error(err); }
    };
    if (user) fetchData();
  }, [user, authLoading, navigate]);

  if (authLoading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-accent-yellow animate-spin" /></div>;

  const progressKeys = stats?.progress ? Object.entries(stats.progress) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8 mb-8">
        <div className="flex items-center gap-6">
          <img src={user?.avatar} alt={user?.username} className="w-20 h-20 rounded-full border-4 border-accent-yellow" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{user?.username}</h1>
            <p className="text-text-secondary">{user?.email}</p>
            <p className="text-text-muted text-sm mt-1">Member since {new Date(user?.createdAt).toLocaleDateString()}</p>
          </div>
          <button onClick={logout} className="p-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30"><LogOut className="w-5 h-5" /></button>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card text-center py-6"><p className="text-3xl font-bold text-accent-yellow">{stats?.totalQuizzes || 0}</p><p className="text-text-secondary text-sm">Quizzes</p></div>
        <div className="card text-center py-6"><p className="text-3xl font-bold text-accent-green">{stats?.avgScore || 0}%</p><p className="text-text-secondary text-sm">Avg Score</p></div>
        <div className="card text-center py-6"><p className="text-3xl font-bold text-accent-blue">{stats?.streak || 0}</p><p className="text-text-secondary text-sm">Streak</p></div>
      </div>

      <div className="card p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-accent-yellow" /> Subject Progress</h2>
        <div className="space-y-4">
          {progressKeys.map(([key, val]) => (
            <div key={key}>
              <div className="flex justify-between text-sm mb-1"><span className="text-white capitalize">{key}</span><span className="text-accent-yellow">{Math.round(val)}%</span></div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: `${val}%` }} /></div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Brain className="w-5 h-5 text-accent-green" /> Recent Quizzes</h2>
        {history.length > 0 ? (
          <div className="space-y-3">
            {history.slice(0, 5).map((h, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-white">{h.quizId ? 'Quiz' : 'Test'}</span>
                <span className="text-accent-green">{h.score}/{h.total}</span>
              </div>
            ))}
          </div>
        ) : <p className="text-text-secondary">No quiz history yet</p>}
      </div>
    </div>
  );
};
export default Profile;