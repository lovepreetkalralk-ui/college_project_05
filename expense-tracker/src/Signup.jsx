// src/components/Signup.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create an Account</h2>
        <input placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required />
        <input placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} type="email" required />
        <input placeholder="Min 8 Characters" value={password} onChange={e => setPassword(e.target.value)} type="password" minLength={8} required />
        <button type="submit">Sign Up</button>
        {error && <div className="error">{error}</div>}
        <span>Already have an account? <Link to="/login">Login</Link></span>
      </form>
      {/* Add your styled right-side info/demo here */}
    </div>
  );
}

export default Signup;
