export interface Greeter {
    greet(name: string): string;
}

export const GREETER = Symbol("GREETER");

export class FriendlyGreeter implements Greeter {
    greet(name: string): string {
        return `Hey there, ${name}! 👋`;
    }
}

export class FormalGreeter implements Greeter {
    greet(name: string): string {
        return `Good day, ${name}.`;
    }
}
