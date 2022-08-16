import { createCommandGroupDecorator } from 'necord';

export const SettingsCommandsDecorator = createCommandGroupDecorator({
    name: 'settings',
    description: 'Settings commands',
});
