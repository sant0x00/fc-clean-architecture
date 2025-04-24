import request from "supertest";
import { app, sequelize } from "../express";

describe("e2e test for products", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Product 1",
                price: 100,
                type: "a",
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product 1");
        expect(response.body.id).toEqual(expect.any(String))
        expect(response.body.price).toBe(100);
    });

    it("should create a product of type 'b'", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Product 2",
                price: 200,
                type: "b",
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product 2");
        expect(response.body.id).toEqual(expect.any(String))
        expect(response.body.price).toBe(400);
    });

    it("should not create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Product 1",
                price: -1,
                type: "a",
            });

        expect(response.status).toBe(500);
    });

    it("should list all products", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Product 1",
                price: 100,
                type: "a",
            });
        expect(response.status).toBe(200);

        const responseTwo = await request(app)
            .post("/products")
            .send({
                name: "Product 2",
                price: 100,
                type: "b",
            });

        expect(responseTwo.status).toBe(200);
        const listProductsResponse = await request(app).get("/products").send();
        expect(listProductsResponse.status).toBe(200);
        expect(listProductsResponse.body.products.length).toBe(2);
        const product = listProductsResponse.body.products[0];
        expect(product.name).toBe("Product 1");
        expect(product.price).toBe(100);
        const productTwo = listProductsResponse.body.products[1];
        expect(productTwo.name).toBe("Product 2");
        expect(productTwo.price).toBe(200);
    });
});
