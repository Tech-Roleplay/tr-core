//import * as alt from "alt-shared";

const MaxPlayers = 100; // max players
const sv_version = '0.0.1-alpha'; // version
const DefaultSpwan = Vector3(-1035.71, -2731.87, 12.86); // default spawn position
const UpdateInterval = 3; // how often updater player in minutes
const UpdateIntervalInMs = UpdateInterval * 60 * 1000; // how often updater player in milliseconds
const UpdateIntervalStatus = 5000; // how often to check hunger/thirst status in milliseconds

const MoneyStartAmount = {cash: 1250, bank: 20000, crypto: 0}; // money start amount
const MoneyPayCheckTimeOut = 10; // The time in minutes that it will give the paycheck
const MoneyPayCheckSociety = true; // If true paycheck will come from the society account that the player is employed at, requires tr-management
