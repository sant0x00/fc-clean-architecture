export interface ListInputProductDTO {}

export interface Product {
    id: string;
    name: string;
    price: number;
}

export interface ListOutputProductDTO {
    products: Product[];
}
