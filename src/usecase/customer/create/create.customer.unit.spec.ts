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
});
