import { useState, useEffect } from "react";
import { dashboardAPI } from "../../api/dashboardAPI";
import { Loader } from "../../components/shared/UI";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await dashboardAPI.getStats();
      setStats(res.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="error-msg">⚠ {error}</div>;

  const cards = [
    { label: "Total Students", value: stats?.totalStudents ?? 0, icon: "◈", color: "blue" },
    { label: "Present Today", value: stats?.todayPresent ?? 0, icon: "◉", color: "green" },
    { label: "Absent Today", value: stats?.todayAbsent ?? 0, icon: "○", color: "red" },
    { label: "Marks Records", value: stats?.totalMarksRecords ?? 0, icon: "◆", color: "yellow" },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Today's overview at a glance</p>
      </div>

      <div className="stats-grid">
        {cards.map((card) => (
          <div key={card.label} className={`stat-card stat-${card.color}`}>
            <span className="stat-icon">{card.icon}</span>
            <div className="stat-info">
              <span className="stat-value">{card.value}</span>
              <span className="stat-label">{card.label}</span>
            </div>
          </div>
        ))}
      </div>

      {stats?.classWiseCount?.length > 0 && (
        <div className="class-section">
          <h2>Class-wise Students</h2>
          <div className="class-grid">
            {stats.classWiseCount.map((item) => (
              <div key={item._id} className="class-card">
                <span className="class-name">{item._id}</span>
                <span className="class-count">{item.count}</span>
                <div
                  className="class-bar"
                  style={{
                    width: `${Math.min((item.count / stats.totalStudents) * 100, 100)}%`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;