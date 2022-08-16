import { Logger } from '@nestjs/common';
import { Context, SlashCommandContext, Subcommand } from 'necord';
import { UtilsCommandsDecorator } from './utils.decorator';

@UtilsCommandsDecorator()
export class UtilsPingCommands {
    private readonly _logger = new Logger(UtilsPingCommands.name);

    @Subcommand({
        name: 'ping',
        description: 'Ping command!',
    })
    public async ping(@Context() [interaction]: SlashCommandContext) {
        this._logger.log(`${interaction.user.tag} used ping command`);
        const now = Date.now();
        await interaction.reply({ content: 'Ping?' });

        const content = `Pong! Bot Latency ${Math.round(
            interaction.client.ws.ping
        )}ms. API Latency ${now - interaction.createdTimestamp}ms.`;

        return interaction.editReply(content);
    }
}
