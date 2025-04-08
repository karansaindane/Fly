document.getElementById("userForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // Prevent default form submission

  document.getElementById("submit-button").disabled = true;

  // Collect the form data
  var formData = new FormData(this);
  var keyValuePairs = [];
  for (var pair of formData.entries()) {
    keyValuePairs.push(pair[0] + "=" + pair[1]);
  }

  var formDataString = keyValuePairs.join("&");

  // Send a POST request to Google Apps Script
  fetch("https://script.google.com/macros/s/AKfycbwcy-GT5MKBctj-uHa-fXn3ViWp3FXcTZyg86ZiZCy1nFC6elz3qoTpLbnDaWMHVzS_bg/exec", {
    method: "POST",
    body: new URLSearchParams(new FormData(this)) // ✅ key-value encoded
  })
  
  .then(function (response) {
    if (response.ok) {
      return response.text(); // Or .json() if your script returns JSON
    } else {
      throw new Error("Form submission failed.");
    }
  })
  .then(function (data) {
    document.getElementById("message").textContent = "Data submitted successfully!";
    document.getElementById("message").style.display = "block";
    document.getElementById("message").style.backgroundColor = "green";
    document.getElementById("message").style.color = "beige";
    document.getElementById("submit-button").disabled = false;
    document.getElementById("userForm").reset();

    setTimeout(function () {
      window.location.reload(); // Refresh after 2.6s
    }, 2600);
  })
  .catch(function (error) {
    document.getElementById("message").textContent = "Error: " + error.message;
    document.getElementById("message").style.display = "block";
    document.getElementById("message").style.backgroundColor = "red";
    document.getElementById("message").style.color = "white";
    document.getElementById("submit-button").disabled = false;
  });
});
