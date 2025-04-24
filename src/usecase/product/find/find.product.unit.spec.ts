import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "Product 1", 100);

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        update: jest.fn(),
    }
}

describe("unit test for find product use case", () => {
    it("should find a product", async () => {
        const productRepository = MockRepository();
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
