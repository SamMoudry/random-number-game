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
     $('#output').empty();     
     // Loop over the array from the server & append to the DOM
     for (let i = 0; i < object.taco1.length; i++) {
         console.log(object.taco1[i]);
         $('#output').append(`
                 <div class="card">
                     <p>${object.taco1[i]}</p>
                 </div>
         `);
     }
     for (let i = 0; i < object.taco2.length; i++) {
      console.log(object.taco2[i]);
      $('#output').append(`
              <div class="card">
                  <p>${object.taco2[i]}</p>
              </div>
      `);
  }
}
