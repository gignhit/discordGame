import { SlashCommandBuilder } from '@discordjs/builders';
import {TextInputBuilder, RESTPostAPIChatInputApplicationCommandsJSONBody} from 'discord.js'
import { REST, Routes } from 'discord.js';

require('dotenv').config();
let CLIENT_ID = process.env.CLIENT_ID ?? '';



export default async function registrationCommands(commands:Array<RESTPostAPIChatInputApplicationCommandsJSONBody>, rest:REST) {
    try {
		console.log('Started refreshing application (/) commands.');
		await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
}