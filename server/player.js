/// <reference types="@altv/types-server" />

import * as alt from 'alt-server';
import { GetIdentifier, trcoreFunctionsGetIdentifier } from './functions.js';
import { execute } from './../../mysql/mysql.js';
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

export function CreatePlayer(player: PlayerData, citizenid: string)
{
    let ply = PlayerData.all.find(Player => ply.citzenid == citizenid);
    if (player.ping >= 0) {
        //player.charinfo.
        return player;
    }
    return null;
}




class PlayerData extends alt.Player {
    player;
    citizenid;
    //public discordID: string;
    //public name: string;
    cid;
    money= {
        cash,
        bank,
        crypto
    }
    charinfo= {
        firstname,
        lastname,
        brtihday,
        gender,
        backstory,
        nationality,
        phone,
        bankaccount
    }
    
    public metadata: {
        hunger: number;
        thirst: number;
        stress: number;
        isdead: boolean;
        inlaststand: boolean;
        armor: number;
        ishandcuffed: boolean;
        tracker: boolean;
        isarrested: boolean;
        isjailed: boolean;
        jailitems: Array<any>;
        status: string;
        phone: Array<any>;
        fitbit: Array<any>;
        commandbinds: Array<any>;
        bloodtype: string;
        dealerrep: number;
        craftingrep: number;
        attachmentcraftingrep: number;
        currentapartment: any;
        jobrep: Array<any>;
        jobreptow: Array<any>;
        jobreptrucker: Array<any>;
        jobreptaxi: Array<any>;
        jobrephotdog: Array<any>;
        callsign: string;
        fingerprint: string;
        walletid: string;
        criminalrecord: Array<any>;
        license: {
            driver: boolean;
            business: boolean;
            weapon: boolean;
        };
        inside: {
            house: boolean;
            appartment: {
                apartmentType: string;
                apartmentId: number;
            }
        }
        phonedata: {
            SerialNumber: string;
            InstalledApps: Array<any>;
        }
    }
    public Job: {
        jobname: string;
        joblabel: string;
        jobpayment: number;
        jobtype: string;
        jobonduty: boolean;
        jobisboss: boolean;
        jobgrade: {
            name: string;
            level: number;
            extrasallery: Array<string>;
        }
    }

    public Gang: {
        gangname: string;
        ganglabel: string;
        gangisboss: boolean;
        ganggrade: {
            name: string;
            level: string;
        }
    }
    public Position: {
        x: number;
        y: number;
        z: number;
        heading: number;
    };
    public Inventory: Array<any>;

    public permission: number;
    public static readonly all: readonly PlayerData[];

    /**
     * Constructor for Player class instances.
     *
     * @param {alt.Player} player - The alt.js Player instance that this Player class instance represents.
     */
    constructor(player) {
        super();
        this.player = player;
        this.citizenid = '';
        this.cid = 0;
        this.money = {
            cash: 80,
            bank: 250,
            crypto: 0
        };
        this.charinfo = {
            firstname: "Firstname",
            lastname: "Lastname",
            brtihday: new Date(1900, 0, 1),
            gender: Gender.Unknown,
            backstory: "",
            nationality: "",
            phone: 0,
            bankaccount: ""
        };
        
        this.Position = {
            x: 0,
            y: 0,
            z: 0,
            heading: 0
        };
        this.metadata = {
            hunger: 100,
            thirst: 100,
            stress: 0,
            isdead: false,
            inlaststand: false,
            armor: 0,
            ishandcuffed: false,
            tracker: false,
            isarrested: false,
            isjailed: false,
            jailitems: [],
            status: '',
            phone: [],
            fitbit: [],
            commandbinds: [],
            bloodtype: '',
            dealerrep: 0,
            craftingrep: 0,
            attachmentcraftingrep: 0,
            currentapartment: null,
            jobrep: [],
            jobreptow: [],
            jobreptrucker: [],
            jobreptaxi: [],
            jobrephotdog: [],
            callsign: '',
            fingerprint: '',
            walletid: '',
            criminalrecord: [],
            license: {
                driver: true,
                business: false,
                weapon: false
            },
            inside: {
                house: false,
                appartment: {
                    apartmentType: '',
                    apartmentId: 0
                }
            },
            phonedata: {
                SerialNumber: '',
                InstalledApps: []
            }
        };
        this.Job = {
            jobname: '',
            joblabel: '',
            jobpayment: 0,
            jobtype: '',
            jobonduty: false,
            jobisboss: false,
            jobgrade: {
                name: '',
                level: 0,
                extrasallery: []
            }
        };
        this.Gang = {
            gangname: '',
            ganglabel: '',
            gangisboss: false,
            ganggrade: {
                name: '',
                level: ''
            }
        }
        this.Inventory = []; 
        this.permission = Permissions.Player;
    }


