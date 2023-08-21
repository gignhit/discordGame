import ICommand from "./ICommand";
import { SlashCommandBuilder,RESTPostAPIChatInputApplicationCommandsJSONBody, CommandInteraction} from "discord.js";
import ICommandsFactory from "./ICommandsFactory";

export default class StartGameFabric implements ICommandsFactory{
    create(): ICommand {
        return new StartGame();
    }
}

class StartGame implements ICommand{
    private _regData:RESTPostAPIChatInputApplicationCommandsJSONBody = new SlashCommandBuilder()
            .setName('start')
            .setDescription('Command start game')
            .toJSON();

    public get regData(){
        return this._regData;
    }

    execute(interaction:CommandInteraction): void {
        console.log('game started');
        interaction.reply('game started');
    }
}