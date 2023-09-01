import { Game } from "../game/Game";
import ICommand from "./ICommand";
import { SlashCommandBuilder,RESTPostAPIChatInputApplicationCommandsJSONBody, CommandInteraction} from "discord.js";
const fs = require('fs');


export const STARTNAME = 'start';
export class StartGame implements ICommand{

    private _regData:RESTPostAPIChatInputApplicationCommandsJSONBody = new SlashCommandBuilder()
            .setName(STARTNAME)
            .setDescription('Command start game')
            .toJSON();

    public get regData(){
        return this._regData;
    }


    execute(interaction:CommandInteraction): void {
        if(interaction.guildId == null) return;
        let game = new Game(interaction.channelId);
        // console.log(interaction.channelId);
        
        interaction.reply(game.start());
    }
}
