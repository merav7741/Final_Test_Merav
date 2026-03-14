const express = require('express')
const mongoose = require('mongoose');
const app = express()
app.use(express.json());

const connectDB = require('./config/db');
const productRoutes =require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/authRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
require('dotenv').config();

connectDB();
app.use('/auth', authRoutes);
app.use('/product', productRoutes);
app.use('/category', categoryRoutes)
app.use(errorMiddleware);

mongoose.connection.once('open', () => {
console.log('Connected to MongoDB');
})

app.listen(process.env.PORT, () =>
    console.log(`Server running on port${process.env.PORT}`))