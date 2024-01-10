/// <reference types="@altv/types-server" />

import * as alt from 'alt-server';
import { PlayerData } from './player.js';



/**
 * Returns the position and heading of the given object.
* @param object - The object to get the position and heading for. 
*/
export function GetCoords(object) {
    let pos = object.pos;
    let heading = object.rot.z;
    return {
        x: pos.x,
        y: pos.y,
        z: pos.z,
        heading: heading
    }
}

/**
 * Returns the player's discord identifier.
* @param: PlayerData: The player's data
*/
export function GetIdentifier(player) {
    let identifier = player.discordID;
    return identifier;
}

/**
 * Returns the PlayerData object of the player with the given identifier.
* @param: identifier: Player's discord identifier
*/
export function GetPlayer(identifier) {
    let player = PlayerData.all.find(p => p.discordID == identifier);
    return player;
}



/**
 * Gets a player by their citizen ID.
 * 
 * @param citizenid The citizen ID to search for.
 * @returns The player with the matching citizen ID, if found.
 */
export function GetPlayerByCitzenID(citizenid) {
    let player = PlayerData.all.find(p => p.citizenid == citizenid);
    return player;
}

/**
 * Gets an offline player by their citizen ID.
 * 
 * @param citizenid The citizen ID of the player to find.
 * @returns The offline player with the matching citizen ID if found, otherwise null.
 */
export function GetOfflinePlayerByCititzenId(citizenid) {
    let player = PlayerData.all.find(p => p.citizenid == citizenid);
    if (player.ping >= 0) {
        return player;
    }
    return null;
}

/**
 * Gets a player by their phone number.
 * 
 * @param number The phone number to search for. 
 * @returns The player with the matching phone number, if found.
*/
export function GetPlayerByPhone(number) {
    let player = PlayerData.all.find(p => p.charinfo.phone == number);
    return player;
}


/**
 * Gets all player data objects.
 * 
 * @returns Array of all PlayerData objects.
 */
export function GetPlayers() {
    let players = PlayerData.all;
    return players;
}

/**
 * Gets all players that are currently on duty for the specified job.
 * 
 * @param job - The job to check for on-duty players.
 * @returns Array of PlayerData for players on duty for the job.
 */
export function GetPlayersOnDuty(job) {
    let players = PlayerData.all.filter(p => p.Job.jobonduty == true);
    return players;
}


/**
 * Gets the number of players currently on duty for the specified job.
 * 
 * @param job - The job to count on-duty players for.
 * @returns The number of players currently on duty for the job.
 */
export function GetDutyCount(job) {
    let players = PlayerData.all.filter(p => p.Job.jobonduty == true);
    return players.length;
}

/**
 * Spawns a new vehicle for the player and doesn't remove the player's current vehicle.
 * 
 * @param model - The model name of the vehicle to spawn.
 * @param player - The player to spawn the vehicle for.
 * @returns The spawned vehicle instance.
 */
export function SpwanVehicle(model, player) {
    let vehicle = new alt.Vehicle(model, player.pos, player.rot);
    player.setIntoVehicle(vehicle, 1);
    vehicle.setNetOwner(player);
    return vehicle;
}

/**
 * Spawns a new vehicle for the player and remove the player's current vehicle.
 * 
 * @param model - The model name of the vehicle to spawn. 
 * @param player - The player to spawn the vehicle for.
 * @returns The spawned vehicle instance.
 */
export function CreateVehicle(model, player) {
    if (player.vehicle) {
        player.vehicle.destroy();
    }
    let vehicle = new alt.Vehicle(model, player.pos, player.rot);
    vehicle.setNetOwner(player);
    player.setIntoVehicle(vehicle, 1);
    return vehicle;

}

/**
 * Starts an interval timer that periodically gives the player a paycheck of the specified amount.
 * 
 * @param player - The player to give the paycheck to. 
 * @param payment - The amount of each paycheck.
 */
function PaycheckInterval(player, payment) {
    var paycheck = () => {
        player.AddMoney("bank", payment, "Paycheck: " + payment + "$")
    };
    alt.setInterval(paycheck, 9000000);
    return;
}  

export {
    PaycheckInterval
}
