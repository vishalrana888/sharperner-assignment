const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware to parse JSON and cookies
app.use(bodyParser.json());
app.use(cookieParser());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Route for the login page
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

// Route to handle login form submission
app.post('/login', (req, res) => {
    const { username } = req.body;

    // Set username in a cookie
    res.cookie('username', username);

    // Redirect to the home page
    res.redirect('/');
});

// Route to handle sending messages
app.post('/send-message', (req, res) => {
    const { message } = req.body;
    const username = req.cookies.username;

    if (!username) {
        return res.status(403).send('Forbidden');
    }

    const data = `${username}: ${message}\n`;

    // Append the message to a file
    fs.appendFile('messages.txt', data, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        console.log('Message saved!');
        res.send('Message sent!');
    });
});
// Add this route to retrieve messages
app.get('/get-messages', (req, res) => {
    fs.readFile('messages.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        // Split the content into an array of messages (assuming one message per line)
        const messages = data.split('\n');

        // Send the messages as JSON
        res.json({ messages });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
