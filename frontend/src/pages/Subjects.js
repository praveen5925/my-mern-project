import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const subjects = [
  { name: 'History', desc: 'Ancient, Medieval, Modern India & World', icon: '🏛️', color: 'from-orange-500 to-red-500' },
  { name: 'Geography', desc: 'Physical, Indian & World Geography', icon: '🗺️', color: 'from-green-500 to-emerald-500' },
  { name: 'Polity', desc: 'Constitution, Parliament, Judiciary', icon: '⚖️', color: 'from-blue-500 to-indigo-500' },
  { name: 'Economy', desc: 'Macroeconomics, Planning, Sectors', icon: '💰', color: 'from-yellow-500 to-orange-500' },
  { name: 'Science', desc: 'Physics, Chemistry, Biology, Tech', icon: '🔬', color: 'from-purple-500 to-pink-500' },
  { name: 'Environment', desc: 'Ecology, Biodiversity, Climate', icon: '🌿', color: 'from-green-600 to-teal-500' },
  { name: 'Ethics', desc: 'Integrity, Aptitude, Case Studies', icon: '💡', color: 'from-amber-500 to-yellow-500' },
];

const Subjects = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-2">Subject Categories</h1>
        <p className="text-text-secondary">Study materials & notes for all subjects</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subj, i) => (
          <Link key={subj.name} to={`/materials/${subj.name}`}>
            <motion.div whileHover={{ scale: 1.03 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card hover:border-accent-yellow/50">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${subj.color} flex items-center justify-center mb-4`}>
                <span className="text-3xl">{subj.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{subj.name}</h3>
              <p className="text-text-secondary text-sm">{subj.desc}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Subjects;