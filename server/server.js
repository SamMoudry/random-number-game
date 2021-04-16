const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;
const {response} = require("express")
// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here

let inputNumbers = [];
let taco1 = [];
let taco2 = [];

app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})

function randomNumber() {
  return Math.floor(Math.random() * (1 + 25 - 1) + 1);
}

// GET rout to send back out quotes from /quotes
app.get('/numgen', (req, res) => {
  console.log(taco1.length + ' ' + taco2.length);
  console.log('Input Numbers:' + inputNumbers.length);
  res.send({taco1, taco2})
  taco1 = [];
  taco2 = [];
})

// POST route to get a new quote from the client (browser)
app.post('/numgen', (req, res) => {
  let guesses = req.body;
  console.log('Got our numbers', guesses);
  console.log(random);
  inputNumbers.push(guesses);
  searchDisplay();
  res.sendStatus(201); // 201 status reresents Created - adding a thing

})



let random = randomNumber();
function searchDisplay(){
  
  for (let i = 0; i < inputNumbers.length; i++) {
    if (random == inputNumbers[i].personOne) {
      taco1.push('Player 1: Ding Ding Ding');
    } else if (random > inputNumbers[i].personOne) {
      taco1.push('Player 1: To Low');
    } else if (random < inputNumbers[i].personOne) {
      taco1.push('Player 1: To High');
    }
    if (random == inputNumbers[i].personTwo) {
      taco2.push('Player 2: Ding Ding Ding');
    } else if (random > inputNumbers[i].personTwo) {
      taco2.push('Player 2: To Low');
    } else if (random < inputNumbers[i].personTwo) {
      taco2.push('Player 2: To High');
    }
  
    
  }

    
  
}

