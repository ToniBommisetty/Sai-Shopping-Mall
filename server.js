const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }));

mongoose.connect('mongodb://127.0.0.1:27017/toni', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const userSchema = new mongoose.Schema({
    firstname: String,
    surname: String,
    mobile: String,
    email: { type: String, unique: true },
    password: String
});

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.post('/register', async (req, res) => {
    const { firstname, surname, mobile, email, password, confirm_password } = req.body;

    if (!firstname || !surname || !mobile || !email || !password || !confirm_password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirm_password) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstname, surname, mobile, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "✅ User registered successfully" });
    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ error: "Error registering user" });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const userData = { 
            firstname: user.firstname, 
            surname: user.surname, 
            email: user.email 
        };

        res.status(200).json({ message: "Login successful", user: userData });
    } catch (error) {
        console.error("❌ Error logging in user:", error);
        res.status(500).json({ error: "Error logging in user" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});