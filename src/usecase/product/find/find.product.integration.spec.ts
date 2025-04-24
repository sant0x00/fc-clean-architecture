import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe("integration test for find product", () => {
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

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        productRepository.create(product);
        const productUseCase = new FindProductUseCase(productRepository);

        const input = {
            id: "123"
        };

        expect(await productUseCase.execute(input)).toEqual({
            id: product.id,
            name: product.name,
            price: product.price
        });
    });
});
