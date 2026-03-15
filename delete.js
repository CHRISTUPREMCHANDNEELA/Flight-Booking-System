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

    if (!res.ok) return alert(data,message || "Booking not found");

    currentEmail = email;
    nameSpan.textContent = data.name;
    genderSpan.textcontent = data.gender;
    ageSpan.textContent = data.age;
    PhoneSpan.textContent = data.phone;
    journeyPlaceSpan.textContent = data.journeyPlace;
    journeyDateSpan.textContent = new Date(data.journeyDate).toLocaleDateString();

    bookingDetails.style.display = "block";
} catch (err) {
    console.error(err);
    alert("Error fetching booking");
}
});

deleteBtn.addEventListener("click", async () => {
    if (!currntEmail) return alert("No booking selected");

    if (!confirm("Are you sure you want to delete this booking?")) return;

    try{
        const res = await fetch('http://localhost:3000/api/bookings/email/${currentEmail}', {method: "Delete" });
        const data = await res.json();

        if (res.ok) {
            alert("Booking deleted successfully!");
            bookingDetails.style.display = "none";
            emailSearch.value = "";
            currentEmail = null;
        } else {
            alert(data.message || "Error deleting booking");
        }
    } catch (err) {
        console.error(err);
        alert("server error deleting booking");
    }
});