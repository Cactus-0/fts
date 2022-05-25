const prefixes = [ '', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y' ];

export function humanizeSize(bytes: number): string {
    let i = 0;
    
    while (bytes >= 1024) {
        bytes /= 1024;
        i++;
    }

    return `${bytes.toFixed(2)} ${prefixes[i]}B`;
}
