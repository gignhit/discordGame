import IBot from '../IBot';
import { 
    GatewayDispatchEvents, 
    GatewayIntentBits, 
    InteractionType, 
    MessageFlags,
    Client, 
    CommandInteraction, 
    RESTPostAPIChatInputApplicationCommandsJSONBody
} from 'discord.js';
import ICommand from './commands/ICommand';
import StartGameFabric from './commands/StartGame';
import StopGameFabric from './commands/StopGame';


export class FieldOfDreamsBot implements IBot{
    private _ineractionGuildId:string = '';
    private _token:string = process.env.DISCORD_TOKEN ?? '';;
    private _intents:Array<GatewayIntentBits> = [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent];

    private _commands = new Map<string, ICommand>()

    private initCommands():void{
        this._commands.set('start', new StartGameFabric().create());
        this._commands.set('stop', new StopGameFabric().create());
    }

    public regCommandsData(){
        let data:RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

        for (let cd of this._commands.values()) {
            data.push(cd.regData);
        }

        return data;
    }

    public init(): void {
        this.initCommands();
        const client = new Client({ intents: this._intents });
        client.login(this._token);

        client.once('ready', () => {
            console.log(`Logged in as ${client.user!.tag}!\n я поле чудес!`);
        });

        client.on('interactionCreate', async interaction=> {
            if (!interaction.isChatInputCommand()) return;
            if(this._commands.has(interaction.commandName)){
                this._commands.get(interaction.commandName)!.execute(interaction);
            }
        });
    }
}