require('dotenv').config();
import { FieldOfDreamsBot } from "./FieldOfDreamsBot";
import { testBot } from "./testBot";
import { SlashCommandBuilder } from '@discordjs/builders';
import registrationCommands from "./registrationCommands";
import { REST } from 'discord.js';


let TOKEN = process.env.DISCORD_TOKEN ?? '';
let CLIENT_ID = process.env.CLIENT_ID ?? '';
const rest = new REST({ version: '10' }).setToken(TOKEN);

const fieldGameBot = new FieldOfDreamsBot(TOKEN);
fieldGameBot.init();

let commands = [];

await registrationCommands(commands, rest);