    /**
     * Sets the player's current job details.
     * 
     * @param jobname - The name identifier of the job.
     * @param joblabel - The display label of the job. 
     * @param jobpayment - The base payment amount for the job.
     * @param jobtype - The type of job.
     * @param jobonduty - Whether the player is on duty.
     * @param jobisboss - Whether the player is the boss of the job.
     * @param jobgrade - The job grade object containing name, level, and extra salaries.
     */
    SetJob(jobname: string, joblabel: string, jobpayment: number, jobtype: string, jobonduty: boolean, jobisboss: boolean, jobgrade: { name: string, level: number, extrasallery: Array<string> }) {
        jobname = jobname.toLowerCase();
        this.Job.jobname = jobname;
        this.Job.joblabel = joblabel;
        this.Job.jobpayment = jobpayment;
        this.Job.jobtype = jobtype;
        this.Job.jobonduty = jobonduty;
        this.Job.jobisboss = jobisboss;
        this.Job.jobgrade.name = jobgrade.name;
        this.Job.jobgrade.level = jobgrade.level;
        this.Job.jobgrade.extrasallery = jobgrade.extrasallery;
    }

    /**
     * Resets the player's current job details to empty values.
     */
    ResetJob() {
        this.Job.jobname= '';
        this.Job.joblabel= '';
        this.Job.jobpayment= 20,
        this.Job.jobtype= '';
        this.Job.jobonduty= false;
        this.Job.jobisboss= false;
        this.Job.jobgrade.name = '';
        this.Job.jobgrade.level = 0;
        this.Job.jobgrade.extrasallery = [];
    }

    /**
     * Sets the player's gang details.
     *
     * @param gangname - The name identifier of the gang. 
     * @param ganglabel - The display label of the gang.
     * @param gangisboss - Whether the player is the boss of the gang.
     * @param ganggrade - The gang grade object containing name and level.
     */

    SetGang(gangname: string, ganglabel: string, gangisboss: boolean, ganggrade: { name: string, level: string }) {
        gangname = gangname.toLowerCase();
        this.Gang.gangname = gangname;
        this.Gang.ganglabel = ganglabel;
        this.Gang.gangisboss = gangisboss;
        this.Gang.ganggrade.name = ganggrade.name;
        this.Gang.ganggrade.level = ganggrade.level;
    }

    /**
     * Resets the player's gang details to empty values.
     */
    ResetGang() {
        this.Gang.gangname = '';
        this.Gang.ganglabel = '';
        this.Gang.gangisboss = false;
        this.Gang.ganggrade.name = '';
        this.Gang.ganggrade.level = '';
    }

    /**
     * Adds money of the specified type to the player.
     * 
     * @param moneytype - The type of money to add ('cash', 'bank', 'crypto')
     * @param amount - The amount of money to add 
     * @param reason - The reason for adding the money
    */
    AddMoney(moneytype: ('cash' | 'bank' | 'crypto'), amount: number, reason: string) {
        if (moneytype == 'cash') {
            this.money.cash += amount;
            alt.log(`[Money] Added ${amount} cash to ${this.name} (${reason}). New balance is ${this.money.cash}.`);
        } else if (moneytype == 'bank') {
            this.money.bank += amount;
            alt.log(`[Money] Added ${amount} bank to ${this.name} (${reason}). New balance is ${this.money.bank}.`);
        } else if (moneytype == 'crypto') {
            this.money.crypto += amount;
            alt.log(`[Money] Added ${amount} crypto to ${this.name} (${reason}). New balance is ${this.money.crypto}.`);
        } else {
            return;
        }
        alt.emit('hud:client:UpdateMoney', this.player, moneytype, amount, false);
        alt.emit('trcore:client:UpdateMoney', this.player, moneytype, amount, "add", reason);
        

    }

