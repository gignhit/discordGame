require('dotenv').config();
import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js';
import { FieldOfDreamsBot } from "./fieldOfDreamsBot/FieldOfDreamsBot";
import registrationCommands from './registrationCommands';

let TOKEN = process.env.DISCORD_TOKEN ?? '';

const rest = new REST({ version: '10' }).setToken(TOKEN);

let commands:RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

const fieldOfDreamBot = new FieldOfDreamsBot();
fieldOfDreamBot.init();

commands = commands.concat(fieldOfDreamBot.regCommandsData());

registrationCommands(commands, rest);



