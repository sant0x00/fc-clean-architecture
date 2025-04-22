import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import UpdateCustomerUseCase from "./update.customer.usecase";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";

describe("integration test for updating a customer", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        })

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customerUseCase = new UpdateCustomerUseCase(customerRepository);
        const customer = new Customer("123", "customer1");
        const address = new Address("Street", 123, "Zip", "City");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const input = {
            id: customer.id,
            name: "Customer Updated",
            address: {
                street: "Street Updated",
                number: 456,
                zip: "Zip Updated",
                city: "City Updated",
            },
        }

        const output = await customerUseCase.execute(input);
        expect(output.name).toBe(input.name);
        expect(output.address.street).toBe(input.address.street);
        expect(output.address.number).toBe(input.address.number);
        expect(output.address.zip).toBe(input.address.zip);
        expect(output.address.city).toBe(input.address.city);
    })
});
