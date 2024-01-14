/// <reference types="@altv/types-client" />

import * as alt from 'alt-client';

alt.on('resourceStart', () => {
    alt.log('[tr-core] Client resource has started.');
})

alt.on('resourceStop', () => {
    alt.log('[tr-core] Client resource has stopped.');
})