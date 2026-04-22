import { useState, useEffect } from "react";
import { marksAPI } from "../../api/marksapi";
import { studentAPI } from "../../api/studentapi";
import { Loader, Modal } from "../shared/UI";
import toast from "react-hot-toast";
import "./Marks.css";

const emptyForm = {
  student: "",
  subject: "",
  marks: "",
  totalMarks: 100,
  examType: "Unit Test",
};

const examTypes = ["Unit Test", "Mid Term", "Final"];

const getGrade = (obtained, total) => {
  const pct = (obtained / total) * 100;
  if (pct >= 90) return { label: "A+", cls: "grade-a-plus" };
  if (pct >= 75) return { label: "A",  cls: "grade-a" };
  if (pct >= 60) return { label: "B",  cls: "grade-b" };
  if (pct >= 45) return { label: "C",  cls: "grade-c" };
  return { label: "F", cls: "grade-f" };
};

const Marks = () => {
  const [marks, setMarks]         = useState([]);
  const [students, setStudents]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [filterStudent, setFilterStudent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editMark, setEditMark]   = useState(null);
  const [form, setForm]           = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchStudents();
    fetchMarks();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await studentAPI.getAll();
      setStudents(res.data.data);
    } catch (err) {
      toast.error("Could not load students");
    }
  };

  const fetchMarks = async (studentId = "") => {
    try {
      setLoading(true);
      const res = await marksAPI.getAll(studentId);
      setMarks(res.data.data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const val = e.target.value;
    setFilterStudent(val);
    fetchMarks(val);
  };

  const openAdd = () => {
    setEditMark(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (mark) => {
    setEditMark(mark);
    setForm({
      student:    mark.student._id,
      subject:    mark.subject,
      marks:      mark.marks,
      totalMarks: mark.totalMarks,
      examType:   mark.examType,
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    console.log("button clicked")
    if (!form.student || !form.subject || form.marks === "") {
      toast.error("Student, Subject and Marks are required!");
      return;
    }
    if (Number(form.marks) > Number(form.totalMarks)) {
      toast.error("Marks cannot exceed Total Marks!");
      return;
    }
    try {
      setSubmitting(true);
      if (editMark) {
        await marksAPI.update(editMark._id, form);
        toast.success("Marks updated!");
      } else {
        await marksAPI.add(form);
        toast.success("Marks added!");
      }
      setShowModal(false);
      fetchMarks(filterStudent);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      await marksAPI.delete(id);
      toast.success("Deleted!");
      fetchMarks(filterStudent);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Marks</h1>
          <p>{marks.length} records found</p>
        </div>
        <button className="btn-primary" onClick={openAdd}>+ Add Marks</button>
      </div>

      {/* Filter */}
      <div className="marks-filter">
        <select value={filterStudent} onChange={handleFilterChange}>
          <option value="">All Students</option>
          {students.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name} — {s.rollNumber}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <Loader />
      ) : marks.length === 0 ? (
        <div className="empty-state">No marks records found</div>
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll No.</th>
                <th>Subject</th>
                <th>Exam Type</th>
                <th>Marks</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((m) => {
                const grade = getGrade(m.marks, m.totalMarks);
                const pct   = Math.round((m.marks / m.totalMarks) * 100);
                return (
                  <tr key={m._id}>
                    <td className="name-cell">{m.student?.name || "—"}</td>
                    <td><span className="badge">{m.student?.rollNumber || "—"}</span></td>
                    <td>{m.subject}</td>
                    <td>
                      <span className={`exam-badge exam-${m.examType.replace(" ", "-").toLowerCase()}`}>
                        {m.examType}
                      </span>
                    </td>
                    <td>
                      <div className="marks-cell">
                        <span>{m.marks}/{m.totalMarks}</span>
                        <div className="marks-bar">
                          <div className="marks-bar-fill" style={{ width: `${pct}%`, backgroundColor: pct >= 75 ? "var(--success)" : pct >= 45 ? "var(--warning)" : "var(--danger)" }} />
                        </div>
                      </div>
                    </td>
                    <td><span className={`grade-badge ${grade.cls}`}>{grade.label}</span></td>
                    <td>
                      <button className="btn-edit" onClick={() => openEdit(m)}>Edit</button>
                      <button className="btn-delete" onClick={() => handleDelete(m._id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <Modal
          title={editMark ? "Edit Marks" : "Add Marks"}
          onClose={() => setShowModal(false)}
        >
          <div className="form-grid">
            {/* Student */}
            <div className="form-group">
              <label>Student</label>
              <select
                value={form.student}
                onChange={(e) => setForm({ ...form, student: e.target.value })}
              >
                <option value="">Select student</option>
                {students.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name} — {s.rollNumber}
                  </option>
                ))}
              </select>
            </div>

            {/* Exam Type */}
            <div className="form-group">
              <label>Exam Type</label>
              <select
                value={form.examType}
                onChange={(e) => setForm({ ...form, examType: e.target.value })}
              >
                {examTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                placeholder="e.g. Mathematics"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
            </div>

            {/* Marks */}
            <div className="form-group">
              <label>Marks Obtained</label>
              <input
                type="number"
                placeholder="0"
                min="0"
                max={form.totalMarks}
                value={form.marks}
                onChange={(e) => setForm({ ...form, marks: e.target.value })}
              />
            </div>

            {/* Total Marks */}
            <div className="form-group">
              <label>Total Marks</label>
              <input
                type="number"
                placeholder="100"
                min="1"
                value={form.totalMarks}
                onChange={(e) => setForm({ ...form, totalMarks: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button className="btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn-primary" onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Saving..." : editMark ? "Update" : "Add Marks"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Marks;