$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
}

function addGuesses() {
  let guesses = {
      personOne: $('#personOne').val(),
      personTwo: $('#personTwo').val(),
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
  $('#personOne').val('');
  $('#personTwo').val('');
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

function render( func ){   
  
}
