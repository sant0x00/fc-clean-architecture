import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import CreateCustomerUseCase from "./create.customer.usecase";

describe("integration test create customer use case", () => {
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
    })

    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customerUseCase = new CreateCustomerUseCase(customerRepository);
        const input = {
            name: "Customer 1",
            address: {
                street: "Street",
                number: 123,
                zip: "Zip",
                city: "City",
            }
        }

        expect(await customerUseCase.execute(input)).toEqual({
            id: expect.any(String),
            name: "Customer 1",
            address: {
                street: "Street",
                city: "City",
                number: 123,
                zip: "Zip",
            },
        })
    })
});
