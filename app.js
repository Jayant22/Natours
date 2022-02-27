const express = require('express');
const fs = require('fs');

const app = express();

const port = 8000;
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours.json`)
);

app.get('/', (req, res) => {
  res.status(200).json('Hello World!');
});

app.get('/Intours/', (req, res) => {
  res.status(200).json('API World!');
});

app.use(express.json());

app.get('/Intours/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/Intours/v1/tours', (req, res) => {
    
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
