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

    try {
        const res = await fetch(`http://localhost:3000/api/bookings/email/${email}`);
        const data = await res.json();

        if (!res.ok) return alert(data.message || "Booking not found");

        currentBookingId = data._id;
        nameInput.value = data.name;
        genderInput.value = data.gender;
        ageInput.value = data.age;
        phoneInput.value = data.phone;
        journeyplaceInput.value = data.journeyplace;
        journeyDateInput.value = data.journeyDate.split("T")[0];

        updateForm.style.display = "block";
    } catch (err) {
        console.error(err);
        alert("error fetching booking");
    }
});

updateForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!currentBookingId) return alert("No booking selected");

    const updateData = {
        name: nameInput.value,
        email: emailSearch.Value,
        gender: genderInput.value,
        age: parseInt(ageInput.value),
        phone: phoneInput.value,
        journeyPlace: journeyplaceInput.value,
        journeyDate: journeyDateInput.value
    };
})