const fetchBtn = document.getElementById("fetchBtn");
const emailSearch = document.getElementById("emailSearch");
const updateForm = document.getElementById("updateForm");

const nameInput = document.getElementById("name");
const genderInput = document.getElementById("gender");
const ageInput = document.getElementById("age");
const phoneInput = document.getElementById("phone");
const journeyPlaceInput = document.getElementById("journeyPlace");
const journeyDateInput = document.getElementById("journeyDate");

let currentBookingId = null;

fetchBtn.addEventListener("click", async () => {
  const email = emailSearch.value.trim();
  if (!email) return alert("Please enter your email");

  try {
    const res = await fetch(`http://localhost:3000/api/bookings/email/${email}`);
    const data = await res.json();

    if (!res.ok) return alert(data.message || "Booking not found");

    currentBookingId = data._id;
    nameInput.value = data.name;
    genderInput.value = data.gender;
    ageInput.value = data.age;
    phoneInput.value = data.phone;
    journeyPlaceInput.value = data.journeyPlace;
    journeyDateInput.value = data.journeyDate.split("T")[0];

    updateForm.style.display = "block";
  } catch (err) {
    console.error(err);
    alert("Error fetching booking");
  }
});

updateForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!currentBookingId) return alert("No booking selected");

  const updatedData = {
    name: nameInput.value,
    email: emailSearch.value,
    gender: genderInput.value,
    age: parseInt(ageInput.value),
    phone: phoneInput.value,
    journeyPlace: journeyPlaceInput.value,
    journeyDate: journeyDateInput.value
  };

  try {
    const res = await fetch(`http://localhost:3000/api/bookings/${currentBookingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    });

    const data = await res.json();
    if (res.ok) {
      alert("Booking updated successfully!");
      updateForm.style.display = "none";
      emailSearch.value = "";
    } else {
      alert(data.message || "Error updating booking");
    }
  } catch (err) {
    console.error(err);
    alert("Server error updating booking");
  }
});
