/// <reference types="@altv/types-server" />

import * as alt from 'alt-server';
import { Permissions, PlayerData } from './player.js';
import { GetIdentifier } from './functions.js';
import * as config from './../config.js';

alt.on('playerDropped', (player: PlayerData, reason: string) => {
    alt.emit('qb-log:server:CreateLog', 'joinleave', 'Dropped', `${player.name}(${player.discordID}) left. \nReason: ${reason}`);
    player.Save();
    player.destroy();
})

function onPlayerConnect(player: PlayerData) {
    let identifier = GetIdentifier(player)
    if (config.ServerClosed) {
        player.kick(config.ServerClosedReason);
        return;
    }

    if (identifier.length > 0) {
        player.kick(('error.no_valid_discord_id'));
        return;
    } else if (config.CheckDuplicateDiscordID) {
        player.kick(('error.duplicate_discord_id'));
        return;
    }
}

alt.on('playerConnect', (player: alt.Player) => {
    // Your logic here
    let identifier = GetIdentifier(player);

    if (config.ServerClosed) {
        player.kick(config.ServerClosedReason);
        return;
    }

    if (identifier.length > 0) {
        player.kick('error.no_valid_discord_id');
        return;
    } else if (config.CheckDuplicateDiscordID) {
        player.kick('error.duplicate_discord_id');
        return;
    }

    // Rest of your logic here
});



alt.on('trcore:Server:CloseServer', (player: PlayerData, reason: string) => {
    if (player.permission >= Permissions.God) {
        alt.log(`[tr-core] Server closed by ${player.name}(${player.discordID}) for reason: ${reason}`);

        
        // set serverclose to true, but is not funtional
        //config.ServerClosed = true;
        //config.ServerCloseReason = true;


    }
})

alt.on('trcore:Server:OpenServer', (player: PlayerData) => {
    if (player.permission >= Permissions.God) {
        alt.log(`[tr-core] Server open by ${player.name}(${player.discordID})`)
    }
})

alt.on('trcore:UpdatePlayer', (player: PlayerData) => {
    if (!player) return;


})

alt.on('trcore:ToggleDuty', (player: PlayerData) => {
    if (player.Job.jobonduty) {
        player.Job.jobonduty = false
    } else {
        player.Job.jobonduty = true
    }
})

