import { gameController } from "../game/GameController";
import ICommand from "./ICommand";
import { SlashCommandBuilder,RESTPostAPIChatInputApplicationCommandsJSONBody, CommandInteraction} from "discord.js";

export const GET_LETTER_NAME = 'input-letter';
export class GetLetterCommand implements ICommand{

    private _regData:RESTPostAPIChatInputApplicationCommandsJSONBody = new SlashCommandBuilder()
            .setName(GET_LETTER_NAME)
            .setDescription('Получаю букву')
            .addStringOption((option) =>
                option
                    .setName('letter')
                    .setDescription('Назовите букву')
                    .setRequired(true)
            )
            .toJSON();

    public get regData(){
        return this._regData;
    }

    execute(interaction:CommandInteraction): void {
        // console.log(interaction.options.data);

        let letter = interaction.options.data[0].value?.toString().toLowerCase() ?? '';
        // console.log(letter);

        interaction.reply(gameController.inputLetter(interaction.channelId, interaction.user, letter));
    }
}
