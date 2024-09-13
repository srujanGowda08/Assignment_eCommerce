const app = require("./app.js");
const pool = require("./config/db.js");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions)); // Apply CORS middleware with options

pool.connect((err) => {
  if (err) {
    console.error("Database connection error", err);
  } else {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
});
