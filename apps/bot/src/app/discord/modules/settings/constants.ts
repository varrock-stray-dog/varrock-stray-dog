export const bannedSettingsKeys = ['id', 'guildId', 'createdAt', 'updatedAt'];

export const keyPathToName = (path: string, includeEmoji = true) =>
    `${includeEmoji ? '⚙️ ' : ''}${path
        .split('.')
        .map((key) => key.charAt(0).toUpperCase() + key.slice(1))
        .join(' / ')}`;
