import { Game } from "../game/Game";
import ICommand from "./ICommand";
import { SlashCommandBuilder,RESTPostAPIChatInputApplicationCommandsJSONBody, CommandInteraction} from "discord.js";

export const WORDNAME= 'word';
export class WordCommand implements ICommand{
    private _regData:RESTPostAPIChatInputApplicationCommandsJSONBody = new SlashCommandBuilder()
            .setName(WORDNAME)
            .setDescription('check word')
            .toJSON();

    public get regData(){
        return this._regData;
    }

    execute(interaction:CommandInteraction): void {
        let game = new Game(interaction.channelId);
        interaction.reply(game.getword());
    }
}