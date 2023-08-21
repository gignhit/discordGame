import ICommand from "./ICommand";
import ICommandsFactory from "./ICommandsFactory";
import { SlashCommandBuilder,RESTPostAPIChatInputApplicationCommandsJSONBody, CommandInteraction} from "discord.js";


export default class StopGameFabric implements ICommandsFactory{
    create(): ICommand {
        return new StopGame();
    }
}

class StopGame implements ICommand{
    private _regData:RESTPostAPIChatInputApplicationCommandsJSONBody = new SlashCommandBuilder()
            .setName('stop')
            .setDescription('Command stop game')
            .toJSON();

    public get regData(){
        return this._regData;
    }

    execute(interaction:CommandInteraction): void {
        console.log('game ended!');
        interaction.reply('game ended!');
    }
}