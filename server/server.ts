/// <reference types="@altv/types-server" />

import * as alt from 'alt-server';
import { PlayerData } from './player.js';
import { GetIdentifier } from './functions.js';
import { sv_version } from './../config.js';







alt.on('resourceStart', () => {

    alt.log('[tr-core] Core started.');
    alt.log('[tr-core] Server version: ' + sv_version);
    let debugmode = alt.getServerConfig().debug;
    if (debugmode) {
        alt.logWarning('[tr-core] Debug mode enabled.');
    }
    import("./commands.js");
    import("./functions.js");
    import("./events.js");
    import("./player.js");


})


alt.on('player:create', (player: PlayerData, citizenid: number) => {
    if (player) {
        let license = GetIdentifier(player);
        
        alt.emitClient(player, 'player:create', license);
    }
});



alt.on('resourceStop', () => {
    alt.log('[tr-core] Core stopped.')

})