    /**
     * Removes money of the specified type from the player.
     * 
     * @param moneytype - The type of money to remove ('cash', 'bank', 'crypto')
     * @param amount - The amount of money to remove
     * @param reason - The reason for removing the money
    */
    RemoveMoney(moneytype: ('cash' | 'bank' | 'crypto'), amount: number, reason: string) {
        if (moneytype == 'cash') {
            this.money.cash -= amount;
            alt.log(`[Money] Added ${amount} cash to ${this.name} (${reason}). New balance is ${this.money.cash}.`);
        } else if (moneytype == 'bank') {
            this.money.bank -= amount;
            alt.log(`[Money] Added ${amount} bank to ${this.name} (${reason}). New balance is ${this.money.bank}.`);
        } else if (moneytype == 'crypto') {
            this.money.crypto -= amount;
            alt.log(`[Money] Added ${amount} crypto to ${this.name} (${reason}). New balance is ${this.money.crypto}.`);
        } else {
            return;
        }
        alt.emit('hud:client:UpdateMoney', this.player, moneytype, amount, true);
        alt.emit('trcore:client:UpdateMoney', this.player, moneytype, amount, "remove", reason);

    }

    /**
     * Sets the player's money balance of the specified type.
     * 
     * @param moneytype - The type of money to set ('cash', 'bank', 'crypto')
     * @param amount - The amount to set the balance to
     * @param reason - The reason for setting the balance
    */
    SetMoney(moneytype: ('cash' | 'bank' | 'crypto'), amount: number, reason: string) {
        if (moneytype == 'cash') {
            this.money.cash = amount;
            alt.log(`[Money] Added ${amount} cash to ${this.name} (${reason}). New balance is ${this.money.cash}.`);
        } else if (moneytype == 'bank') {
            this.money.bank = amount;
            alt.log(`[Money] Added ${amount} bank to ${this.name} (${reason}). New balance is ${this.money.bank}.`);
        } else if (moneytype == 'crypto') {
            this.money.crypto = amount;
            alt.log(`[Money] Added ${amount} crypto to ${this.name} (${reason}). New balance is ${this.money.crypto}.`);
        } else {
            return;
        }
        alt.emit('hud:client:UpdateMoney', this.player, moneytype, amount, false);
        alt.emit('trcore:client:UpdateMoney', this.player, moneytype, amount, "set", reason);
    }

    /**
     * Gets the player's current money balance for the specified type.
     *
     * @param moneytype - The type of money to get the balance for ('cash', 'bank', 'crypto')
     * @returns The balance amount, or null if invalid moneytype
     */
    GetMoney(moneytype: ('cash' | 'bank' | 'crypto')) {
        if (moneytype == 'cash') {
            return this.money.cash;
        } else if (moneytype == 'bank') {
            return this.money.bank;
        } else if (moneytype == 'crypto') {
            return this.money.crypto;
        } else {
            return null;
        }
    }

    /**
     * Sets the player's credit card number.
     *
     * @param cardnumber - The credit card number to set
     */
    SetCreditCard(cardnumber: string) {
        this.metadata.walletid = cardnumber;
    }

    /**
     * Gets the index of the player's credit card in their inventory
     * that matches the provided card number and type.
     * @param cardnumber - The credit card number to search for
     * @param cardtype - The type of credit card to search for
     */
    GetCardSlot(cardnumber: string, cardtype: string) {
        cardtype = cardtype.toLowerCase();
        // Inventory Func
    }

    /**
     * Saves the player's data to the database.
     */
    Save() {
        // Save Func
    }

    Login(player: PlayerData, citizenid: string, newData: any) {
        if (player!= null) {
            if (citizenid){
                let license = GetIdentifier(player);
                let plydata = execute(`SELECT * FROM players where citizenid = '${citizenid}'`);
                let PlayerData = plydata
                if (PlayerData && license == player.discordID){
                    plydata.
                }
            }
            else{
                //DropPlayer(player, Lang:t(info.exploit_dropped))
                alt.emit('tr-log:server:CreateLog', 'anticheat', 'white', player.name + ' Has Been Dropped For Character Joining Exploit', false)
            }
        }
        else
        {

        }
    }

    /**
     * Logs the player out, saving their data and 
     * transitioning them back to the character 
     * selection screen.
     */
    Logout() {
        // Logout Func and go  to char selction
    }

    /**
     * Registers a method handler on the player instance.
     * 
     * @param methodName - The name of the method to register the handler for
     * @param handler - The handler function to call when the method is invoked
     */
    AddMetheod(methodName: string, handler: Function) {
        this[methodName] = handler;
    }
    
    /**
     * Adds a field and associated data to the player data object.
     * 
     * @param fieldName - The name of the field to add.
     * @param data - The data to associate with the field.
     */
    AddField(fieldName: string, data: any) {
        this[fieldName] = data;
    }

}


function SavePlayerData(player: PlayerData) {
    let ped = player.player
    let pcoords = ped.pos;
    let playerData = player;
    if (playerData) {

    }
}




/**
 * Exports the PlayerData class.
 */
export {
    PlayerData,
    SavePlayerData
}