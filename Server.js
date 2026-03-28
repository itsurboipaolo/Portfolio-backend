const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let leads = []; // simple storage (we upgrade later)

// EMAIL SETUP
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "paulerwanbesong@gmail.com",
        pass: "YOUR_APP_PASSWORD" // IMPORTANT
    }
});

// FORM SUBMIT
app.post("/send", async (req, res) => {
    const { name, email, message } = req.body;

    // Save lead
    leads.push({ name, email, message });

    // Send email
    await transporter.sendMail({
        from: email,
        to: "paulerwanbesong@gmail.com",
        subject: "New Client Request",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    });

    res.send({ success: true });
});

// ADMIN PANEL DATA
app.get("/leads", (req, res) => {
    res.send(leads);
});

app.listen(3000, () => console.log("Server running on port 3000"));
