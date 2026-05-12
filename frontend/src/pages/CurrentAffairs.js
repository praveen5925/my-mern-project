import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Bookmark, Calendar } from 'lucide-react';
import axios from 'axios';

const CurrentAffairs = () => {
  const [affairs, setAffairs] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'National', 'International', 'Economy', 'Science & Tech', 'Environment', 'Sports', 'Govt Schemes'];

  useEffect(() => {
    const fetchAffairs = async () => {
      setLoading(true);
      try {
        const query = category !== 'All' ? `?category=${category}` : '';
        const res = await axios.get(`/api/affairs${query}`);
        setAffairs(res.data.affairs || res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchAffairs();
  }, [category]);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-accent-yellow animate-spin" /></div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Current Affairs</h1>
        <p className="text-text-secondary">Stay updated with latest news for UPSC</p>
      </motion.div>

      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            category === cat ? 'bg-accent-yellow text-white' : 'bg-secondary text-text-secondary hover:bg-tertiary'
          }`}>{cat}</button>
        ))}
      </div>

      <div className="space-y-4">
        {affairs.map((affair, i) => (
          <motion.div key={affair._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card">
            <div className="flex items-start justify-between mb-3">
              <div className="flex gap-2">
                <span className="subject-tag bg-accent-green/20 text-accent-green">{affair.category}</span>
                {affair.importance === 'High' && <span className="subject-tag bg-red-500/20 text-red-400">Important</span>}
              </div>
              <button className="text-text-secondary hover:text-accent-yellow"><Bookmark className="w-5 h-5" /></button>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">{affair.title}</h3>
            <p className="text-text-secondary text-sm mb-3">{affair.content}</p>
            {affair.tags && <div className="flex gap-2">{affair.tags.map(tag => <span key={tag} className="text-xs text-accent-blue">#{tag}</span>)}</div>}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default CurrentAffairs;