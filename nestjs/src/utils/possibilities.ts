export class Possibilities {

    static sortedPossibilities(value: number): number {
        const possibilities = new Array<number>(0.75, 0.5, 0.25);
        const possibility = Math.floor(Math.random() * 3);
        return value * possibilities[possibility];
    }
}