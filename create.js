
const bookingForm = document.getElementById("bookingForm");
const API_URL = "http://localhost:3000/api/bookings";

bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  
  const booking = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    gender: document.getElementById("gender").value,
    age: parseInt(document.getElementById("age").value),
    phone: document.getElementById("phone").value.trim(),
    journeyPlace: document.getElementById("journeyPlace").value.trim(),
    journeyDate: document.getElementById("journeyDate").value
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking)
    });

    if (res.ok) {
      alert("Booking created successfully!");
      bookingForm.reset();
    } else {
      const errData = await res.json();
      alert("Failed to create booking: " + (errData.error || "Unknown error"));
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Could not connect to server.");
  }
});
