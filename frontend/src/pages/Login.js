import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try { await login(email, password); navigate('/'); }
    catch (err) { setError(err.response?.data?.message || 'Login failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="card p-8">
          <h1 className="text-3xl font-bold text-white text-center mb-2">Welcome Back</h1>
          <p className="text-text-secondary text-center mb-6">Sign in to continue</p>
          {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" /><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="input-field pl-11" /></div>
            <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" /><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="input-field pl-11" /></div>
            <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2">{loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}</button>
          </form>
          <p className="text-center text-text-secondary mt-6">Don't have an account? <Link to="/signup" className="text-accent-yellow">Sign up</Link></p>
        </div>
      </motion.div>
    </div>
  );
};
export default Login;