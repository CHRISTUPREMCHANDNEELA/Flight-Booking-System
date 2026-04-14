
const request = require('supertest');
const mongoose = require('mongoose');
const { app, Booking } = require('./server'); 
beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/abbeyFlightTestDB');
});

afterAll(async () => {
  await Booking.deleteMany({});
  await mongoose.connection.close();
});

describe('Abbey Flight Booking - CRUD Tests', () => {
  let testEmail = 'alice@example.com';
  let bookingId;

  // 1. Create - Valid Booking
  test('POST /api/bookings - should create a new booking', async () => {
    const bookingData = {
      name: 'Alice Johnson',
      email: testEmail,
      gender: 'Female',
      age: 28,
      phone: '9876543210',
      journeyPlace: 'Dublin, Ireland',
      journeyDate: '2025-10-15'
    };

    const res = await request(app)
      .post('/api/bookings')
      .send(bookingData);

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Alice Johnson');
    expect(res.body.email).toBe(testEmail);

    bookingId = res.body._id; 
  });

  // 2. Create - Duplicate Email
  test('POST /api/bookings - duplicate email should fail', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({
        name: 'Alice Johnson Duplicate',
        email: testEmail,
        gender: 'Female',
        age: 28,
        phone: '9876543211',
        journeyPlace: 'Dublin, Ireland',
        journeyDate: '2025-10-16'
      });

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe('Email already booked');
  });

  // 3. Create - Missing Fields
  test('POST /api/bookings - missing fields should return 400', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({ email: 'missing@example.com' });

    expect(res.statusCode).toBe(400);
  });

  // 4. Read - Get All Bookings
  test('GET /api/bookings - should return all bookings', async () => {
    const res = await request(app).get('/api/bookings');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // 5. Read - Get Booking by Email
  test('GET /api/bookings/email/:email - should return a booking', async () => {
    const res = await request(app).get(`/api/bookings/email/${testEmail}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(testEmail);
  });

  // 6. Read - Invalid Email
  test('GET /api/bookings/email/:email - non-existing email should return 404', async () => {
    const res = await request(app).get('/api/bookings/email/unknown@example.com');
    expect(res.statusCode).toBe(404);
  });

  // 7. Update - Valid Booking
  test('PUT /api/bookings/:id - should update booking', async () => {
    const res = await request(app)
      .put(`/api/bookings/${bookingId}`)
      .send({
        name: 'Alice Updated',
        email: 'aliceupdated@example.com',
        gender: 'Female',
        age: 29,
        phone: '9876543210',
        journeyPlace: 'Dublin, Ireland',
        journeyDate: '2025-10-20'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.booking.name).toBe('Alice Updated');
  });

  // 8. Update - Duplicate Email
  test('PUT /api/bookings/:id - updating to existing email should fail', async () => {
    
    const secondBooking = await request(app)
      .post('/api/bookings')
      .send({
        name: 'Bob Smith',
        email: 'bob@example.com',
        gender: 'Male',
        age: 35,
        phone: '1234567890',
        journeyPlace: 'London, UK',
        journeyDate: '2025-11-01'
      });

    const res = await request(app)
      .put(`/api/bookings/${bookingId}`)
      .send({
        name: 'Alice Updated Again',
        email: 'bob@example.com', // duplicate email
        gender: 'Female',
        age: 29,
        phone: '9876543210',
        journeyPlace: 'Dublin, Ireland',
        journeyDate: '2025-10-22'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('This email is already booked');
  });

  // 9. Delete - Valid Booking
  test('DELETE /api/bookings/email/:email - should delete booking', async () => {
    const res = await request(app).delete(`/api/bookings/email/aliceupdated@example.com`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Booking deleted successfully');
  });

  // 10. Delete - Already Deleted
  test('DELETE /api/bookings/email/:email - deleting again should return 404', async () => {
    const res = await request(app).delete(`/api/bookings/email/aliceupdated@example.com`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Booking not found');
  });
});
