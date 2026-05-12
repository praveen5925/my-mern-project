import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }
    setLoading(true);
    try { await signup(username, email, password); navigate('/'); }
    catch (err) { setError(err.response?.data?.message || 'Signup failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="card p-8">
          <h1 className="text-3xl font-bold text-white text-center mb-2">Create Account</h1>
          <p className="text-text-secondary text-center mb-6">Join UPSC Prep for free</p>
          {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" /><input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required minLength={3} className="input-field pl-11" /></div>
            <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" /><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="input-field pl-11" /></div>
            <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" /><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required minLength={6} className="input-field pl-11" /></div>
            <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" /><input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required className="input-field pl-11" /></div>
            <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2">{loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}</button>
          </form>
          <p className="text-center text-text-secondary mt-6">Already have an account? <Link to="/login" className="text-accent-yellow">Sign in</Link></p>
        </div>
      </motion.div>
    </div>
  );
};
export default Signup;