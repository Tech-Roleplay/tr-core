/// <reference types="@altv/types-server" />

import * as alt from 'alt-server';
import { GetIdentifier } from './functions.js';
//import { execute } from './../../mysql/mysql.js';
import { Dir } from 'fs';


export enum Permissions{
    Player,
    Support,
    Mod,
    Admin,
    God,
    GodManager,
    Owner

}
export enum Gender {
    Unknown,
    Male,
    Female
}


/*export function PlayerLogin(player: PlayerData, citizenid: string, newData: string) {
    if (player && player !== null) {
        if (citizenid!== null && citizenid!== undefined) {
            const license = trcoreFunctionsGetIdentifier(player);
            const Playerdata = await execute('SELECT * FROM players where citizenid = ?', [citizenid] )
            if (Playerdata.length > 0) {
                player.money = JSON.parse(Playerdata.money);
                player.Job = JSON.parse(PlayerData.job);
                player.Position = JSON.parse(PlayerData.Position);
                player.metadata = JSON.parse(PlayerData.metadata);
                player.charinfo = JSON.parse(PlayerData.charinfo);
                if (player.Gang) {
                    player.Gang = JSON.parse(PlayerData.Gang);
                }
                else {PlayerData.Gang = null}
                (player, PlayerData);
                }
            else{
                
            }
        }
    }


}*/






function SavePlayerData(player: alt.Player) {
    let ped = player
    let pcoords = ped.pos;
    let playerData = player;
    if (playerData) {

    }
}

/**
 * Checks if a player has a specific permission level.
 * 
 * @param player - The player to check permissions for.
 * @param permission - The permission level to check.
 * @returns True if the player has the specified permission, false otherwise.
 */
function HasPlayerPermission(player: alt.Player, permission: Permissions) {
    let perms = player.getMeta('permissions') as number;
    if (perms >= permission) {
        return true;
    } else {
        return false;
    }
}

/**
 * Sets the job for the given player.
 *
 * @param player - The player to set the job for.
 * @param jobname - The name of the job.
 * @param joblabel - The display label for the job. 
 * @param jobpayment - The payment amount for the job.
 * @param jobtype - The type of job.
 * @param jobonduty - Whether the job is on duty.
 * @param jobisboss - Whether the player is the boss of the job.
 * @param jobgrade - The job grade object containing name and level.
 */
function setJob(player: alt.Player, jobname: string, joblabel: string, jobpayment: number, jobtype: string, jobonduty: boolean, jobisboss: boolean, jobgrade: { name: string, level: number, extrasallery: Array<string> }) {
    jobname.toLowerCase();
    player.setMeta('job:name', jobname);
    player.setMeta('job:label', joblabel);
    player.setMeta('job:payment', jobpayment);
    player.setMeta('job:type', jobtype);
    player.setMeta('job:onduty', jobonduty);
    player.setMeta('job:isboss', jobisboss);
    player.setMeta('job:gradename', jobgrade.name);
    player.setMeta('job:gradelevel', jobgrade.level);
}


/**
 * Resets the job metadata for the given player. 
 *
 * Sets all job metadata fields to default values.
 * @param player - The player to reset the job for.
 */
function ResetJob(player: alt.Player) {
    player.setMeta('job:name', '');
    player.setMeta('job:label', '');
    player.setMeta('job:payment', 0);
    player.setMeta('job:type', '');
    player.setMeta('job:onduty', false);
    player.setMeta('job:isboss', false);
    player.setMeta('job:gradename', '');
    player.setMeta('job:gradelevel', 0);
}

/**
 * Gets the current job details for the given player.
 * 
 * Retrieves the job metadata fields from the player and returns them
 * in a job details object.
 * 
 * @param player - The player to get the job details for.
 * @returns The job details object containing the name, label, payment, 
 * type, onduty status, boss status, grade name and level.
 */
function GetJob(player: alt.Player) {
    let jobname = player.getMeta('job:name') as string;
    let joblabel = player.getMeta('job:label') as string;
    let jobpayment = player.getMeta('job:payment') as number;
    let jobtype = player.getMeta('job:type') as string;
    let jobonduty = player.getMeta('job:onduty') as boolean;
    let jobisboss = player.getMeta('job:isboss') as boolean;
    let jobgradename = player.getMeta('job:gradename') as string;
    let jobgradelevel = player.getMeta('job:gradelevel') as number;
    return {
        name: jobname,
        label: joblabel,
        payment: jobpayment,
        type: jobtype,
        onduty: jobonduty,
        isboss: jobisboss,
        gradename: jobgradename,
        gradelevel: jobgradelevel
    }
}

/**
 * Toggles the on/off duty status for the given player.
 * 
 * Gets the current onduty status from the player's job metadata.
 * 
 * If they are currently onduty, sets it to false.
 * If they are currently offduty, sets it to true.
 * 
 * @param player - The player to toggle the duty status for.
 * 
 */
