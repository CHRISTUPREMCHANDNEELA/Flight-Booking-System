const bookingsForm = document.getElementById("bookingForm");
const API_URL = "https://localhost:300/api/bookings";
bookingForm.addEventListner("Submit",async(e) =>) {
    e.preventDefault();
    const booking = {
        name: document.getElementById("name").ariaValueMax.trim(),
    }
    }

}