import { gameController } from "../game/GameController";
import ICommand from "./ICommand";
import { SlashCommandBuilder,RESTPostAPIChatInputApplicationCommandsJSONBody, CommandInteraction} from "discord.js";

export const INPUT_WORD_NAME = 'input-word';
export class InputWordCommand implements ICommand{

    private _regData:RESTPostAPIChatInputApplicationCommandsJSONBody = new SlashCommandBuilder()
            .setName(INPUT_WORD_NAME)
            .setDescription('Получаю букву')
            .addStringOption((option) =>
                option
                    .setName('word')
                    .setDescription('Назовите слово')
                    .setRequired(true)
            )
            .toJSON();

    public get regData(){
        return this._regData;
    }

    execute(interaction:CommandInteraction): void {
        // console.log(interaction.options.data);

        let word = interaction.options.data[0].value?.toString().toLowerCase() ?? '';
        // console.log(word);

        interaction.reply(gameController.inputWord(interaction.channelId, interaction.user, word));
    }
}
