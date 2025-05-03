import Product from "./product";
import ProductB from "./product-b";

describe("Product unit tests", () => {
    it("should create a product", () => {
        const product = new Product("123", "Product 1", 100);

        console.log(product);

        expect(product.id).toBe("123");
        expect(product.name).toBe("Product 1");
        expect(product.price).toBe(100);
    });

    it("should throw error when id is empty", () => {
        expect(() => {
            new Product("", "Product 1", 100);
        }).toThrowError("Product: ID is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            new Product("123", "", 100);
        }).toThrowError("Product: Name is required");
    });

    it("should throw error when price is less than zero", () => {
        expect(() => {
            new Product("123", "Name", -1);
        }).toThrowError("Product: Price must be greater than zero");
    });

    it("should throw error when id and name are empty and price is less than zero", () => {
        expect(() => {
            new Product("", "", -1);
        }).toThrowError("Product: ID is required,Product: Name is required,Product: Price must be greater than zero");
    });

    it("should change name", () => {
        const product = new Product("123", "Product 1", 100);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });

    it("should change price", () => {
        const product = new Product("123", "Product 1", 100);
        product.changePrice(150);
        expect(product.price).toBe(150);
    });
});

describe("Product B unit tests", () => {
    it("should add a product B", () => {
        const productB = new ProductB("123", "Product 1", 100);
        expect(productB.id).toBe("123");
        expect(productB.name).toBe("Product 1");
        expect(productB.price).toBe(200);
    });

    it("should throw error when id is empty", () => {
        expect(() => {
            new ProductB("", "Product 1", 100);
        }).toThrowError("ID is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            new ProductB("123", "", 100);
        }).toThrowError("Product B: Name is required");
    });

    it("should throw error when price is less than zero", () => {
        expect(() => {
            new ProductB("123", "Product 1", -1);
        }).toThrowError("Product B: Price must be greater than zero");
    });

    it("should throw error when id and name are empty and price is less than zero", () => {
        expect(() => {
            new ProductB("", "", -1);
        }).toThrowError("Product B: ID is required,Product B: Name is required,Product B: Price must be greater than zero");
    });

    it("should change name", () => {
        const productB = new ProductB("123", "Product 1", 100);
        productB.changeName("Product 2");
        expect(productB.name).toBe("Product 2");
    });

    it("should change price", () => {
        const productB = new ProductB("123", "Product 1", 100);
        productB.changePrice(150);
        expect(productB.price).toBe(300);
    });
});
