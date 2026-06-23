import{ useState }from "react";
import{ getPortalData }from "../../api/portalapi";
import toast from "react-hot-toast";
import "./Portal.css";

export default function Portal() {
    const [roll, setRoll] = useState("");
    const [data, setData]  =useState(null);

    const handleSearch = async() => {
        if(!roll.trim()) return toast.error("Please enter a roll number");
        try{
            const res = await getPortalData(roll.trim());
            setData(res.data.data);
        } catch (error) {
            toast.error("Error fetching portal data", error);
            setData(null);
        }
    
    };

    return (
        <div className="portal-container">
            <h2>Student Portal</h2>

            <div className="search-section">
                <input
                    type="text"
                    placeholder="Enter roll number"
                    value={roll}
                    onChange={(e) => setRoll(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {data && (
                <>
                <div className="card">
                    <h3>{data.student.name}</h3>
                    <p>Roll: {data.student.rollNumber}</p>
                    <p>Attendance: <strong>{data.Percentage}%</strong></p>
                </div>

                <h4>Attendance</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.attendance.map(a => (
                            <tr key={a._id}>
                                <td>{new Date(a.date).toLocaleDateString("en-IN")}</td>
                                    <td style={{ color: a.status === "Present" ? "green" : "red" }}>
                                    {a.status}
                                </td>
                            </tr>
              ))}
                    </tbody>
                </table>
                
                <h4>Marks</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.marks.map(m => (
                            <tr key = { m._id }>
                                <td>{m.subject}</td>
                                <td>{m.marks}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                </>
            )}
        </div>
    )
}