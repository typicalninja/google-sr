import c from 'ansi-colors';

export const log = {
    info: (...args: string[]) => console.log(`${c.blue.bold("[INFO]")} @ ${new Date().toLocaleTimeString()} ${c.yellow('>')}`, ...args.map((s) => c.blueBright(s))),
    success: (...args: string[]) => console.log(`${c.green.bold("[SUCCESS]")} @ ${new Date().toLocaleTimeString()} ${c.yellow('>')}`, ...args.map((s) => c.greenBright(s))),
    warn: (...args: string[]) => console.log(`${c.yellowBright.bold("[WARN]")} @ ${new Date().toLocaleTimeString()} ${c.yellow('>')}`, ...args.map((s) => c.yellowBright(s))),
    error: (...args: string[]) => console.log(`${c.red.bold("[ERROR]")} @ ${new Date().toLocaleTimeString()} ${c.yellow('>')}`, ...args.map((s) => c.redBright(s)))
}

export const getTimePerEachPage = (noOfPages: number) => noOfPages > 10 ? 5000 : 2000

export const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout))