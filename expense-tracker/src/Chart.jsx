// src/components/Dashboard.js
import React from 'react';
// import Chart.js and useEffect/useState to render dynamic graphs

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="summary-card">
        <span>Track Your Income & Expenses</span>
        <h2>$430,000</h2>
      </div>
      <div className="chart-card">
        {/* Insert Chart.js bar graph here */}
        <canvas id="transactionsChart"></canvas>
      </div>
      {/* Recent transactions list here */}
    </div>
  );
}

export default Dashboard;
