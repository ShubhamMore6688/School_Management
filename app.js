import express from 'express';
import schoolRoutes from './routes/schoolRoutes.js';
import { initializeDatabase } from "./config/db.js";


const app = express();

app.use(express.json());
app.use('/api', schoolRoutes);

app.get('/', (req, res)=> {
    res.json("server is listening")
})

const PORT = process.env.PORT || 3000;



// Initialize the database
initializeDatabase().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});

