import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Brain, Newspaper, FileText, User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-secondary/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-yellow to-accent-green flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">UPSC<span className="text-accent-yellow">Prep</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-text-secondary hover:text-white transition-colors">Home</Link>
          <Link to="/quiz" className="text-text-secondary hover:text-white transition-colors">Quiz</Link>
          <Link to="/affairs" className="text-text-secondary hover:text-white transition-colors">Current Affairs</Link>
          <Link to="/subjects" className="text-text-secondary hover:text-white transition-colors">Subjects</Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="flex items-center gap-2 hover:bg-white/5 px-3 py-2 rounded-lg">
                <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-full" />
                <span className="text-white hidden sm:inline">{user.username}</span>
              </Link>
              <button onClick={logout} className="text-text-secondary hover:text-white">Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-text-secondary hover:text-white">Login</Link>
              <Link to="/signup" className="btn-primary text-sm">Sign Up</Link>
            </div>
          )}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-secondary border-t border-white/5 p-4 space-y-3">
          <Link to="/" className="block py-2 text-white">Home</Link>
          <Link to="/quiz" className="block py-2 text-white">Quiz</Link>
          <Link to="/affairs" className="block py-2 text-white">Current Affairs</Link>
          <Link to="/subjects" className="block py-2 text-white">Subjects</Link>
        </div>
      )}
    </nav>
  );
};
export default Navbar;