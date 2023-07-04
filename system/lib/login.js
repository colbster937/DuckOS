// api endpoint shit lolz
const url = 'https://duckosauth.000webhostapp.com/login.php';

// put the text box id values in the ""
const username = document.getElementById("").value;
const password = document.getElementById("").value;

// dont mess with this
const queryString = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
fetch(`${url}?${queryString}`)
  .then(response => response.text())
  .then(result => {
    // Process the result
    console.log(result);
  })
  .catch(error => {
    // Handle any errors
    console.error('Error:', error);
  });