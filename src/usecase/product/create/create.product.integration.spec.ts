import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { CreateProductUseCase } from "./create.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

const setup = () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });
}

describe("integration test for create a product of type 'a'", () => {
    setup();
    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const productUseCase = new CreateProductUseCase(productRepository);

        const input = {
            name: "Product A",
            price: 100,
            type: "a",
        };

        expect(await productUseCase.execute(input)).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        })
    });

    it("should thrown an error when name is missing", async () => {
        const productRepository = new ProductRepository();
        const productUseCase = new CreateProductUseCase(productRepository);

        const input = {
            name: "",
            price: 100,
            type: "a",
        };

        await expect(productUseCase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should thrown an error when price is missing", async () => {
        const productRepository = new ProductRepository();
        const productUseCase = new CreateProductUseCase(productRepository);

        const input = {
            name: "Product A",
            price: -1,
            type: "a",
        };

        await expect(productUseCase.execute(input)).rejects.toThrow("Price must be greater than zero");
    });
});

describe("integration test for create a product of type 'b'", () => {
    setup();
    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const productUseCase = new CreateProductUseCase(productRepository);

        const input = {
            name: "Product B",
            price: 100,
            type: "b",
        };

        expect(await productUseCase.execute(input)).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price * 2,
        })
    });
    it("should thrown an error when name is missing", async () => {
        const productRepository = new ProductRepository();
        const productUseCase = new CreateProductUseCase(productRepository);

        const input = {
            name: "",
            price: 100,
            type: "b",
        };

        await expect(productUseCase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should thrown an error when price is missing", async () => {
        const productRepository = new ProductRepository();
        const productUseCase = new CreateProductUseCase(productRepository);

        const input = {
            name: "Product B",
            price: -1,
            type: "b",
        };

        await expect(productUseCase.execute(input)).rejects.toThrow("Price must be greater than zero");
    });
});
