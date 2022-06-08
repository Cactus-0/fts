export class SpeedCalculator {
    private value: number = 0;

    public add(n: number): void {
        this.value += n;
        setTimeout(() => this.value -= n, 1000);
    }

    public speed(): number {
        return this.value;
    }
}
