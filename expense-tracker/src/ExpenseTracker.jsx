/// src/ExpenseTracker.jsx
import React, { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import { collection, addDoc, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "./App.css";

function ExpenseTracker() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [user, setUser] = useState(null);

  // Track logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  // Load user-specific transactions
  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const q = query(collection(db, "transactions"), where("uid", "==", user.uid));
      const snapshot = await getDocs(q);
      setTransactions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, [user]);

  const addTransaction = async (e) => {
    e.preventDefault();
    if (!user) return alert("User not logged in");

    let amount = income ? +income : expense ? -Math.abs(expense) : 0;
    if (!text || amount === 0) return alert("Enter valid transaction");

    await addDoc(collection(db, "transactions"), {
      text,
      amount,
      uid: user.uid,
      createdAt: new Date()
    });

    setText(""); setIncome(""); setExpense("");

    // Reload
    const q = query(collection(db, "transactions"), where("uid", "==", user.uid));
    const snapshot = await getDocs(q);
    setTransactions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const removeTransaction = async (id) => {
    await deleteDoc(doc(db, "transactions", id));
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const total = transactions.reduce((acc, t) => acc + t.amount, 0).toFixed(2);
  const totalIncome = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0).toFixed(2);
  const totalExpense = (transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0) * -1).toFixed(2);

  return (
    <div className="container">
      <h2>Expense Tracker (Firebase)</h2>
      <h4>Current Balance</h4>
      <h1>${total}</h1>

      <div className="inc_exp-container">
        <div>
          <h4>Amount Credited</h4>
          <p className="money-plus">+${totalIncome}</p>
        </div>
        <div>
          <h4>Amount Deducted</h4>
          <p className="money-minus">-${totalExpense}</p>
        </div>
      </div>

      <form onSubmit={addTransaction}>
        <div className="form-control">
          <label>Transaction Subject</label>
          <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Enter transaction..." />
        </div>

        <div className="form-control">
          <label>Amount Credited</label>
          <input type="number" value={income} onChange={e => setIncome(e.target.value)} placeholder="Enter credited amount..." />
        </div>

        <div className="form-control">
          <label>Amount Deducted</label>
          <input type="number" value={expense} onChange={e => setExpense(e.target.value)} placeholder="Enter deducted amount..." />
        </div>

        <button className="btn">Add Transaction</button>
      </form>

      <h3>Transactions</h3>
      <ul className="list">
        {transactions.map(t => (
          <li key={t.id} className={t.amount < 0 ? "minus" : "plus"}>
            {t.text} <span>{t.amount < 0 ? "-" : "+"}${Math.abs(t.amount)}</span>
            <button className="delete-btn" onClick={() => removeTransaction(t.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseTracker;
