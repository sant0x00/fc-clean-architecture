import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";


const customer = new Customer("123", "customer1");
const address = new Address("Street", 123, "Zip", "City");
customer.changeAddress(address);

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        update: jest.fn(),
    }
}

describe("unit test find customer use case", () => {
    it("should find a costumer", async () => {
        const costumerRepository = MockRepository()
        const useCase = new FindCustomerUseCase(costumerRepository);

        const input = {
            id: "123",
        }

        const output = {
            id: "123",
            name: "customer1",
            address: {
                street: "Street",
                city: "City",
                number: 123,
                zip: "Zip"
            }
        }

        const result = await useCase.execute(input);
        expect(result).toEqual(output);
    });
});