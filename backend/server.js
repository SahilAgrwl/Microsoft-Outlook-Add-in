const express = require('express');
const axios = require('axios');
const qs = require('qs');
const cors = require('cors');

const app = express();
const port = 3000; // Choose a port for your backend server

// Enable CORS for all routes
app.use(cors());

// Define your Microsoft Graph API endpoint
const graphApiUrl = 'https://graph.microsoft.com';

// Middleware to parse JSON request bodies
app.use(express.json());

// Authentication endpoint
app.get('/login', (req, res) => {
  // Redirect to Microsoft Graph API for authentication
  const authorizeUrl = `https://login.microsoftonline.com/4bb08996-e5e3-46e9-816e-a5ec6b9394c6/oauth2/v2.0/authorize?` +
    `client_id=495a711b-5c5e-4005-ba8a-9cd7d44d7e70&response_type=code&redirect_uri=http://localhost:${port}/callback&` +
    `scope=User.Read%20Mail.Read&response_mode=query`;

  res.redirect(authorizeUrl);
});

// Callback endpoint to exchange authorization code for access token
app.get('/callback', async (req, res) => {
  const code = req.query.code;

  // Exchange code for access token
  try {
    const tokenResponse = await axios.post('https://login.microsoftonline.com/4bb08996-e5e3-46e9-816e-a5ec6b9394c6/oauth2/v2.0/token', qs.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: `http://localhost:${port}/callback`,
      client_id: '495a711b-5c5e-4005-ba8a-9cd7d44d7e70',
      client_secret: '6DQ8Q~gopE1KCHcJo9zF~Ci0UASB~KciPTR.7bHJ',
      scope: 'User.Read Mail.Read',
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = tokenResponse.data.access_token;

    // Redirect to your frontend application with the access token
    res.redirect(`http://localhost:8081/?access_token=${accessToken}`);
  } catch (error) {
    console.error('Error exchanging code for access token:', error);
    res.status(500).send('Error exchanging code for access token');
  }
});

// ... (your existing code)

// Example endpoint to fetch inbox folders
app.get('/api/inboxfolders', async (req, res) => {
    const accessToken = req.headers.authorization.split(' ')[1];
    console.log('Access Token:', accessToken);
  
    try {
      const response = await axios.get(`${graphApiUrl}/me/mailFolders`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const inboxFolders = response.data.value;
      const formattedFolders = inboxFolders.map(folder => ({
        id: folder.id,
        displayName: folder.displayName,
      }));
  
      res.json(formattedFolders);
    } catch (error) {
      console.error('Error fetching inbox folders:', error);
      res.status(500).send('Error fetching inbox folders');
    }
  });
  
  
  // ... (rest of your existing code)
  

// Example endpoint to fetch emails
app.get('/api/emails', async (req, res) => {
  const accessToken = req.headers.authorization.split(' ')[1];

  try {
    // Fetch emails using the access token
    const response = await axios.get(`${graphApiUrl}/me/messages`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const emails = response.data.value;
    res.json(emails);
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).send('Error fetching emails');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
