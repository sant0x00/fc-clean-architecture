import Notification from "./notification";

describe("unit test for notification", () => {
    it("should create an errors", () => {
        const notification = new Notification();
        const error = {
            message: "error message",
            context: "customer",
        };

        notification.addError(error);
        expect(notification.messages("customer")).toBe("customer: error message,")

        const errorTwo = {
            message: "error message 2",
            context: "customer",
        };

        notification.addError(errorTwo);

        expect(notification.messages("customer")).toBe("customer: error message,customer: error message 2,")

        const errorThree = {
            message: "error message 3",
            context: "order",
        }

        notification.addError(errorThree);

        expect(notification.messages("customer")).toBe("customer: error message,customer: error message 2,")
        expect(notification.messages()).toBe("customer: error message,customer: error message 2,order: error message 3,")
    });

    it("should check if notification has at least one error", () => {
        const notification = new Notification();
        const error = {
            message: "error message",
            context: "context",
        }

        notification.addError(error);
        expect(notification.hasErrors()).toBe(true);
    });

    it("should get all errors props", () => {
        const notification = new Notification();
        const error = {
            message: "error message",
            context: "context",
        };
        notification.addError(error);
        expect(notification.getErrors()).toEqual([
            {
                context: "context",
                message: "error message",
            },
        ]);
    });
})
