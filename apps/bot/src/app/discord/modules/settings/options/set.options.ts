import { StringOption } from 'necord';

export class SettingsSetDto {
    @StringOption({
        name: 'setting',
        description: 'The setting within the category',
        required: true,
    })
    setting: string;

    @StringOption({
        name: 'value',
        description: 'The value of the setting',
        required: true,
    })
    value: string;
}