/// <reference types="@altv/types-server" />
/// <reference types="@altv-vchat/types"/>

import * as alt from 'alt-server';
import * as chat from '../../chat/server/index.js';
import { PlayerData } from './player.js';




// CommandList Array
//export const CommandList: Commands[] = [];

// command class

/**
     * Registers a new chat command with the given name, description, parameters, 
     * required arguments flag, callback function, and required permission level.
     * 
     * @param Player - The player data for the player running the command
     * @param commandname - The name of the command to register
     * @param desc - A description of what the command does
     * @param parameters - An object with name and description properties for the command arguments
     * @param parameters.name - The name of the command argument
     * @param parameters.description - The description of the command argument
     * @param argsrequired - Whether the command requires arguments
     * @param callback - The function to call when the command is run
     * @param permission - The minimum permission level required to run this command
    */
export function addCommand(Player: PlayerData, commandname: string, desc: string, parameters: { name: string, description: string }, argsrequired: boolean, permission: number, callback: () => void ) {



    // Check player permission
    if (Player.permission >= permission) {

        // Register the command and suggestion
        chat.registerCmd(commandname, callback);
        

    }

}


chat.registerCmd('help', (player: PlayerData, args: any) => {
    alt.log(`Help command called by ${player.name}`);
    chat.send(player, 'No help, xD ' + player.name);
})


chat.registerCmd('spawn', (player: PlayerData, args: any) => {
    let model = args[0];
    if (!model) {
        model = 'mp_m_freemode_01';
    }

    player.spawn(player.pos.x, player.pos.y, player.pos.z, 0);

    try {
        player.model = model;
    } catch (err) {
        chat.send(player, 'Invalid Model. Using default.');
        player.model = 'mp_m_freemode_01';
    }
});