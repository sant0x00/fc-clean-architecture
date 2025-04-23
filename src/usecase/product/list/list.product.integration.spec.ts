import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import { ListProductUseCase } from "./list.product.usecase";

describe("integration test for list products", () => {
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

    it("should list products", async () => {
        const productRepository = new ProductRepository();
        const productA = new Product("123", "Product A", 100);
        await productRepository.create(productA);
        const productB = new Product("456", "Product B", 200);
        await productRepository.create(productB);

        const productUseCase = new ListProductUseCase(productRepository);
        const output = {
            products: [
                {
                    id: productA.id,
                    name: productA.name,
                    price: productA.price,
                },
                {
                    id: productB.id,
                    name: productB.name,
                    price: productB.price,
                },
            ],
        };

        const result = await productUseCase.execute({});
        expect(result).toEqual(output);
    });
});
