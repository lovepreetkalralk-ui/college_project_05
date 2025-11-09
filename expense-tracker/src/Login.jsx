// src/components/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <input placeholder="john@example.com" value={email} onChange={e => setEmail(e.target.value)} type="email" required />
        <input placeholder="Min 8 Characters" value={password} onChange={e => setPassword(e.target.value)} type="password" minLength={8} required />
        <button type="submit">Login</button>
        {error && <div className="error">{error}</div>}
        <span>Don't have an account? <Link to="/signup">Sign Up</Link></span>
      </form>
      {/* Add your styled right-side info/demo here */}
    </div>
  );
}

export default Login;



