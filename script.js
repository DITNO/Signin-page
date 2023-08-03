document.addEventListener("DOMContentLoaded", function () {
  const educationForm = document.getElementById("educationForm");

  educationForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get all form inputs and select elements
    const email = document.getElementById("email");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const education = document.getElementById("education");
    const city = document.getElementById("city");
    const country = document.getElementById("country");
    const phone = document.getElementById("phone");

    // Check if all mandatory fields are filled
    if (
      email.value.trim() === "" ||
      username.value.trim() === "" ||
      password.value.trim() === "" ||
      education.value === "" ||
      city.value === "" ||
      country.value === "" ||
      phone.value.trim() === ""
    ) {
      alert("Please fill in all mandatory fields.");
    } else {
      // If all fields are filled, proceed with form submission

      const educationData = {
        email: email.value,
        username: username.value,
        password: password.value,
        education: education.value,
        city: city.value,
        country: country.value,
        phone: phone.value,
      };

      try {
        const response = await fetch('/education', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(educationData),
        });

        const data = await response.json();
        if (response.ok) {
          // Education form submission successful, you can show a success message.
          console.log('Education form submission successful!');
        } else {
          // Handle submission failure, show an error message, etc.
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error during education form submission:', error);
      }
    }
  });
});

//google signin
function onSignIn(googleUser) {
    // Get the user profile information from the Google Sign-In API
    const profile = googleUser.getBasicProfile();
  
    // Extract relevant data
    const email = profile.getEmail();
    const username = profile.getName();
    const imageUrl = profile.getImageUrl(); // URL of the user's profile picture
  
    // You can now save this data to your server using a POST request
    // Example using Fetch API
    const userData = {
      email,
      username,
      imageUrl,
    };
  
    fetch('/save_user_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Data saved successfully, handle the response if needed
        console.log('User data saved successfully:', data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error saving user data:', error);
      });
  }
  