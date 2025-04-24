import { app, sequelize } from '../express';
import request from 'supertest';

describe("e2e test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true })
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a costumer", async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "John",
                address: {
                    street: "Street",
                    city: "City",
                    number: 123,
                    zip: "12345"
                }
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John");
        expect(response.body.address.street).toBe("Street");
        expect(response.body.address.city).toBe("City");
        expect(response.body.address.number).toBe(123);
        expect(response.body.address.zip).toBe("12345");
    });

    it("should not create a customer", async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "John",
            });

        expect(response.status).toBe(500);
    });

    it("should list all customers", async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "John",
                address: {
                    street: "Street",
                    city: "City",
                    number: 123,
                    zip: "12345"
                }
            });
        expect(response.status).toBe(200);

        const responseTwo = await request(app)
            .post("/customers")
            .send({
                name: "Jane",
                address: {
                    street: "Street Two",
                    city: "City Two",
                    number: 456,
                    zip: "67890"
                }
            });
        expect(responseTwo.status).toBe(200);


        const listResponse = await request(app)
            .get("/customers")
            .send()
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
        const customer = listResponse.body.customers[0];
        expect(customer.name).toBe("John");
        expect(customer.address.street).toBe("Street");
        const customerTwo = listResponse.body.customers[1];
        expect(customerTwo.name).toBe("Jane");
        expect(customerTwo.address.street).toBe("Street Two");
    });
});