function ToggleDuty(player: alt.Player) {
    let jobonduty = player.getMeta('job:onduty');
    if (jobonduty) {
        player.setMeta('job:onduty', false);
    }
    else {
        player.setMeta('job:onduty', true);
    }
}

/**
 * Sets the gang for the given player.
 * 
 * @param player - The player to set the gang for
 * @param gangname - The name of the gang
 * @param ganglabel - The display label for the gang
 * @param gangisboss - Whether the player is the boss of the gang
 * @param ganggrade - The gang grade object containing name and level
 */
function SetGang(player: alt.Player, gangname: string, ganglabel: string, gangisboss: boolean, ganggrade: { name: string, level: string }) {
    gangname.toLowerCase();
    player.setMeta('gang:name', gangname);
    player.setMeta('gang:label', ganglabel);
    player.setMeta('gang:isboss', gangisboss);
    player.setMeta('gang:gradename', ganggrade.name);
    player.setMeta('gang:gradelevel', ganggrade.level);
}

/**
 * Resets the gang metadata for the given player.
 * 
 * Sets all gang metadata fields to default values.
 * @param player - The player to reset the gang for.
 */
function ResetGang(player: alt.Player) {
    player.setMeta('gang:name', '');
    player.setMeta('gang:label', '');
    player.setMeta('gang:isboss', false);
    player.setMeta('gang:gradename', '');
    player.setMeta('gang:gradelevel', 0);
}

/**
 * Gets the current gang metadata for the given player.
 * 
 * @param player - The player to get the gang metadata for
 * @returns Object containing the player's current gang name, label, boss status, grade name and level
 */
function GetGang(player: alt.Player) {
    let gangname = player.getMeta('gang:name') as string;
    let ganglabel = player.getMeta('gang:label') as string;
    let gangisboss = player.getMeta('gang:isboss') as boolean;
    let ganggradename = player.getMeta('gang:gradename') as string;
    let ganggradelevel = player.getMeta('gang:gradelevel') as number;
    return {
        name: gangname,
        label: ganglabel,
        isboss: gangisboss,
        gradename: ganggradename,
        gradelevel: ganggradelevel
    }
}

/**
 * Adds the specified amount of money to the given player's balance.
 * 
 * @param player - The player to add money to.
 * @param moneytype - The type of money to add ('cash', 'bank', 'crypto'). 
 * @param amount - The amount of money to add.
 * @param reason - The reason for adding the money.
 */
function AddMoney(player: alt.Player, moneytype: ('cash' | 'bank' | 'crypto'), amount: number, reason: string) {
    if (moneytype == 'cash') {
        let cash = player.getMeta('money:cash') as number;
        if (cash !== undefined) {
            cash += amount;
        } else {
            return;
        }
        player.setMeta('money:cash', cash);
        alt.log(`[Money] Added ${amount} cash to ${player.name} (${reason}). New balance is ${cash}.`);
    } else if (moneytype == 'bank') {
        let bank = player.getMeta('money:bank') as number;
        if (bank !== undefined) {
            bank += amount;
        } else {
            return;
        }
        player.setMeta('money:bank', bank);
        alt.log(`[Money] Added ${amount} bank to ${player.name} (${reason}). New balance is ${bank}.`);
    } else if (moneytype == 'crypto') {
        let crypto = player.getMeta('money:crypto') as number;
        if (crypto !== undefined) {
            crypto += amount;
        } else {
            return;
        }
        player.setMeta('money:crypto', crypto);
        alt.log(`[Money] Added ${amount} crypto to ${player.name} (${reason}). New balance is ${crypto}.`);
    } else {
        return;
    }
    alt.emit('hud:client:UpdateMoney', player, moneytype, amount, false);
    alt.emit('trcore:client:UpdateMoney', player, moneytype, amount, "add", reason);

}

/**
 * Removes the specified amount of money from the given player's balance.
 * 
 * @param player - The player to remove money from.
 * @param moneytype - The type of money to remove ('cash', 'bank', 'crypto').
 * @param amount - The amount of money to remove. 
 * @param reason - The reason for removing the money.
 */
function RemoveMoney(player: alt.Player, moneytype: ('cash' | 'bank' | 'crypto'), amount: number, reason: string) {
    if (moneytype == 'cash') {
        let cash = player.getMeta('money:cash') as number;
        if (cash !== undefined) {
            cash -= amount;
        } else {
            return;
        }
        player.setMeta('money:cash', cash);
        alt.log(`[Money] Remove ${amount} cash to ${player.name} (${reason}). New balance is ${cash}.`);
    } else if (moneytype == 'bank') {
        let bank = player.getMeta('money:bank') as number;
        if (bank !== undefined) {
            bank -= amount;
        } else {
            return;
        }
        player.setMeta('money:bank', bank);
        alt.log(`[Money] Remove ${amount} bank to ${player.name} (${reason}). New balance is ${bank}.`);
    } else if (moneytype == 'crypto') {
        let crypto = player.getMeta('money:crypto') as number;
        if (crypto !== undefined) {
            crypto -= amount;
        } else {
            return;
        }
        player.setMeta('money:crypto', crypto);
        alt.log(`[Money] Remove ${amount} crypto to ${player.name} (${reason}). New balance is ${crypto}.`);
    } else {
        return;
    }
    alt.emitClient(player, 'hud:client:UpdateMoney', moneytype, amount, true);
    alt.emitClient(player, 'trcore:client:UpdateMoney', moneytype, amount, "remove", reason);
}

/**
 * Sets the specified amount of money for the given player's balance.
 * 
 * @param player - The player to set the money for. 
 * @param moneytype - The type of money to set ('cash', 'bank', 'crypto').
 * @param amount - The amount of money to set.
 * @param reason - The reason for setting the money.
 */
function SetMoney(player: alt.Player, moneytype: ('cash' | 'bank' | 'crypto'), amount: number, reason: string) {
    if (moneytype == 'cash') {
        player.deleteMeta('money:cash');
        player.setMeta('money:cash', amount);
        alt.log(`[Money] Set ${amount} cash to ${player.name} (${reason}).`);
    } else if (moneytype == 'bank') {
        player.deleteMeta('money:bank');
        player.setMeta('money:bank', amount);
        alt.log(`[Money] Set ${amount} bank to ${player.name} (${reason}).`);
    } else if (moneytype == 'crypto') {
        player.deleteMeta('money:crypto');
        player.setMeta('money:crypto', amount);
        alt.log(`[Money] Set ${amount} crypto to ${player.name} (${reason}).`);
    } else {
        return;
    }
    alt.emit('hud:client:UpdateMoney', player, moneytype, amount, false);
    alt.emit('trcore:client:UpdateMoney', player, moneytype, amount, "set", reason);
}


/**
 * Gets the specified type of money for the given player.
 * 
 * @param player - The player to get the money for. 
 * @param moneytype - The type of money to get ('cash', 'bank', 'crypto').
 * @returns The amount of the specified moneytype for the player, or 0 if not defined.
 */
function GetMoney(player: alt.Player, moneytype: ('cash' | 'bank' | 'crypto')) {
    if (moneytype == 'cash') {
        let cash = player.getMeta('money:cash') as number;
        if (cash !== undefined) {
            return cash;
        } else {
            return;
        }
    } else if (moneytype == 'bank') {
        let bank = player.getMeta('money:bank') as number;
        if (bank !== undefined) {
            return bank;
        } else {
            return;
        }
    } else if (moneytype == 'crypto') {
        let crypto = player.getMeta('money:crypto') as number;
        if (crypto !== undefined) {
            return crypto;
        } else {
            return;
        }
    } else {
        return;
    }
}

/**
 * Gets the gender of the given player.
 * 
 * @param player - The player to get the gender for.
 * @returns The gender of the player, or undefined if not set.
 */
function GetPlayerGender(player: alt.Player) {
    let gender = player.getMeta('gender') as string;
    if (gender !== undefined) {
        return gender;
    } else {
        return;
    }

}

/**
 * Sets the gender for the given player.
 *
 * @param player - The player to set the gender for.
 * @param gender - The gender to set.
 */
function SetPlayerGender(player: alt.Player, gender: Gender) {
    player.setMeta('gender', gender);
}

/**
 * Sets the credit card number for the given player by storing it in a 'walletid' meta field.
 *  
 * @param player - The player to set the credit card number for.
 * @param cardnumber - The credit card number to set.
 */
function SetCreditCard(player: alt.Player, cardnumber: string) {
    player.setMeta('walletid', cardnumber);
}

function GetCardSlot(player: alt.Player, cardtype:string) {
    // TODO: get inventory slot func
}

function SavePlayer(player: alt.Player) {
    // TODO: save logic
}


/**
 * Exports player utility functions from the player module.
 * 
 * Includes functions for:
 * - Setting and getting a player's job
 * - Setting and getting a player's gang 
 * - Adding/removing player money
 * - Setting a player's credit card number
 * - Getting a player's inventory card slots
 * - Saving player data
 */
export {
    HasPlayerPermission,
    setJob,
    ResetJob,
    GetJob,
    ToggleDuty,
    SetGang,
    ResetGang,
    GetGang,
    AddMoney,
    RemoveMoney,
    SetMoney,
    GetMoney,
    GetPlayerGender,
    SetPlayerGender,
    SetCreditCard,
    GetCardSlot,
    SavePlayer
}