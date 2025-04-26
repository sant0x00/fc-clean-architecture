import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "Product A", 100);

const input = {
    id: product.id,
    name: "Product A Updated",
    price: 200,
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        update: jest.fn(),
    }
}

describe("unit test for update a product", () => {
    it("should update a product type 'a'", async () => {
        const productRepository = MockRepository();
        const productUseCase = new UpdateProductUseCase(productRepository);
        expect(await productUseCase.execute(input)).toEqual({
            id: product.id,
            name: input.name,
            price: input.price,
        })
    });

    it("should update a product type 'b'", () => {
        const productB = ProductFactory.create("b", "Product B", 100);
        const inputB = {
            id: productB.id,
            name: "Product B Updated",
            price: 200,
        }

        const productRepository = MockRepository();
        productRepository.find = jest.fn().mockReturnValue(Promise.resolve(productB));
        const productUseCase = new UpdateProductUseCase(productRepository);
        expect(productUseCase.execute(inputB)).resolves.toEqual({
            id: productB.id,
            name: inputB.name,
            price: inputB.price * 2,
        });
    });
});
