const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here

let inputNumbers = [];

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})

function randomNumber() {
  return Math.floor(Math.random() * (1 + 25 - 1) + 1);
}

// GET rout to send back out quotes from /quotes
app.get('/numgen', (req, res) => {
  res.send(searchDisplay)
})

// POST route to get a new quote from the client (browser)
app.post('/numgen', (req, res) => {
  let guesses = req.body;
  console.log('Got our numbers', guesses);
  
  inputNumbers.push(guesses);
  res.sendStatus(201); // 201 status reresents Created - adding a thing

})

function searchDisplay(){
  let random = randomNumber();
  
  
}