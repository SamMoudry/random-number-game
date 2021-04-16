$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
  $('#guessBtn').on('click', function( event ){
    console.log('clicked');
    // because this is a form, default is to refresh page, 
    // we don't want that to happen, so we preventDefault
    event.preventDefault();
    addGuesses();
  })
}

function addGuesses() {
  let guesses = {
      personOne: $('#playerOne').val(),
      personTwo: $('#playerTwo').val(),
  }

  // ToDo - send to server
  console.log('Adding numbers', guesses);

  $.ajax({
      method: 'POST',
      url: '/numgen',
      data: guesses // this is goes in the request body
  })
      .then( function(response) {
          console.log('Added guesses');
          // changed data on the server, go get all the updates
          getGuesses();
      })
      .catch( function( error ){
          console.log('Error from server', error);
          alert('Sorry, could not add your numbers. Try again later.');
      })

  // clear inputs
  $('#playerOne').val('');
  $('#playerTwo').val('');
}

function getGuesses() {
  // ajax method returns back a Promise
  $.ajax({
      method: 'GET',
      url: '/numgen'
  })
      .then( function( response ) {
          console.log('Response from server', response);
          // the response is the array from the sever
          // pass the arry into our render method to display
          render( response );
      })
      .catch( function( error ){
          console.log('Error from server', error);
          alert('Sorry, could not get guesses. Try again later.');
      })
  console.log('After making server request...');
}

function render( object ){   
     // Empty the container first, in case there is stuff there
  $('#player_1_output').empty();
  $('#player_2_output').empty();     
     // Loop over the array from the server & append to the DOM
  for (let i = 0; i < object.taco1.length; i++) {
    console.log(object.taco1[i]);
    if (object.taco1[i] == 1) {
      alert ('Congratulations Player 1 you WIN!  The correct answer was ' + object.random);
    } else {
    $('#player_1_output').append(`
      <p class="card"> ${object.taco1[i]} </p>
    `);
    }
  }
  for (let i = 0; i < object.taco2.length; i++) {
    console.log(object.taco2[i]);
    if (object.taco2[i] == 1) {
      alert ('Congratulations Player 2 you WIN!  The correct answer was ' + object.random);
     } else {
    $('#player_2_output').append(`
    <p> ${object.taco2[i]} </p>
    `);
    }
  }
}
