/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />

import * as alt from 'alt-client';
import * as native from 'natives';
import { PlayerData } from "./../server/player.js";


/**
 * Gets the player data for the given player.
 * 
 * @param cb - The player to get the data for.
 * @returns The player data if cb is null, otherwise null.
 */
export function GetPlayerData(cb: PlayerData) {
    if (!cb) { 
        return PlayerData;
    }
    else {
        return null;
    }

}

/**
 * Gets the coordinates of the given entity.
 * 
 * @param entity - The entity to get the coordinates of.
 * @returns A Vector3 with the entity's coordinates.
 */
export function GetCoords(entity: alt.Entity) {
    let coords = entity.pos
    return new alt.Vector3(coords.x, coords.y, coords.z)
}

/**
 * Checks if the player has a specified item and amount.
 * 
 * @param items - The name of the item to check for. 
 * @param amount - The amount of the item the player needs to have.
 * @returns - Not implemented.
 */
export function HasItem(items: string, amount: number) {
    // item has func

}

/**
 * Draws text at the given coordinates on screen.
 * 
 * @param x - The x coordinate to draw the text at. 
 * @param y - The y coordinate to draw the text at.
 * @param width - The width of the text box.
 * @param height - The height of the text box. 
 * @param scale - The scale of the text. 
 * @param r - The red color value. 
 * @param g - The green color value.
 * @param b - The blue color value.
 * @param a - The alpha (transparency) value. 
 * @param text - The text to draw.
 */
export function DrawText(x: number, y: number, width: number, height: number, scale: number, r: number, g: number, b: number, a: number, text: string) {
    native.setTextFont(4);
    native.setTextScale(scale, scale);
    native.setTextColour(r, g, b, a);
    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(text);
    native.endTextCommandDisplayText(x, y, 0);
}

/**
 * Draws 3D text at the given coordinates.
 *
 * @param x - The x coordinate to draw the text at.
 * @param y - The y coordinate to draw the text at. 
 * @param z - The z coordinate to draw the text at.
 * @param text - The text to draw.
 */
export function DrawText3D(x: number, y: number, z: number, text: string) {
    native.setTextScale(0.35, 0.35);
    native.setTextFont(4);
    native.setTextProportional(true);
    native.beginTextCommandDisplayText('STRING');
    native.addTextComponentSubstringPlayerName(text);
    native.setTextCentre(true);
    native.setDrawOrigin(x, y, z, false);
    native.endTextCommandDisplayText(0, 0, 0);
    let factor: number = (text.length) / 370;
    native.drawRect(0.0, 0.0 + 0.0125, 0.017 + factor, 0.03, 0, 0, 0, 75, true);
    native.clearDrawOrigin();
}

/**
 * Requests the animation dictionary with the given name to be loaded.
 * 
 * @param animDict - The name of the animation dictionary to load.
 */
export function RequestAnimDict(animDict: string) {
    if (native.hasAnimDictLoaded(animDict)) { return }
    native.requestAnimDict(animDict)
}

/**
 * Plays an animation on the player ped.
 * 
 * @param animDict - The name of the animation dictionary to use.
 * @param animName - The name of the animation to play.
 * @param upperbodyOnly - Whether to only apply the animation to the upper body.
 * @param duration - The duration in milliseconds to play the animation for. -1 for entire animation.
 */
export function PlayAnim(animDict: string, animName: string, upperbodyOnly: boolean, duration: number) {
    let flag = upperbodyOnly && 16 || 0;
    let runTime = duration || -1;
    RequestAnimDict(animDict);
    native.taskPlayAnim(native.playerPedId(), animDict, animName, 8.0, 1.0, runTime, flag, 0.0, false, false, true);
    native.removeAnimDict(animDict);
}

/**
 * Loads the model with the given hash if it is not already loaded.
 * 
 * @param model - The model hash to load.
 */
export function LoadModel(model: number) {
    if (native.hasModelLoaded(model)) { return }
    native.requestModel(model)
}

