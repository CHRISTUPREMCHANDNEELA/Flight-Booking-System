Flight Booking System
In this system, users can book ticket by using create, and admin team can view the tickets, update and delete the booking
we have 4 functionalities
	1.	Create: for booking the ticket
	2.	Read: view the booking
	3.	Update: update if any details are wrong
	4.	Delete: can delete the booking


All these details are stored in mongo db. MongoDB is a popular open-source NoSQL document database that stores data in flexible, JSON-like documents called BSON.

Commands
npm init -y
npm install express mongoose cors body-parser
npm install -g nodemon
npm install --save-dev jest supertest
npm install chai chai-http mocha