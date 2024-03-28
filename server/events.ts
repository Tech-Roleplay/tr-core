/// <reference types="@altv/types-server" />

import * as alt from 'alt-server';
import { HasPlayerPermission, Permissions, ToggleDuty, } from './player.js';
import { CreateVehicle, GetIdentifier, SpwanVehicle } from './functions.js';
import * as config from './../config.js';

alt.on('playerDropped', (player: alt.Player, reason: string) => {
    alt.emit('qb-log:server:CreateLog', 'joinleave', 'Dropped', `${player.name}(${player.discordID}) left. \nReason: ${reason}`);
    //player.Save();
    player.destroy();
})

function onPlayerConnect(player: alt.Player) {
    let identifier = GetIdentifier(player)
    if (config.ServerClosed) {
        player.kick(config.ServerClosedReason);
        return;
    }

    if (identifier.length > 0) {
        player.kick(('No valid discord id'));
        return;
    } else if (config.CheckDuplicateDiscordID) {
        player.kick(('The discord id is already in use'));
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
        player.kick('No valid discord id');
        return;
    } 

    // Rest of your logic here
});


alt.on('playerDisconnect', (player: alt.Player, reason: string) => {
    alt.log(`[tr-core] ${player.name}(${player.discordID}) disconnected. Reason: ${reason}`);
    //player.Save();
    player.destroy();
})


alt.on('anyResourceStart', (resourceName: string) => {
    alt.log(`[tr-core] Resource ${resourceName} started.`);
})



alt.on('trcore:Server:CloseServer', (player: alt.Player, reason: string) => {
    if (HasPlayerPermission(player, Permissions.God)) {
        alt.log(`[tr-core] Server closed by ${player.name}(${player.discordID}) for reason: ${reason}`);
// change to db

    }
})

alt.on('trcore:Server:OpenServer', (player: alt.Player) => {
    if (HasPlayerPermission(player, Permissions.God)) {
        alt.log(`[tr-core] Server open by ${player.name}(${player.discordID})`)
    }
})

alt.on('trcore:UpdatePlayer', (player: alt.Player) => {
    if (!player) return;


})

alt.on('trcore:ToggleDuty', (player: alt.Player) => {
    ToggleDuty(player);
})

alt.on('playerEnteringVehicle', (player: alt.Player, veh: alt.Vehicle, seat: number) => {
    let data = {
        vehicle: veh,
        seat: seat,
        name: veh.model,
        event: 'Entering'
    }
    alt.emitClient(player, 'trcore:Client:VehicleInfo', data);
})

alt.on('playerEnteredVehicle', (player: alt.Player, veh: alt.Vehicle, seat: number) => {
    let data = {
        vehicle: veh,
        seat: seat,
        name: veh.model,
        event: 'Entered'
    }
    alt.emitClient(player, 'trcore:Client:VehicleInfo', data);
})

alt.on('playerLeftVehicle', (player: alt.Player, veh: alt.Vehicle, seat: number) => {
    let data = {
        vehicle: veh,
        seat: seat,
        name: veh.model,
        event: 'Left'
    }
    alt.emitClient(player, 'trcore:Client:VehicleInfo', data);
})

alt.on('trcore:Server:SpwanVehicle', (player: alt.Player, model: string) => SpwaningVehicle(player, model))
alt.on('trcore:Server:CreateVehicle', (player: alt.Player, model: string) => CreatingVehicle(player, model))

export function SpwaningVehicle(player: alt.Player, model: string) {
    SpwanVehicle(model, player)
}

export function CreatingVehicle(player: alt.Player, model: string) {
    CreateVehicle(model, player)
}
