import { useState, useEffect } from "react";
import { attendanceAPI } from "../../api/attendanceAPI";
import { studentAPI } from "../../api/studentAPI";
import { Loader } from "../../components/shared/UI";
import toast from "react-hot-toast";
import "./Attendance.css";

const Attendance = () => {
  const [records, setRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");
  const [form, setForm] = useState({
    student: "", date: new Date().toISOString().split("T")[0], status: "Present",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchStudents();
    fetchAttendance();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await studentAPI.getAll();
      setStudents(res.data.data);
    } catch (err) {
      toast.error("Could not load students");
    }
  };

  const fetchAttendance = async (date = "") => {
    try {
      setLoading(true);
      const filters = {};
      if (date) filters.date = date;
      const res = await attendanceAPI.getAll(filters);
      setRecords(res.data.data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterDate = (e) => {
    const val = e.target.value;
    setFilterDate(val);
    fetchAttendance(val);
  };

  const handleMark = async () => {
    if (!form.student || !form.date) {
      toast.error("Student and Date required!");
      return;
    }
    try {
      setSubmitting(true);
      await attendanceAPI.mark(form);
      toast.success(`Attendance marked as ${form.status}`);
      fetchAttendance(filterDate);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      await attendanceAPI.delete(id);
      toast.success("Record deleted");
      fetchAttendance(filterDate);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Attendance</h1>
          <p>Mark and track daily attendance</p>
        </div>
      </div>

      {/* Mark Attendance Card */}
      <div className="mark-card">
        <h2>Mark Attendance</h2>
        <div className="mark-form">
          <div className="form-group">
            <label>Student</label>
            <select
              value={form.student}
              onChange={(e) => setForm({ ...form, student: e.target.value })}
            >
              <option value="">-- Select Student --</option>
              {students.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name} ({s.rollNumber})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <div className="status-toggle">
              {["Present", "Absent"].map((s) => (
                <button
                  key={s}
                  className={`toggle-btn ${form.status === s ? "active-" + s.toLowerCase() : ""}`}
                  onClick={() => setForm({ ...form, status: s })}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <button className="btn-primary mark-btn" onClick={handleMark} disabled={submitting}>
            {submitting ? "Marking..." : "Mark Attendance"}
          </button>
        </div>
      </div>

      {/* Filter + Records */}
      <div className="filter-row">
        <label>Filter by date:</label>
        <input type="date" value={filterDate} onChange={handleFilterDate} />
        {filterDate && (
          <button className="btn-ghost" onClick={() => { setFilterDate(""); fetchAttendance(""); }}>
            Clear
          </button>
        )}
      </div>

      {loading ? (
        <Loader />
      ) : records.length === 0 ? (
        <div className="empty-state">No attendance records found</div>
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll No.</th>
                <th>Class</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r._id}>
                  <td className="name-cell">{r.student?.name || "—"}</td>
                  <td><span className="badge">{r.student?.rollNumber}</span></td>
                  <td>{r.student?.class}</td>
                  <td className="muted">{r.date}</td>
                  <td>
                    <span className={`status-chip ${r.status === "Present" ? "chip-green" : "chip-red"}`}>
                      {r.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-delete" onClick={() => handleDelete(r._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Attendance;