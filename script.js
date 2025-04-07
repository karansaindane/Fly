
document.getElementById("form").addEventListener("submit",  async function (e) {
    e.preventDefault(); // Prevent the default form submission
    
    document.getElementById("submit-button").disabled = false;
  
    // Collect the form data
    var formData = new FormData(this);
    var keyValuePairs = [];
    for (var pair of formData.entries()) {
      keyValuePairs.push(pair[0] + "=" + pair[1]);
    }
  
    var formDataString = keyValuePairs.join("&");
  
    // Send a POST request to your Google Apps Script
    fetch(
      "https://script.google.com/macros/s/AKfycbxXDJAg3OaMGcljN4Nw1SaP_9WTUUOHqW-axy0itrBYvGFwg7r-I4xg33tLdOp9egSeDg/exec",
      {
        redirect: "follow",
        method: "POST",
        body: formDataString,
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      }
    )
      .then(function (response) {
        // Check if the request was successful
        if (response) {
          return response; // Assuming your script returns JSON response
        } else {
          throw new Error("Failed to submit the form.");
        }
      })
      .then(function (data) {
        // Display a success message
        document.getElementById("message").textContent =
          "Data submitted successfully!";
        document.getElementById("message").style.display = "block";
        document.getElementById("message").style.backgroundColor = "green";
        document.getElementById("message").style.color = "beige";
        document.getElementById("submit-button").disabled = false;
        document.getElementById("form").reset();
  
        setTimeout(function () {
          window.location.reload();  // 🔄 Full page refresh
        }, 2600);
      })
      
  });