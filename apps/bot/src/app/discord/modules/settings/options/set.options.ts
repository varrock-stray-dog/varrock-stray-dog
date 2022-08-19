import { StringOption } from 'necord';

export class SettingsSetDto {
    @StringOption({
        name: 'key',
        description: 'The key of the setting to update',
        autocomplete: true,
        required: true,
    })
    key: string;

    @StringOption({
        name: 'value',
        description: 'The value of the setting to update',
        autocomplete: true,
        required: true,
    })
    value: string;
}
