/// <reference types="@altv/types-server" />

import * as alt from 'alt-server';




/**
 * Returns the position and heading of the given object.
* @param object - The object to get the position and heading for. 
*/
export function GetCoords(object: alt.Object) {
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
export function GetIdentifier(player: alt.Player) {
    let identifier = player.discordID;
    return identifier;
}

/**
 * Returns the PlayerData object of the player with the given identifier.
* @param: identifier: Player's discord identifier
*/
export function GetPlayer(identifier: string) {
    let player = alt.Player.all.find(p => p.discordID == identifier);
    return player;
}



/**
 * Gets a player by their char ID.
 * 
 * @param charid The char ID to search for.
 * @returns The player with the matching char ID, if found.
 */
export function GetPlayerByCitzenID(charid: string) {
    let player = alt.Player.all.find(p => p.getMeta('charid') == charid);
    return player;
}


/**
 * Gets an offline player by their character ID.
 * 
 * @param charid The character ID to search for. 
 * @returns The offline player with the matching character ID, if found.
 */
export function GetOfflinePlayerByCititzenId(charid: string) {
    let player = alt.Player.all.find(p => p.getMeta('charid') == charid);
    if (player && player.ping >= 0) {
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
export function GetPlayerByPhone(number: number) {
    let player = alt.Player.all.find(p => p.getMeta('phonenumber') == number);
    return player;
}


/**
 * Returns all currently connected players.
 * @returns An array of all currently connected players.
 */
export function GetPlayers() {
    let players = alt.Player.all;
    return players;
}


/**
 * Returns all currently connected players that are on duty for the specified job.
 * 
 * @param jobname The name of the job to filter for.
 * @returns An array of players on duty for the specified job.
 */
export function GetPlayersOnDuty(jobname: string) {
    let players = alt.Player.all.filter(p => p.getMeta('job:onduty') == true);
    return players;
}



/**
 * Returns the number of players currently on duty for the specified job.
 * 
 * @param jobname The name of the job to count players for.
 * @returns The number of players currently on duty for the job.
 */
export function GetDutyCount(jobname: string) {
    let players = alt.Player.all.filter(p => p.getMeta('job:onduty') == true);
    return players.length;
}


/**
 * Spawns a vehicle at the player's position and don't replace the current vehicle.
 * Like vehicle stacking.
 * 
 * @param model The model name of the vehicle to spawn.
 * @param player The player to spawn the vehicle for.
 * @returns The spawned vehicle.
 */
export function SpwanVehicle(model: string, player: alt.Player) {
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
export function CreateVehicle(model: string, player: alt.Player) {
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
function PaycheckInterval(player: alt.Player, payment: number) {
    var paycheck = () => {
        //AddMoney("bank", payment, "Paycheck: " + payment + "$")
    };
    alt.setInterval(paycheck, 9000000);
    return;
}  

export {
    PaycheckInterval
}
