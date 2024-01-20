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