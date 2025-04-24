import CreateProductUseCase from "./create.product.usecase";

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
    }
}

describe("unit test for create a product of type 'a'", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository();
        const productUseCase = new CreateProductUseCase(productRepository);

        const input = {
            name: "Product A",
            price: 100,
            type: "a",
        }

        expect(await productUseCase.execute(input)).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });

    it("should throw an error when name is missing", async () => {
        const productRepository = MockRepository();
        const productUseCase = new CreateProductUseCase(productRepository);

        const input = {
            name: "",
            price: 100,
            type: "a",
        }

        await expect(productUseCase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should throw an error when price be less than 0", async () => {
        const productRepository = MockRepository();
        const productUseCase = new CreateProductUseCase(productRepository);

        const input = {
            name: "Product A",
            price: -1,
            type: "a",
        }

        await expect(productUseCase.execute(input)).rejects.toThrow("Price must be greater than zero");
    });
});

describe("unit test for product of type 'b'", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository();
        const productUseCase = new CreateProductUseCase(productRepository);

        const input = {
            name: "Product B",
            price: 100,
            type: "b",
        }

        expect(await productUseCase.execute(input)).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price * 2,
        });
    });

    it("should throw an error when name is missing", async () => {
        const productRepository = MockRepository();
        const productUseCase = new CreateProductUseCase(productRepository);

        const input = {
            name: "",
            price: 100,
            type: "b",
        }

        await expect(productUseCase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should throw an error when price be less than 0", async () => {
        const productRepository = MockRepository();
        const productUseCase = new CreateProductUseCase(productRepository);

        const input = {
            name: "Product B",
            price: -1,
            type: "b",
        }

        await expect(productUseCase.execute(input)).rejects.toThrow("Price must be greater than zero");
    });
});
