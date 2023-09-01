import ICommand from "./ICommand";
import { SlashCommandBuilder,RESTPostAPIChatInputApplicationCommandsJSONBody, CommandInteraction} from "discord.js";

export const STOPNAME = 'stop';
export class StopGame implements ICommand{
    private _regData:RESTPostAPIChatInputApplicationCommandsJSONBody = new SlashCommandBuilder()
            .setName(STOPNAME)
            .setDescription('Command stop game')
            .toJSON();

    public get regData(){
        return this._regData;
    }

    execute(interaction:CommandInteraction): void {
        interaction.reply('end?');
    }
}