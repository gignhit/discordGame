
import { gameController } from "../game/GameController";
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
        
        // console.log(interaction.channelId);
        
        interaction.reply(gameController.start(interaction.channelId, interaction.user));
    }
}
