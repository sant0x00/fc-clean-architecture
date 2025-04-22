import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customerOne = CustomerFactory.createWithAddress(
    "John Doe",
    new Address("Street", 123, "Zip", "City")
);

const customerTwo = CustomerFactory.createWithAddress(
    "Jane Doe",
    new Address("Street 2", 456, "Zip 2", "City 2")
);

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customerOne, customerTwo])),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test for listing customer use case", () => {
    it("should return list a customer", async () => {
        const customerRepository = MockRepository();
        const usecase = new ListCustomerUseCase(customerRepository);
        const output = await usecase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customerOne.id);
        expect(output.customers[0].name).toBe(customerOne.name);
        expect(output.customers[0].address.street).toBe(customerOne.Address.street);
        expect(output.customers[1].id).toBe(customerTwo.id);
        expect(output.customers[1].name).toBe(customerTwo.name);
        expect(output.customers[1].address.street).toBe(customerTwo.Address.street);
    });
});
