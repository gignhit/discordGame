import { gameController } from "../game/GameController";
import ICommand from "./ICommand";
import { SlashCommandBuilder,RESTPostAPIChatInputApplicationCommandsJSONBody, CommandInteraction} from "discord.js";

export const WORDNAME= 'check-word';
export class WordCommand implements ICommand{
    private _regData:RESTPostAPIChatInputApplicationCommandsJSONBody = new SlashCommandBuilder()
            .setName(WORDNAME)
            .setDescription('check word')
            .toJSON();

    public get regData(){
        return this._regData;
    }

    execute(interaction:CommandInteraction): void {
        interaction.reply('Отгадываемое слово: '+gameController.getword(interaction.channelId));
    }
}