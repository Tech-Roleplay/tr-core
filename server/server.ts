/// <reference types="@altv/types-server" />

import * as alt from 'alt-server';
import { Permissions, PlayerData } from './player.js';
import { trcoreFunctionsGetIdentifier } from './functions.js';
import { addCommand } from './commands.js';





alt.on('resourceStart', () => {
    let sv_version = "0.0.1";
    alt.log('Core started.');
    alt.log('Server version:' + sv_version)
    let debugmode = alt.getServerConfig().debug;
    if (debugmode) {
        alt.logWarning('Debug mode enabled.');
    }
    
    

})





alt.on('player:create', (player: PlayerData, citizenid: number) => {
    if (player) {
        let license = trcoreFunctionsGetIdentifier(player);
        let plydata = new PlayerData(player);
        
        alt.emitClient(player, 'player:create', license);
    }
});

alt.on('playerConnect', (player: PlayerData) => {

})


