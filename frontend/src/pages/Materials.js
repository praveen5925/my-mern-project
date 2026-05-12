import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, FileText } from 'lucide-react';
import axios from 'axios';

const Materials = () => {
  const { subject } = useParams();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/materials/subject/${subject}`);
        setMaterials(res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    if (subject) fetchMaterials();
  }, [subject]);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 text-accent-yellow animate-spin" /></div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{subject} Study Materials</h1>
        <p className="text-text-secondary">Notes, summaries & quick revision</p>
      </motion.div>

      <div className="space-y-4">
        {materials.map((mat, i) => (
          <motion.div key={mat._id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="card">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-yellow/20 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-accent-yellow" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-medium text-white">{mat.title}</h3>
                  <span className="subject-tag bg-accent-blue/20 text-accent-blue text-xs">{mat.type}</span>
                </div>
                <p className="text-text-secondary text-sm mb-3">{mat.content}</p>
                {mat.importantPoints && (
                  <div className="flex flex-wrap gap-2">
                    {mat.importantPoints.slice(0, 5).map((point, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-accent-green/10 text-accent-green rounded">{point}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        {materials.length === 0 && <p className="text-center text-text-secondary py-12">No materials available for this subject</p>}
      </div>
    </div>
  );
};
export default Materials;