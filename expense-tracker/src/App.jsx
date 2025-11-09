import { useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");

  // 🔹 Load data from Firestore when app loads
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "transactions"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(data);
    };
    fetchData();
  }, []);

  // 🔹 Add transaction to Firestore
  const addTransaction = async (e) => {
    e.preventDefault();

    let amount = 0;
    if (income) amount = +income;
    if (expense) amount = -Math.abs(expense);

    if (!text || amount === 0) return alert("Enter valid transaction");

    await addDoc(collection(db, "transactions"), { text, amount });

    setText("");
    setIncome("");
    setExpense("");

    // Reload data
    const querySnapshot = await getDocs(collection(db, "transactions"));
    setTransactions(querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  // 🔹 Delete transaction from Firestore
  const removeTransaction = async (id) => {
    await deleteDoc(doc(db, "transactions", id));
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const total = transactions.reduce((acc, t) => acc + t.amount, 0).toFixed(2);
  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0)
    .toFixed(2);
  const totalExpense = (
    transactions.filter((t) => t.amount < 0).reduce((acc, t) => acc + t.amount, 0) * -1
  ).toFixed(2);

  return (
    <div className="container">
      <center><h2>Expense Tracker (Firebase)</h2></center>

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
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter transaction..."
          />
        </div>

        <div className="form-control">
          <label>Amount Credited</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Enter credited amount..."
          />
        </div>

        <div className="form-control">
          <label>Amount Deducted</label>
          <input
            type="number"
            value={expense}
            onChange={(e) => setExpense(e.target.value)}
            placeholder="Enter deducted amount..."
          />
        </div>

        <button className="btn">Add Transaction</button>
      </form>

      <h3>Transactions</h3>
      <ul className="list">
        {transactions.map((t) => (
          <li key={t.id} className={t.amount < 0 ? "minus" : "plus"}>
            {t.text}{" "}
            <span>
              {t.amount < 0 ? "-" : "+"}${Math.abs(t.amount)}
            </span>
            <button className="delete-btn" onClick={() => removeTransaction(t.id)}>
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;



