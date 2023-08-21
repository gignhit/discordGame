import IBot from "./IBot";
import { GatewayDispatchEvents, GatewayIntentBits, InteractionType, MessageFlags, Client} from 'discord.js';
import {RESTPostAPIChatInputApplicationCommandsJSONBody} from 'discord.js';

export class  FieldOfDreamsBot implements IBot{
    private _token:string;
    private _intents:Array<GatewayIntentBits> = [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent];
    private _commands:Array<RESTPostAPIChatInputApplicationCommandsJSONBody> = [];

    constructor(token:string){
        this._token = token;
    }

    public init(): void {
        const client = new Client({ intents: this._intents });
        client.login(this._token);

        client.on('ready', () => {
            console.log(`Logged in as ${client.user!.tag}!\n я поле чудес!`);
        });

        client.on('interactionCreate', async interaction => {
            if (!interaction.isChatInputCommand()) return;
            if (interaction.commandName === 'field') {
                await interaction.reply('fieldDreams working!');
            }
        });
    }

    public get commands(){
        return this._commands;
    }
}