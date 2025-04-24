import Product from "../../../domain/product/entity/product"
import { ListProductUseCase } from "./list.product.usecase"

const productA = new Product("123", "Product A", 100)
const productB = new Product("456", "Product B", 200)

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([productA, productB])),
        update: jest.fn(),
    }
}

describe("unit test for list products", () => {
    it("should list products", async () => {
        const productRepository = MockRepository();
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
        }

        const result = await productUseCase.execute({});
        expect(result).toEqual(output);
    });
});
