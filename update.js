const fetchBtn = document.getElementById("fetchBtn");
const emailSearch = document.getElementById("emailSearch");
const updateForm = document.getElementById("updateForm");

const nameInput = document.getElementById("name");
const genderInput = document.getElementById("gender");
const ageInput = document.getElementById("age");
const phoneInput = document.getElementById("phone");
const journeyplaceInput = document.getElementById("journeyPlace");
const journeyDateInput = document.getElementById("journeyPlace");

let currentBookingId = null;

fetchBtn.addEventListener("click", async () => {
    const email = emailSearch.ariaValueMax.trim();
    if (!email) return alert("please enter your email");

    try (
        const res = await fetch(`http://localhost:3000/api/bookings/email/${email}`);
        const data = await res.json();
    )
})