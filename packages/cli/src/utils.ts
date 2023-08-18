export const fatalError = (...args: string[]) => {
    console.log(...args);
    process.exit(1)
}