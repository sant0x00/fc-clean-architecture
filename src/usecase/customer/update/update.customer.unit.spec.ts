import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import Address from "../../../domain/customer/value-object/address"
import UpdateCustomerUseCase from "./update.customer.usecase"

const customer = CustomerFactory.createWithAddress(
    "John Doe", new Address("Street", 1, "City", "Zip")
)

const input = {
    id: customer.id,
    name: "John Doe Updated",
    address: {
        street: "Street Updated",
        number: 2,
        city: "City Updated",
        zip: "Zip Updated",
    }
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        update: jest.fn(),
    }
}

describe("unit test for customer update use case", () => {
    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);
        const output = await customerUpdateUseCase.execute(input);
        expect(output).toEqual(input);
    });

    it("should thrown an error when customer not found", async () => {
        const customerRepository = MockRepository();
        customerRepository.find = jest.fn().mockRejectedValue(new Error("Customer not found"));
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);
        await expect(customerUpdateUseCase.execute(input)).rejects.toThrow("Customer not found");
    });

    it("should thrown an error when name is empty", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);
        input.name = "";
        await expect(customerUpdateUseCase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should thrown an error when street is empty", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);
        input.name = "John Doe Updated";
        input.address.street = "";
        await expect(customerUpdateUseCase.execute(input)).rejects.toThrow("Street is required");
    });

    it("should thrown an error when number is empty", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);
        input.name = "John Doe Updated";
        input.address = {
            street: "Street Updated",
            number: 0,
            city: "City Updated",
            zip: "Zip Updated",
        }
        await expect(customerUpdateUseCase.execute(input)).rejects.toThrow("Number is required");
    })

    it("should thrown an error when zip is empty", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);
        input.name = "John Doe Updated";
        input.address = {
            street: "Street Updated",
            number: 2,
            city: "City Updated",
            zip: "",
        }
        await expect(customerUpdateUseCase.execute(input)).rejects.toThrow("Zip is required");
    })

    it("should thrown an error when city is empty", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);
        input.name = "John Doe Updated";
        input.address = {
            street: "Street Updated",
            number: 2,
            city: "",
            zip: "Zip Updated",
        }
        await expect(customerUpdateUseCase.execute(input)).rejects.toThrow("City is required");
    })
})
