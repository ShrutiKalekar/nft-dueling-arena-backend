
const express = require('express');
const bodyParser = require('body-parser');
const { connectToDatabase } = require('./db/mongo');
const userRoutes = require('./Routes/test');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to Database
connectToDatabase()
  .then(() => {
    console.log('Connected to MongoDB');
    // Use Routes
    app.use('/users', userRoutes);

    app.get("/", (req, res) => {
          res.json({ message: "Hello from server!" });
      });

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
