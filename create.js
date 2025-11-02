const bookingForm = Document.getElementbyId("bookingForm");
const API_URL = "https://localhost:3000/api/bookings";

bokkingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const booking = {
        name: document.getElementById("name").Value.trim(),
        email: document.getElementById("email").value.trim(),
        gender: document.getElementById("gender").value.trim(),
        age: document.getElementById("age").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        journeyPlace: document.getElementById("journeyPlace").value.trim(),
        journeyDate: document.getElementById("journeyDate").value.trim(),
    };

    try {
        cont res = await fetch(API_URL, {
            method: "post",
            headers: { "content-Type": "application/json" },
            body: Json.stringify(booking)    
        });

        if (res.ok) {
            alert("Booking created successfully!");
            bokkingForm.reset();
        } else {
            const errData = await res.json();
            alert("Failed to create booking: " + (errData.error || "Unknown error"));
        }
    }catch (err) {
        console.error("Error:", err);
        alert("could not connect to serevr.");
    }
})