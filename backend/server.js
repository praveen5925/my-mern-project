const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/upscprep', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/questions');
const affairsRoutes = require('./routes/affairs');
const materialRoutes = require('./routes/materials');
const userRoutes = require('./routes/user');

app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/affairs', affairsRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));