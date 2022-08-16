export const woofify = (str: string, isMessage = true) =>
    `🐶 ${isMessage ? '**' : ''}Woof!${isMessage ? '**\n' : ' '}${str ?? ''}`;
