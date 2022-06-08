import { SingleBar } from 'cli-progress';

import { humanizeSize } from './util/humanize-size';
import { SpeedCalculator } from './util/speed-calculator';
import { textFormat } from './util/text-format';


export class Loader {
    private received: number = 0;

    private readonly progressBar = new SingleBar({
        format: this.format,
        barCompleteChar: '▰',
        barIncompleteChar: '▱',
        hideCursor: true,
    });

    private readonly speedCalculator = new SpeedCalculator();

    public constructor(
        private readonly filename: string,
        private readonly size: number,
    ) { }

    private get format(): string {
        return textFormat(
            `<green>${this.filename}</> <cyan>{bar}</>  <cyan>{current}</> <grey>/</> <cyan>${humanizeSize(this.size)}</> [<yellow>{percentage}%</>] <green>{speed}</>`
        );
    }

    public start(): void {
        this.progressBar.start(this.size, 0, {
            speed: 'N/A',
            current: '0 B',
        });
    }

    public stop(): void {
        this.progressBar.stop();
    }

    public appendData(size: number): void {
        this.received += size;
        this.speedCalculator.add(size);
        
        const speed = this.speedCalculator.speed();

        this.progressBar.update(this.received, {
            current: humanizeSize(this.received),
            speed: speed === 0 ? 'N/A' : `${humanizeSize(speed)}/s`,
        });
    }
}
