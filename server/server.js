const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Sample data for exams
let exams = [
    {
        id: 1,
        student: { first_name: 'Ayoub', last_name: 'Aksas' },
        meeting_point: 'Martigues-B',
        date: '2023-12-01T10:00:00Z',
        status: 'Confirmé'
    },
    {
        id: 2,
        student: { first_name: 'Jane', last_name: 'Smith' },
        meeting_point: 'Martigues-A',
        date: '2023-12-02T11:00:00Z',
        status: 'Annulé'
    }
];

// GET /exams - Fetch all exams
app.get('/exams', (req, res) => {
    res.status(200).json(exams);
});

// POST /exams - Create a new exam
app.post('/exams', (req, res) => {
    const { student, meeting_point, date, status } = req.body;

    // Validate request body according to the schema
    if (!student?.first_name || !student?.last_name) {
        return res.status(400).json({ error: 'Invalid exam data' });
    }

    // Create a new exam object
    const newExam = {
        id: exams.length + 1,
        student,
        meeting_point,
        date,
        status
    };

    exams.push(newExam); // Add new exam to the array
    res.status(201).json(newExam); // Respond with the newly created exam
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
