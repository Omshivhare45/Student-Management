# Student Management System - Backend

## Setup

```bash
cd backend
npm install
```

`.env` file mein apna MongoDB URI daalo:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/studentManagement
```

```bash
npm run dev   # development (nodemon)
npm start     # production
```

---

## Folder Structure

```
backend/
├── config/
│   └── db.js               # MongoDB connection
├── controllers/
│   ├── studentController.js
│   ├── attendanceController.js
│   ├── marksController.js
│   └── dashboardController.js
├── models/
│   ├── Student.js
│   ├── Attendance.js
│   └── Marks.js
├── routes/
│   ├── studentRoutes.js
│   ├── attendanceRoutes.js
│   ├── marksRoutes.js
│   └── dashboardRoutes.js
├── .env
├── package.json
└── server.js
```

---

## API Reference (Postman ke liye)

### 🎓 Students

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | /api/students         | Sabhi students           |
| GET    | /api/students?search= | Search by name/roll/email|
| GET    | /api/students/:id     | Single student           |
| POST   | /api/students         | Add student              |
| PUT    | /api/students/:id     | Update student           |
| DELETE | /api/students/:id     | Delete student           |

**POST /api/students - Body:**
```json
{
  "name": "Rahul Sharma",
  "rollNumber": "CS001",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "class": "10th",
  "address": "Delhi"
}
```

---

### 📋 Attendance

| Method | Endpoint                        | Description              |
|--------|---------------------------------|--------------------------|
| GET    | /api/attendance                 | Sabhi records            |
| GET    | /api/attendance?date=2024-01-15 | Date ke basis par filter |
| GET    | /api/attendance?studentId=xyz   | Student ke basis par     |
| POST   | /api/attendance                 | Attendance mark karo     |
| DELETE | /api/attendance/:id             | Record delete karo       |

**POST /api/attendance - Body:**
```json
{
  "student": "<student_id>",
  "date": "2024-01-15",
  "status": "Present"
}
```

---

### 📝 Marks

| Method | Endpoint                     | Description         |
|--------|------------------------------|---------------------|
| GET    | /api/marks                   | Sabhi marks         |
| GET    | /api/marks?studentId=xyz     | Student ke marks    |
| POST   | /api/marks                   | Marks add karo      |
| PUT    | /api/marks/:id               | Marks update karo   |
| DELETE | /api/marks/:id               | Marks delete karo   |

**POST /api/marks - Body:**
```json
{
  "student": "<student_id>",
  "subject": "Mathematics",
  "marks": 85,
  "totalMarks": 100,
  "examType": "Unit Test"
}
```
> examType options: "Unit Test" | "Mid Term" | "Final"

---

### 📊 Dashboard

| Method | Endpoint        | Description      |
|--------|-----------------|------------------|
| GET    | /api/dashboard  | Stats fetch karo |

**Response:**
```json
{
  "success": true,
  "data": {
    "totalStudents": 25,
    "todayPresent": 20,
    "todayAbsent": 5,
    "totalMarksRecords": 75,
    "classWiseCount": [
      { "_id": "10th", "count": 10 },
      { "_id": "11th", "count": 15 }
    ]
  }
}
```