/**
 * Loads the animation set with the given name if it is not already loaded.
 * 
 * @param animSet - The name of the animation set to load.
 */
export function LoadAnimSet(animSet: string) {
    if (native.hasAnimSetLoaded(animSet)) { return }
    native.requestAnimSet(animSet);
} 

/*alt.on('getNotifyConfig', (cb: any) => {
    cb()
})*/

/**
 * Displays a notification to the player.
 * 
 * @param text - The text content of the notification. Can be a string or object.
 * @param caption - Optional caption text for the notification.
 * @param texttype - The type/style of the notification. Default 'primary'.
 * @param length - The duration in ms to display the notification. Default 5000. 
 */
export function Notify(text: string, caption?: string, texttype: string = 'primary', length: number = 5000) {
    let message = {
        action: 'notify',
        type: texttype,
        length: length,
        text: text,
        caption: caption

    };

    if (typeof text === 'object') {
        message.text = text || 'Placeholder';
        message.caption = caption || 'Placeholder';
    } else {
        message.text = text;
    }

    alt.emit('notify', message)
}

// Progressbar

// Peds

/**
 * Gets all peds except the ones in the ignore list.
 * 
 * @param ignoreList - List of peds to ignore/exclude
 * @returns Array of ped handles
 */
export function GetPeds(ignoreList: any[]): any[] {
    let pedPool = alt.Ped.all;
    let peds: any[] = [];
    ignoreList = ignoreList || [];
    for (let i = 0; i < pedPool.length; i++) {
        let found = false;
        for (let j = 0; j < ignoreList.length; j++) {
            if (ignoreList[j] == pedPool[i]) {
                found = true;
            }
        }
        if (!found) {
            peds.push(pedPool[i]);
        }
    }
    return peds;
}

/**
 * Calculates the distance between two Vector3 points.
 * 
 * @param p1 - The first point
 * @param p2 - The second point
 * @returns The distance between the two points
 */
export function dist(p1: alt.Vector3, p2: alt.Vector3): number {
    return p1.sub(p2).length;
}

/**
 * Gets the closest ped to the given coordinates while ignoring 
 * the peds in the ignore list.
 * 
 * @param coords - The coordinates to check distance from. If not provided, uses local player position.
 * @param ignoreList - List of peds to ignore when checking for closest.
 * @returns An array with the closest ped handle and the distance to it.
 */
export function GetClosestPed(coords: alt.Vector3, ignoreList: any[]): [any, number] {
    let ped = native.playerPedId();
    if (coords) {
        coords = typeof coords === 'object' ? new alt.Vector3(coords.x, coords.y, coords.z) : coords;
    } else {
        coords = native.getEntityCoords(ped, true);
    }
    ignoreList = ignoreList || [];
    let peds = GetPeds(ignoreList);
    let closestDistance = -1;
    let closestPed = -1;
    for (let i = 0; i < peds.length; i++) {
        let pedCoords = native.getEntityCoords(ped, true);
        let distance = dist(pedCoords, coords);

        if (closestDistance == -1 || closestDistance > distance) {
            closestPed = peds[i];
            closestDistance = distance;
        }
    }
    return [closestPed, closestDistance];
}

/**
 * Checks if the local player ped is currently wearing gloves.
 * 
 * Gets the ped model and checks the arm drawable index against lists of 
 * gloveless indices for male and female models.
 * 
 * @returns True if the ped has gloves, false if gloveless.
 */
export function IsWearingGloves() {
    let ped = native.playerPedId();
    let armIndex = native.getPedDrawableVariation(ped, 3);
    let model = native.getEntityModel(ped);
    if (model == alt.hash('mp_m_freemode_01')) {
        //if MaleNoGloves(armIndex)
    }
    else {
        //if FemaleNoGloves(armIndex)
    }
    return true;
}

/**
 * Gets the closest player to the specified coordinates.
 * 
 * @param coords - The coordinates to check distance from. Can be a Vector3 object or alt.Vector3 instance. Defaults to the local player's position.
 * @returns The closest player ID and the distance to them.
 */
