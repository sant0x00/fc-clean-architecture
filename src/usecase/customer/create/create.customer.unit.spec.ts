import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    name: "John Doe",
    address: {
        street: "123 Main St",
        number: 456,
        city: "Anytown",
        zip: "78910",
    },
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("unit test create customer use case", () => {
    it("should create a customer", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
        const output = await customerCreateUseCase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city,
            },
        });
    });

    it("should thrown an error when name is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
        input.name = "";
        await expect(customerCreateUseCase.execute(input))
            .rejects
            .toThrowError("Name is required");
    });

    it("should thrown an error when street is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
        input.address.street = "";
        await expect(customerCreateUseCase.execute(input)).rejects.toThrowError("Street is required");
    });

    it("should thrown an error when number is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
        input.name = "John Doe";
        input.address = {
            street: "123 Main St",
            number: 0,
            city: "Anytown",
            zip: "78910",
        }
        await expect(customerCreateUseCase.execute(input)).rejects.toThrowError("Number is required");
    });

    it("should thrown an error when city is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
        input.name = "John Doe";
        input.address = {
            street: "123 Main St",
            number: 456,
            city: "",
            zip: "78910",
        }
        await expect(customerCreateUseCase.execute(input)).rejects.toThrowError("City is required");
    });

    it("should thrown an error when zip is missing", async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CreateCustomerUseCase(customerRepository);
        input.name = "John Doe";
        input.address = {
            street: "123 Main St",
            number: 456,
            city: "Anytown",
            zip: "",
        }
        await expect(customerCreateUseCase.execute(input)).rejects.toThrowError("Zip is required");
    });
});
