const fetchBtn = document.getElementById("fetchBtn");
const deleteBtn = document.getElementById("deleteBtn");
const emailSearch = document.getElementById("emailSearch");
const bookingDetails = document.getElementById("bookingDetails");

const nameSpan = document.getElementById("name");
const genderSpan = document.getElementById("gender");
const ageSpan = document.getElementById("age");
const PhoneSpan = document.getElementById("phone");
const journeyPlaceSpan = document.getElementById("journeyPlace");
const journeyDateSpan = document.getElementById("journeyDate");

let currentEmail=null;

fetchBtn.addEventListener("click", async () => {
    const email= emailSearch.Value.trim();
if (!email) return alert("Please enter your email");

try {
    const res = await fetch('hhtp://localhost:3000/api/bookings/email/${email}');
    const data = await res.json();

}