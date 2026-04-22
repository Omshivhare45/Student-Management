import { useState, useEffect } from "react";
import { studentAPI } from "../../api/studentAPI";
import { Loader, Modal } from "./UI";
import toast from "react-hot-toast";
import "./Students.css";

const emptyForm = {
  name: "", rollNumber: "", email: "", phone: "", class: "", address: "",
};

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async (searchVal = "") => {
    try {
      setLoading(true);
      const res = await studentAPI.getAll(searchVal);
      setStudents(res.data.data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    fetchStudents(val);
  };

  const openAdd = () => {
    setEditStudent(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (student) => {
    setEditStudent(student);
    setForm({
      name: student.name,
      rollNumber: student.rollNumber,
      email: student.email,
      phone: student.phone || "",
      class: student.class,
      address: student.address || "",
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.rollNumber || !form.email || !form.class) {
      toast.error("Name, Roll, Email, Class required!");
      return;
    }
    try {
      setSubmitting(true);
      if (editStudent) {
        await studentAPI.update(editStudent._id, form);
        toast.success("Student updated!");
      } else {
        await studentAPI.add(form);
        toast.success("Student added!");
      }
      setShowModal(false);
      fetchStudents(search);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    try {
      await studentAPI.delete(id);
      toast.success("Deleted!");
      fetchStudents(search);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Students</h1>
          <p>{students.length} students enrolled</p>
        </div>
        <button className="btn-primary" onClick={openAdd}>+ Add Student</button>
      </div>

      <div className="search-bar">
        <span className="search-icon">⌕</span>
        <input
          type="text"
          placeholder="Search by name, roll number, email..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <Loader />
      ) : students.length === 0 ? (
        <div className="empty-state">No students found</div>
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Roll No.</th>
                <th>Name</th>
                <th>Class</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s._id}>
                  <td><span className="badge">{s.rollNumber}</span></td>
                  <td className="name-cell">{s.name}</td>
                  <td>{s.class}</td>
                  <td className="muted">{s.email}</td>
                  <td className="muted">{s.phone || "—"}</td>
                  <td>
                    <button className="btn-edit" onClick={() => openEdit(s)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDelete(s._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <Modal
          title={editStudent ? "Edit Student" : "Add Student"}
          onClose={() => setShowModal(false)}
        >
          <div className="form-grid">
            {[
              { key: "name", label: "Full Name", placeholder: "Rahul Sharma" },
              { key: "rollNumber", label: "Roll Number", placeholder: "CS001" },
              { key: "email", label: "Email", placeholder: "rahul@example.com" },
              { key: "phone", label: "Phone", placeholder: "9876543210" },
              { key: "class", label: "Class", placeholder: "10th / BCA-1" },
              { key: "address", label: "Address", placeholder: "Delhi" },
            ].map(({ key, label, placeholder }) => (
              <div className="form-group" key={key}>
                <label>{label}</label>
                <input
                  type="text"
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
              </div>
            ))}
          </div>
          <div className="modal-actions">
            <button className="btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn-primary" onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Saving..." : editStudent ? "Update" : "Add Student"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Students;