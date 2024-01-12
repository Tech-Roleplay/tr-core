/// <reference types="@altv/types-server" />

import * as alt from 'alt-server';
import { PlayerData } from './player.js';
import { GetIdentifier } from './functions.js';






alt.on('resourceStart', () => {
    let sv_version = "0.0.1";
    alt.log('Core started.');
    alt.log('Server version:' + sv_version)
    let debugmode = alt.getServerConfig().debug;
    if (debugmode) {
        alt.logWarning('Debug mode enabled.');
    }
    import ("./commands.js");
    import ("./functions.js");
    import ("./events.js");
    import ("./player.js");
    

})





alt.on('player:create', (player: PlayerData, citizenid: number) => {
    if (player) {
        let license = GetIdentifier(player);
        let plydata = new PlayerData(player);
        
        alt.emitClient(player, 'player:create', license);
    }
});

alt.on('playerConnect', (player: PlayerData) => {

})


