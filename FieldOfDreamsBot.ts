import IBot from './IBot';
import { 
    GatewayDispatchEvents, 
    GatewayIntentBits, 
    InteractionType, 
    MessageFlags,
    Client, 
    CommandInteraction, 
    RESTPostAPIChatInputApplicationCommandsJSONBody
} from 'discord.js';
import { TOKEN } from './env';
import CommandsFactory from './fieldOfDreamsBot/commands/CommandsFactory';

import { STOPNAME } from './fieldOfDreamsBot/commands/StopCommand';
import { STARTNAME } from './fieldOfDreamsBot/commands/StartCommand';
import { GET_LETTER_NAME } from './fieldOfDreamsBot/commands/GetLetterCommand';


export class FieldOfDreamsBot implements IBot{
    private _token:string = TOKEN;
    private _intents:Array<GatewayIntentBits> = [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent];

    private allCommandsNames():Array<string>{
        return [STARTNAME, STOPNAME, GET_LETTER_NAME];
    }

    public regCommandsData(){
        let data:RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

        for(let name of this.allCommandsNames()){
            data.push(new CommandsFactory().create(name)!.regData);
        }

        return data;
    }

    public init(): void {
        const client = new Client({ intents: this._intents });
        client.login(this._token);

        client.once('ready', () => {
            console.log(`Logged in as ${client.user!.tag}!\n я поле чудес!`);
        });

        client.on('interactionCreate', async interaction=> {
            if (!interaction.isChatInputCommand()) return;
            new CommandsFactory().create(interaction.commandName)?.execute(interaction);
        });
    }
}