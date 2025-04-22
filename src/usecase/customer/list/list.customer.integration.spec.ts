import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import ListCustomerUseCase from "./list.customer.usecase";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";

describe("integration test for listing customers", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    });

    it("should be listing customers", async () => {
        const costumerRepository = new CustomerRepository();
        const customerUseCase = new ListCustomerUseCase(costumerRepository);

        const costumerOne = new Customer("123", "customer1");
        const addressOne = new Address("Street", 123, "Zip", "City");
        costumerOne.changeAddress(addressOne);
        await costumerRepository.create(costumerOne);

        const costumerTwo = new Customer("456", "customer2");
        const addressTwo = new Address("Street 2", 456, "Zip 2", "City 2");
        costumerTwo.changeAddress(addressTwo);
        await costumerRepository.create(costumerTwo);

        const output = await customerUseCase.execute({})

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(costumerOne.id);
        expect(output.customers[0].name).toBe(costumerOne.name);
        expect(output.customers[0].address.street).toBe(costumerOne.Address.street);

        expect(output.customers[1].id).toBe(costumerTwo.id);
        expect(output.customers[1].name).toBe(costumerTwo.name);
        expect(output.customers[1].address.street).toBe(costumerTwo.Address.street);
    })
});
