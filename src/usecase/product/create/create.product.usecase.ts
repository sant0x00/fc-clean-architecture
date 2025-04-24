import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { CreateInputProductDTO, CreateOutputProductDTO } from "./create.product.dto";

export default class CreateProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: CreateInputProductDTO): Promise<CreateOutputProductDTO> {
        const productFactory = ProductFactory.create(input.type, input.name, input.price);
        const product = new Product(productFactory.id, productFactory.name, productFactory.price);
        await this.productRepository.create(product);
        return {
            id: product.id,
            name: product.name,
            price: product.price,
        }
    }
}
