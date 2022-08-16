import { StringOption } from 'necord';

export class SettingsSetLanguageDto {
    @StringOption({
        name: 'language',
        description: 'The language to set',
        required: true,
    })
    language: string;
}
