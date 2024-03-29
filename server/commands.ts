/// <reference types="@altv/types-server" />
/// <reference types="@altv-vchat/types"/>

import * as alt from 'alt-server';
import * as chat from '../../chat/server/index.js';
import { HasPlayerPermission, Permissions, AddMoney, RemoveMoney, SetMoney, GetMoney, GetJob, setJob, ResetJob, SetGang, ResetGang, GetGang} from './player.js';
import { Permission } from 'alt-shared';





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
export function addCommand(player: alt.Player, commandname: string, desc: string, parameters: { name: string, description: string }, argsrequired: boolean, permission: number, callback: () => void) {



    // Check player permission
    if (HasPlayerPermission(player, permission)) {

        // Register the command and suggestion
        chat.registerCmd(commandname, callback);


    }

}


chat.registerCmd('help', (player: alt.Player, args: any) => {
    alt.log(`Help command called by ${player.name}`);
    chat.send(player, 'No help, xD ' + player.name);
})


chat.registerCmd('spawn', (player: alt.Player, args: any) => {
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

chat.registerCmd('tp', (player: alt.Player, x: number, y: number, z: number) => {
    if (HasPlayerPermission(player, Permissions.Admin)) {
        if (x && !y && !z) {
            let target = x
            let tagetplay: any = alt.Player.all.find(p => p.id == target)
            player.pos = tagetplay.pos;
        }
        if (x && y && z) {
            player.pos = new alt.Vector3(x, y, z)
        }
        else {
            alt.emitClient(player, 'trcore:Notify', "ARGS WRONG")
        }
    }

})

chat.registerCmd('tpm', (player: alt.Player) => {
    if (HasPlayerPermission(player, Permissions.Admin)) {
        alt.emitClient(player, 'trcore:GotoMarker')
    }
})

chat.registerCmd('togglepvp', (player: alt.Player) => {
    if (HasPlayerPermission(player, Permissions.Admin)) {
        // togglepvp
    }
})

chat.registerCmd('addpermission', (player: alt.Player, targetid: number, permission: number) => {
    if (HasPlayerPermission(player, Permissions.God)) {
        let tagetplay: any = alt.Player.all.find(p => p.id == targetid)
        tagetplay.permission = permission
        alt.log('')
    }
})

chat.registerCmd('removepermission', (player: alt.Player, targetid: number, permission: number) => {
    if(HasPlayerPermission(player, Permissions.God)) {
    let tagetplay: any = alt.Player.all.find(p => p.id == targetid)
    tagetplay.permission = Permissions.Player
    alt.log('')
}
})

// open & close


chat.registerCmd('car', (player: alt.Player, model: string) => {
    if (HasPlayerPermission(player, Permissions.Admin)) {
        alt.emit('trcore:Server:SpwanVehicle', player, model)
    }
})

chat.registerCmd('dv', (player: alt.Player) => {
    if (HasPlayerPermission(player, Permissions.Admin)) {
        player.vehicle?.destroy
    }
})

chat.registerCmd('dvall', (player: alt.Player) => {
    if (HasPlayerPermission(player, Permissions.Admin)) {
        alt.Vehicle.all.forEach(v => {v.destroy() })
    }
})

chat.registerCmd('dvp', (player: alt.Player) => {
    if (HasPlayerPermission(player, Permissions.Admin)) {
        alt.Ped.all.forEach(p => {p.destroy() })
    }
})

chat.registerCmd('dvo', (player: alt.Player) => {
    if (HasPlayerPermission(player, Permissions.Admin)) {
        alt.Object.all.forEach(o => {o.destroy() })
    }
})

chat.registerCmd('givemoney', (player: alt.Player, moneytype: string, amount: number, reason: string[]) => {
    if (HasPlayerPermission(player, Permissions.Admin)) {
        switch (moneytype) {
            case "cash": {
                AddMoney(player, moneytype, amount, reason.join(' '))
                break
            }
            case "bank": {
                AddMoney(player, moneytype, amount, reason.join(' '))
                break
            }
            case "crypto": {
                AddMoney(player, moneytype, amount, reason.join(' '))
                break
            }
        }
        
    }
})

chat.registerCmd('setmoney', (player: alt.Player, moneytype: string, amount: number, reason: string[]) => {
    if (HasPlayerPermission(player, Permissions.Admin)) {
        switch (moneytype) {
            case "cash": {
                SetMoney(player, moneytype, amount, reason.join(' '))
                break
            }
            case "bank": {
                SetMoney(player, moneytype, amount, reason.join(' '))
                break
            }
            case "crypto": {
                SetMoney(player, moneytype, amount, reason.join(' '))
                break
            }
        }

    }
})

chat.registerCmd('job', (player: alt.Player) => {
    let Job = GetJob(player);
    chat.send(player, `Your current job is ${Job.label} as ${Job.gradename}`);
})