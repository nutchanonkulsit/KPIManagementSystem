const dotenv = require("dotenv");
// dotenv.config();
const app = require("./app");

// Test DB Connection
require("./config/db");


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
