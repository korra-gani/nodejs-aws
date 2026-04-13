const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// 🔥 Paste your API Gateway URL here
const API_URL = "https://YOUR-API-ID.execute-api.ap-south-1.amazonaws.com/login";

app.get("/", (req, res) => {
    res.send(`
    <h2>Login Page</h2>

    <form method="POST" action="/login">
        <input name="email" placeholder="Email" required />
        <br/><br/>
        <input name="password" type="password" placeholder="Password" required />
        <br/><br/>
        <button type="submit">Login</button>
    </form>
    `);
});

app.post("/login", async (req, res) => {
    try {
        const response = await axios.post(API_URL, req.body);
        res.send(response.data.message);
    } catch (err) {
        res.send(err.response?.data?.message || "Error");
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