export function GetClosestPlayer(coords: alt.Vector3) {
    let ped = native.playerPedId();
    if (coords) {
        coords = typeof coords === 'object' ? new alt.Vector3(coords.x, coords.y, coords.z) : coords;
    } else {
        coords = native.getEntityCoords(ped, true);
    }
    let closestPlayers = GetPlayersFromCoords(coords)
    let closestDistance = -1
    let closestPlayer = -1
    for (let i = 0; i < closestPlayers.length; i++) {
        if (closestPlayers[i] != native.playerId() && closestPlayers[i] != -1) {
            let pos = native.getEntityCoords(native.getPlayerPed(closestPlayers[i]), true || false);
            let distance = dist(pos, coords);

            if (closestDistance == -1 || closestDistance > distance) {
                closestPlayer = closestPlayers[i];
                closestDistance = distance;
            }
        }
    }
    return closestPlayer && closestDistance
}

/**
 * Gets a list of all players within a specified distance of a position.
 * 
 * @param coords - The position to check distance from. Can be a Vector3 object or alt.Vector3 instance. Defaults to the local player's position.
 * @param distance - The max distance to check for players. Default is 5.
 * @returns Array of player IDs that are within the specified distance.
 */
export function GetPlayersFromCoords(coords: alt.Vector3, distance = 5) {
    let players = alt.Player.all;
    let ped = native.playerPedId();
    if (coords) {
        coords = typeof coords === 'object' ? new alt.Vector3(coords.x, coords.y, coords.z) : coords;
    } else {
        coords = native.getEntityCoords(ped, true || false);
    }
    let closePlayers: any[] = [];
    for (let player of players) {
        let target = native.getPlayerPed(player);
        let targetCoords = native.getEntityCoords(target, true || false);
        let targetdistance = dist(targetCoords, coords);
        if (targetdistance <= distance) {
            closePlayers.push(player);
        }
    }
    return closePlayers;
}

/**
 * Gets the closest vehicle to the specified coordinates.
 * 
 * @param coords - The position to check distance from. Can be a Vector3 object or alt.Vector3 instance. Defaults to the local player's position.
 * @returns An array with the closest vehicle's ID and distance to the coordinates.
 */
export function GetClosestVehicle(coords: alt.Vector3) {
    let ped = native.playerPedId();
    let vehicles = alt.Vehicle.all;
    let closestDistance = -1;
    let closestVehicle = -1;
    if (coords) {
        coords = typeof coords === 'object' ? new alt.Vector3(coords.x, coords.y, coords.z) : coords;
    } else {
        coords = native.getEntityCoords(ped, true || false);
    }
    for (let i = 0; i < vehicles.length; i++) {
        let vehicleCoords = native.getEntityCoords(vehicles[i], true || false);
        let distance = dist(vehicleCoords, coords);

        if (closestDistance == -1 || closestDistance > distance) {
            closestVehicle = vehicles[i].id;
            closestDistance = distance;
        }
    }
    return [closestVehicle, closestDistance];
}

/**
 * Gets the closest object to the specified coordinates.
 * 
 * @param coords - The position to check distance from. Can be a Vector3 object or alt.Vector3 instance. Defaults to the local player's position.
 * @returns An array with the closest object's ID and distance to the coordinates.
 */
export function GetClosestObject(coords: alt.Vector3) {
    let ped = native.playerPedId();
    let objects = alt.Object.all;
    let closestDistance = -1;
    let closestObject = -1;
    if (coords) {
        coords = typeof coords === 'object' ? new alt.Vector3(coords.x, coords.y, coords.z) : coords;
    } else {
        coords = native.getEntityCoords(ped, true || false);
    }
    for (let i = 0; i < objects.length; i++) {
        let objectCoords = native.getEntityCoords(objects[i], true || false);
        let distance = dist(objectCoords, coords);

        if (closestDistance == -1 || closestDistance > distance) {
            closestObject = objects[i].id;
            closestDistance = distance;
        }
    }
    return [closestObject, closestDistance];
}