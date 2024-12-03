import express from 'express';
import schoolRoutes from './routes/schoolRoutes.js';

const app = express();

app.use(express.json());
app.use('/api', schoolRoutes);

app.get('/', (req, res)=> {
    res.json("server is listening")
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
