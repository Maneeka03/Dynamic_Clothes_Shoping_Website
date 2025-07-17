const express = require('express');
const userRoutes = require('./Route/userRoutes');
const clothRoutes = require('./Route/clothRoutes');
require('dotenv').config();
const cors = require('cors');



const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cors());



app.use(express.urlencoded({extended:false}));  


app.use('/api/users',userRoutes);
app.use('/api/cloth',clothRoutes);

app.listen(PORT, ()=> console.log(`Server is Running on PORT Number ${PORT}`));
