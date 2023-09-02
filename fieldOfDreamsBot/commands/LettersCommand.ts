import { gameController } from "../game/GameController";
import ICommand from "./ICommand";
import { SlashCommandBuilder,RESTPostAPIChatInputApplicationCommandsJSONBody, CommandInteraction} from "discord.js";

export const INPUTED_LETTERS_NAME = 'check-inputed-letters';
export class InputedLettersCommand implements ICommand{
    private _regData:RESTPostAPIChatInputApplicationCommandsJSONBody = new SlashCommandBuilder()
            .setName(INPUTED_LETTERS_NAME)
            .setDescription('check word')
            .toJSON();

    public get regData(){
        return this._regData;
    }

    execute(interaction:CommandInteraction): void {
        interaction.reply('Введенные буквы: ' + gameController.getLetters(interaction.channelId));
    }
}