import { GatewayDispatchEvents, GatewayIntentBits, InteractionType, MessageFlags, Client} from 'discord.js';
import {RESTPostAPIChatInputApplicationCommandsJSONBody} from 'discord.js';

export default interface IBot{
    commands:Array<RESTPostAPIChatInputApplicationCommandsJSONBody>;
    // intents?:Array<GatewayIntentBits>;

    init():void;
    //regCommands():Array<RESTPostAPIChatInputApplicationCommandsJSONBody>;
}