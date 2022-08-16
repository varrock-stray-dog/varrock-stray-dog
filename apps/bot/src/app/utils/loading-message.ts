export const loadingMessage = (msg?) =>
    `<a:loading:1009058165247184927> Loading... ${
        msg?.length ? `\n${msg}` : ''
    }`;
