const prefixes = [ '', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y' ];

export function humanizeSize(bytes: number): string {
    let i = 0;
    
    for (; bytes >= 1024; i++) bytes /= 1024;

    return `${bytes.toFixed(2)} ${prefixes[i]}B`;
}
