import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("integration test for update a product", () => {
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

    it("should update the product", async () => {
        const productRepository = new ProductRepository();
        productRepository.create(new Product("123", "Product 1", 100));
        const productUseCase = new UpdateProductUseCase(productRepository);
        const input = {
            id: "123",
            name: "Product 1 Updated",
            price: 200,
        };
        expect(await productUseCase.execute(input)).toEqual({
            id: input.id,
            name: input.name,
            price: input.price,
        });
    });
});
