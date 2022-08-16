import { StringOption } from 'necord';

export class SettingsShowDto {
    @StringOption({
        name: 'key',
        description: 'The key of the setting you want to show',
        required: false,
    })
    key: string;
}
