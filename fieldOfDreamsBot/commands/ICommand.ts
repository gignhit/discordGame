import { CommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";

export default interface ICommand{
    regData:RESTPostAPIChatInputApplicationCommandsJSONBody;
    execute(interaction:CommandInteraction, ...args:any):void;
}