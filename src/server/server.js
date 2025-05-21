// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const modelService = require('./modelService');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/constructorModels', (req, res) => {
  res.json(modelService.getAllModels());
});

app.post('/constructorModels', (req, res) => {
  const model = req.body;
  try {
    const newModel = modelService.addModel(model);
    res.status(201).json(newModel);
  } catch (e) {
    if (e.message === 'duplicate') {
      res.status(409).json({ message: 'Такая модель уже существует' });
    } else {
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
