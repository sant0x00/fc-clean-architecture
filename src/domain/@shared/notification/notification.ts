export type NotificationErrorProps = {
    message: string;
    context: string;
}

export default class Notification {
    private errors: NotificationErrorProps[] = [];

    addError(error: NotificationErrorProps) {
        this.errors.push(error);
    }

    messages(context?: string): string {
        let message = "";
        this.errors.forEach((error) => {
            if (context === undefined || context === error.context) {
                message += `${error.context}: ${error.message},`
            }
        });
        return message
    }

    getErrors(): NotificationErrorProps[] {
        return this.errors;
    }

    hasErrors(): boolean {
        return this.errors.length > 0;
    }
}
