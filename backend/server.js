// backend/server.js
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// User data storage
const USER_DATA_FILE = path.join(__dirname, "users.json");

// Load existing users from file
let users = {};
if (fs.existsSync(USER_DATA_FILE)) {
    users = JSON.parse(fs.readFileSync(USER_DATA_FILE));
}

// Sign up route
app.post("/signup", (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
    }
    
    if (users[email]) {
        return res.status(400).json({ message: "User already exists." });
    }

    users[email] = password;
    fs.writeFileSync(USER_DATA_FILE, JSON.stringify(users));
    res.json({ message: "Signup successful!" });
});

// Login route
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (users[email] && users[email] === password) {
        return res.json({ message: "Login successful!" });
    } else {
        return res.status(401).json({ message: "Invalid credentials." });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
