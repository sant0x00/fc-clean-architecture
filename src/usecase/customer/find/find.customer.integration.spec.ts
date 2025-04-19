import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe("integration test find customer use case", () => {
    let sequalize: Sequelize;

    beforeEach(async () => {
        sequalize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true },
        });

        sequalize.addModels([CustomerModel]);
        await sequalize.sync();
    });

    afterEach(async () => {
        await sequalize.close();
    });
    
    it("should find a costumer", async () => {
        const costumerRepository = new CustomerRepository();
        const usecase = new FindCustomerUseCase(costumerRepository);

        const customer = new Customer("123", "customer1");
        const addres = new Address("Street", 123, "Zip", "City");
        customer.changeAddress(addres);
        await costumerRepository.create(customer);

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

        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });
});