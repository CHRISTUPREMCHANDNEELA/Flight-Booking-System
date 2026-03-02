const API_URL = "http://localhost:3000/api/bookings";
const tableBody = document.querySelector("#bookingsTable tbody");
const searchBtn = document.getElementById("searchBtn");

async function fetchBookings(search = "", sortBy = "") {
    try {
        const res = await fetch(`${API_URL}?search=${search}&sortBy=${sortBy}`);
        const data = await res.json();
        
        tableBody.innerHTML = "";
        data.forEach(booking => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${booking.name}</td>
            <td>${booking.email}</td>
            <td>${booking.gender}</td>
            <td>${booking.age}</td>
            <td>${booking.phone}</td>
            <td>$booking.journeyPlace}</td>
            <td>${new Date(booking.journeyDate).toLocaleDateString()}</td>
            `;
            tableBody.appendChild(tr);
        });
    }catch (err) {
        console.error(err);
        alert("Error fetching bookings");
    }
}

fetch fetchBookings();

searchBtn.addEventListener("click", () => {
    const searchINPUT = document.getElementById("searchInput").value.trim();
    const sortSelect = document.getElementById("sortSelect").value;
    fetchBookings(searchINPUT, sortSelect);
});