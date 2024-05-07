const express = require('express')
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/api/scores', (req, res) => {
    const highScores = [
        { name: 'Alice', score: 2000 },
        { name: 'Bob', score: 1800 }
    ];
    res.json(highScores);
});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});