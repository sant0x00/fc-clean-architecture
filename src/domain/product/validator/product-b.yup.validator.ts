import ValidatorInterface from "../../@shared/validator/validator.interface";
import ProductB from "../entity/product-b";
import * as yup from "yup";

export default class ProductBYupValidator implements ValidatorInterface<ProductB> {
    validate(entity: ProductB): void {
        try {
            yup
                .object()
                .shape({
                    id: yup.string().required("ID is required"),
                    name: yup.string().required("Name is required"),
                    price: yup.number().moreThan(0, "Price must be greater than zero"),
                })
                .validateSync({
                    id: entity.id,
                    name: entity.name,
                    price: entity.price,
                }, {
                    abortEarly: false,
                })
        } catch (errors) {
            const e = errors as yup.ValidationError;
            e.errors.forEach((error) => {
                entity.notification.addError({
                    context: "Product B",
                    message: error,
                })
            })
        }
    }

}
