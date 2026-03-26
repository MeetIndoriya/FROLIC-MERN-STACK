const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = "mysecretkey";

const user =
{
    id: 1,
    email: "test@gmail.com",
    password: "123456"
};


app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email !== user.email || password !== user.password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        SECRET_KEY,
        { expiresIn: "1h" }
    );

    res.json({ token });
});


function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }

        req.user = decoded;
        next();
    });
}

app.get("/dashboard", authMiddleware, (req, res) => {
    res.json({
        message: "Welcome to dashboard",
        user: req.user
    });
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});