let MaxPlayers: number = 100; // max players
let sv_version: string = '0.0.1-alpha'; // version
let DefaultSpwan: number[] = [-1035.71, -2731.87, 12.86]; // default spawn position
let UpdateInterval: number = 3; // how often updater player in minutes
let UpdateIntervalInMs: number = UpdateInterval * 60 * 1000; // how often updater player in milliseconds
let UpdateIntervalStatus: number = 5000; // how often to check hunger/thirst status in milliseconds
let tr_locale: string = 'en'; // default language

let MoneyStartAmount: { cash: number; bank: number; crypto: number } = { cash: 1250, bank: 20000, crypto: 0 }; // money start amount
let MoneyPayCheckTimeOut: number = 10; // The time in minutes that it will give the paycheck
let MoneyPayCheckSociety: boolean = true; // If true paycheck will come from the society account that the player is employed at, requires tr-management

let PlayerHungerRate: number = 4.2; // How fast the hunger will go down
let PlayerThirstRate: number = 3.2; // How fast the thirst will go down
let PlayerBloodType: string[] = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]; // Blood types

let ServerClosed: boolean = false; // If true the server will be closed
let ServerClosedReason: string = "Server is closed, more information see ..."; // The reason the server is closed
let ServerUptime: number = 0; // The server uptime in minutes
let ServerWhitelist: boolean = false; // If true the server will have a whitelist
let ServerWhitelistPlayers: string[] = []; // The players with the discord identifier that are whitelisted
let ServerPVP: boolean = true; // If true the server will have PVP
let ServerDiscord: string = "https://discord.gg/Gt4zhKc2s2"; // Discord invite link
let CheckDuplicateDiscordID: boolean = true; // If true the server will check if the discord id is already in use
// ServerPermission is defined in server/player.js

let CommandOOCColor: { r: number; g: number; b: number } = { r: 255, g: 151, b: 133 }; // RGB color code for the OOC command

let NotifyNotificationStyling: {
    group: boolean; // Allow notifications to stack with a badge instead of repeating
    position: string; // top-left | top-right | bottom-left | bottom-right | top | bottom | left | right | center
    progress: boolean; // Display Progress Bar
} = {
    group: true,
    position: "right",
    progress: true,
};

let NotifyVariantDefinitions: {
    [key: string]: {
        classes: string;
        icon: string;
    };
} = {
    success: {
        classes: "success",
        icon: "task_alt",
    },
    primary: {
        classes: "primary",
        icon: "notifications",
    },
    error: {
        classes: "error",
        icon: "warning",
    },
    police: {
        classes: "police",
        icon: "local_police",
    },
    ambulance: {
        classes: "ambulance",
        icon: "fas fa-ambulance",
    },
    firefighter: {
        classes: "firefighter",
        icon: "fas fa-fire-extinguisher",
    },
    mechanician: {
        classes: "mechanician",
        icon: "fas fa-wrench",
    },
    alert: {
        classes: "e-alert",
        icon: "fas da-triangle-exclamation",
    },
};

export {
    MaxPlayers,
    sv_version,
    DefaultSpwan,
    UpdateInterval,
    UpdateIntervalInMs,
    UpdateIntervalStatus,
    tr_locale,
    MoneyStartAmount,
    MoneyPayCheckTimeOut,
    MoneyPayCheckSociety,
    PlayerHungerRate,
    PlayerThirstRate,
    PlayerBloodType,
    ServerClosed,
    ServerClosedReason,
    ServerUptime,
    ServerWhitelist,
    ServerWhitelistPlayers,
    ServerPVP,
    ServerDiscord,
    CheckDuplicateDiscordID,
    CommandOOCColor,
    NotifyNotificationStyling,
    NotifyVariantDefinitions
};
