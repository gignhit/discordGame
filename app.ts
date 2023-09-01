require('dotenv').config();
import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js';
import { FieldOfDreamsBot } from "./FieldOfDreamsBot";
import registrationCommands from './registrationCommands';

import { TOKEN } from './env';


const rest = new REST({ version: '10' }).setToken(TOKEN);

let commands:RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

const fieldOfDreamBot = new FieldOfDreamsBot();
fieldOfDreamBot.init();

commands = commands.concat(fieldOfDreamBot.regCommandsData());
registrationCommands(commands, rest);



