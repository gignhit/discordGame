import IBot from "./IBot";
import { GatewayDispatchEvents, GatewayIntentBits, InteractionType, MessageFlags, Client} from 'discord.js';
import {RESTPostAPIChatInputApplicationCommandsJSONBody} from 'discord.js';

export class  testBot implements IBot{
    commands:Array<RESTPostAPIChatInputApplicationCommandsJSONBody> = [];
    intents:Array<GatewayIntentBits> = [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent];

    private _token:string;

    constructor(token:string){
        this._token = token;
    }

    public init(): void {
        const client = new Client({ intents: this.intents });
        client.login(this._token);

        client.on('ready', () => {
            console.log(`Logged in as ${client.user!.tag}!\n я бот дебил`);
        });

        client.on('interactionCreate', async interaction => {
            if (!interaction.isChatInputCommand()) return;
            if (interaction.commandName === 'test') {
                await interaction.reply('test bot working!');
            }
        });
    }
}