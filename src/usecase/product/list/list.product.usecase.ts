import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { ListInputProductDTO, ListOutputProductDTO } from "./list.product.dto";

export class ListProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: ListInputProductDTO): Promise<ListOutputProductDTO> {
        const products = await this.productRepository.findAll();
        return OutputMapper.toOutput(products);
    }
}

export class OutputMapper {
    static toOutput(products: Product[]): ListOutputProductDTO {
        return {
            products: products.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
            })),
        };
    }
}
