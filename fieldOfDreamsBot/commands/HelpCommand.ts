import { CacheType, CommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody, SlashCommandBuilder } from "discord.js";
import ICommand from "./ICommand";
import { STOPNAME } from "./StopCommand";
import { STARTNAME } from "./StartCommand";

export const HELPNAME = 'help';
export class HelpCommand implements ICommand{
    private _regData = new SlashCommandBuilder()
            .setName(HELPNAME)
            .setDescription('')
            .toJSON()

    public get regData(): RESTPostAPIChatInputApplicationCommandsJSONBody{
        return this._regData
    }

    execute(interaction: CommandInteraction<CacheType>, ...args: any): void {
        interaction.reply(STOPNAME+'\n'+STARTNAME);
    }
}