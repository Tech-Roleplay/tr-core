
const ForceJobDefaultDutyAtLogin = true;
const JobsStatus = false;
const Jobs = {
    "unemployed": {
        label: 'Civilian',
        defaultDuty: true,
        offDutyPay: false,
        grades: {
            '0': {
                name: 'Freelancer',
                payment: 10
            }
        }
    },
    "lspd": {
        label: 'Los Santos Police Department',
        type: "leo",
        defaultDuty: true,
        offDutyPay: true,
        grades: {
            '0': {
                name: 'Recruit',
                payment: 4500
            },
            '1': {
                name: 'Officer I (Rookie)',
                payment: 5000
            },
            '2': {
                name: 'Officer II',
                payment: 6080
            },
            '3': {
                name: 'Officer III',
                payment: 6800
            },
            '4': {
                name: 'Sergant I',
                payment: 7500
            },
            '5': {
                name: 'Detective I',
                payment: 7500
            },
            '6': {
                name: 'Detective II',
                payment: 8000
            },
            '7': {
                name: 'Sergant II',
                payment: 8300
            },
            '8': {
                name: 'Detective III',
                payment: 8300
            },
            '9': {
                name: 'Lieutenant I',
                payment: 8500
            },
            '10': {
                name: 'Lieutenant II',
                payment: 8700
            },
            '11': {
                name: 'Captain I',
                payment: 9000
            },
            '12': {
                name: 'Captain II',
                payment: 9200
            },
            '13': {
                name: 'Captain III',
                payment: 9400
            },
            '14': {
                name: 'Commander',
                isboss: true,
                payment: 10000
            },
            '15': {
                name: 'Deputy Chief',
                isboss: true,
                payment: 11000
            },
            '16': {
                name: 'Assistant Chief',
                isboss: true,
                payment: 12000
            },
            '17': {
                name: 'Chief of Police',
                isboss: true,
                payment: 13000
            }
        }
    },
    "lssd": {
        label: 'Los Santos Sheriff Department',
        type: 'leo',
        defaultDuty: true,
        offDutyPay: false,
        grades: {
            '0': {
                name: 'Recruit',
                payment: 0
            },
            '1': {
                name: 'Deputy Sheriff',
                payment: 5000
            },
            '2': {
                name: 'Sergant',
                payment: 6500
            },
            '3': {
                name: 'Lieutenant',
                payment: 7500
            },
            '4': {
                name: 'Captain',
                payment: 8500
            },
            '5': {
                name: 'Commander',
                isboss: true,
                payment: 9250
            },
            '6': {
                name: 'Division Chief',
                isboss: true,
                payment: 10000
            },
            '7': {
                name: 'Assistant Sheriff',
                isboss: true,
                payment: 11000
            },
            '8': {
                name: 'Undersheriff',
                isboss: true,
                payment: 12000
            },
            '9': {
                name: 'Sheriff',
                isboss: true,
                payment: 13000
            }
        }
    },
    "bcsd": {
        label: 'Blaine County Sheriff Department',
        type: 'leo',
        defaultDuty: true,
        offDutyPay: false,
        grades: {
            '0': {
                name: 'Recruit',
                payment: 0
            },
            '1': {
                name: 'Deputy Sheriff',
                payment: 5000
            },
            '2': {
                name: 'Sergeant',
                payment: 6500
            },
            '3': {
                name: 'Lieutenant',
                payment: 7500
            },
            '4': {
                name: 'Captain',
                payment: 8500
            },
            '5': {
                name: 'Commander',
                isboss: true,
                payment: 9250
            },
            '6': {
                name: 'Division Sheriff',
                isboss: true,
                payment: 10000
            },
            '7': {
                name: 'Assistant Sheriff',
                isboss: true,
                payment: 11000
            },
            '8': {
                name: 'Undersheriff',
                isboss: true,
                payment: 12000
            },
            '9': {
                name: 'Sheriff',
                isboss: true,
                payment: 13000
            }
        }
    },
    "pbpd": {
        label: 'Paleto Bay Police Department',
        type: 'leo',
        defaultDuty: true,
        offDutyPay: false,
        grades: {
            '0': {
                name: 'Recruit',
                payment: 0
            },
            '1': {
                name: 'Deputy Sheriff',
                payment: 5000
            },
            '2': {
                name: 'Sergeant',
                payment: 6500
            },
            '3': {
                name: 'Lieutenant',
                payment: 7500
            },
            '4': {
                name: 'Captain',
                payment: 8500
            },
            '5': {
                name: 'Commander',
                isboss: true,
                payment: 9250
            },
            '6': {
                name: 'Division Chief',
                isboss: true,
                payment: 10000
            },
            '7': {
                name: 'Assistant Sheriff',
                isboss: true,
                payment: 11000
            },
            '8': {
                name: 'Undersheriff',
                isboss: true,
                payment: 12000
            },
            '9': {
                name: 'Sheriff',
                isboss: true,
                payment: 13000
            }
        }
    },
    "lcpd": {
        label: 'Liberty City Police Department',
        type: 'leo',
        defaultDuty: true,
        offDutyPay: false,
        grades: {
            '1': {
                name: 'Recruit Officer',
                payment: 4000
            },
            '2': {
                name: 'Police Officer',
                payment: 5000
            },
            '3': {
                name: 'Detective I',
                payment: 6500
            },
            '4': {
                name: 'Detective II',
                payment: 7000
            },
            '5': {
                name: 'Detective III',
                payment: 7500
            },
            '6': {
                name: 'Sergeant',
                payment: 7500
            },
            '7': {
                name: 'Lieutenant',
                payment: 8000
            },
            '8': {
                name: 'Captain',
                payment: 8500
            },
            '9': {
                name: 'Deputy Inspector',
                payment: 9000
            },
            '10': {
                name: 'Inspector',
                isboss: true,
                payment: 9500
            },
            '11': {
                name: 'Deputy Chief',
                isboss: true,
                payment: 10000
            },
            '12': {
                name: 'Assistant Chief',
                isboss: true,
                payment: 10500
            },
            '13': {
                name: 'Bureau Chief',
                isboss: true,
                payment: 11000
            },
            '14': {
                name: 'Deputy Commissioner',
                isboss: true,
                payment: 11500
            },
            '15': {
                name: 'Chief of Department',
                isboss: true,
                payment: 12000
            },
            '16': {
                name: 'First Deputy Commissioner',
                isboss: true,
                payment: 12500
            },
            '17': {
                name: 'Police Commissioner',
                isboss: true,
                payment: 13000
            }
        }
    },
    "apd": {
        label: 'Alderney Police Department',
        type: 'leo',
        defaultDuty: true,
        offDutyPay: false,
        grades: {
            '1': {
                name: 'Recruit Officer',
                payment: 4000
            },
            '2': {
                name: 'Police Officer',
                payment: 5000
            },
            '3': {
                name: 'Detective I',
                payment: 6500
            },
            '4': {
                name: 'Detective II',
                payment: 7000
            },
            '5': {
                name: 'Detective III',
                payment: 7500
            },
            '6': {
                name: 'Sergeant',
                payment: 7500
            },
            '7': {
                name: 'Lieutenant',
                payment: 8000
            },
            '8': {
                name: 'Captain',
                payment: 8500
            },
            '9': {
                name: 'Deputy Inspector',
                payment: 9000
            },
            '10': {
                name: 'Inspector',
                isboss: true,
                payment: 9500
            },
            '11': {
                name: 'Deputy Chief',
                isboss: true,
                payment: 10000
            },
            '12': {
                name: 'Assistant Chief',
                isboss: true,
                payment: 10500
            },
            '13': {
                name: 'Bureau Chief',
                isboss: true,
                payment: 11000
            },
            '14': {
                name: 'Deputy Commissioner',
                isboss: true,
                payment: 11500
            },
            '15': {
                name: 'Chief of Department',
                isboss: true,
                payment: 12000
            },
            '16': {
                name: 'First Deputy Commissioner',
                isboss: true,
                payment: 12500
            },
            '17': {
                name: 'Police Commissioner',
                isboss: true,
                payment: 13000
            }
        }
    },
    "sasp": {
        label: 'San Andreas State Police',
        type: 'leo',
        defaultDuty: true,
        offDutyPay: false,
        grades: {
            '0': {
                name: 'Recruit Officer',
                payment: 4000
            },
            '1': {
                name: 'Trooper',
                payment: 5000
            },
            '2': {
                name: 'Corporal',
                payment: 6000
            },
            '3': {
                name: 'Sergeant',
                payment: 6500
            },
            '4': {
                name: 'Lieutenant',
                payment: 7500
            },
            '5': {
                name: 'Captain',
                payment: 8500
            },
            '6': {
                name: 'Commander',
                isboss: true,
                payment: 9250
            },
            '7': {
                name: 'Deputy Chief',
                isboss: true,
                payment: 10000
            },
            '8': {
                name: 'Assistant Chief',
                isboss: true,
                payment: 11000
            },
            '9': {
                name: 'Chief of the San Andreas State Police',
                isboss: true,
                payment: 12000
            }
        }
    },
    "sapr": {
        label: 'San Andreas Park Ranger',
        type: 'leo',
        defaultDuty: true,
        offDutyPay: false,
        grades: {
            '0': {
                name: 'Recruit Officer',
                payment: 4000
            },
            '1': {
                name: 'Ranger',
                payment: 6000
            },
            '2': {
                name: 'Senior Ranger',
                payment: 7000
            },
            '3': {
                name: 'Supervisor',
                payment: 8000
            },
            '4': {
                name: 'Division Chief',
                isboss: true,
                payment: 9000
            },
            '5': {
                name: 'Deputy Director',
                isboss: true,
                payment: 10000
            },
            '6': {
                name: 'Director',
                isboss: true,
                payment: 11000
            }
        }
    },
    "sahp": {
        label: 'San Andreas Highway Patrol',
        type: 'leo',
        defaultDuty: true,
        offDutyPay: false,
        grades: {
            '0': {
                name: 'Recruit Officer',
                payment: 4000
            },
            '1': {
                name: 'Trooper',
                payment: 5000
            },
            '2': {
                name: 'Corporal',
                payment: 6000
            },
            '3': {
                name: 'Sergeant',
                payment: 6500
            },
            '4': {
                name: 'Lieutenant',
                payment: 7500
            },
            '5': {
                name: 'Captain',
                payment: 8500
            },
            '6': {
                name: 'Commander',
                isboss: true,
                payment: 9250
            },
            '7': {
                name: 'Deputy Chief',
                isboss: true,
                payment: 10000
            },
            '8': {
                name: 'Assistant Chief',
                isboss: true,
                payment: 11000
            },
            '9': {
                name: 'Chief of the San Andreas Highway Patrol',
                isboss: true,
                payment: 12000
            }
        }
    },
    "lsp": {
        label: 'Liberty State Police',
        type: 'leo',
        defaultDuty: true,
        offDutyPay: false,
        grades: {
            '0': {
                name: 'Recruit Officer',
                payment: 4000
            },
            '1': {
                name: 'Trooper',
                payment: 5000
            },
            '2': {
                name: 'Corporal',
                payment: 6000
            },
            '3': {
                name: 'Sergeant',
                payment: 6500
            },
            '4': {
                name: 'Lieutenant',
                payment: 7500
            },
            '5': {
                name: 'Captain',
                payment: 8500
            },
            '6': {
                name: 'Commander',
                isboss: true,
                payment: 9250
            },
            '7': {
                name: 'Deputy Chief',
                isboss: true,
                payment: 10000
            },
            '8': {
                name: 'Assistant Chief',
                isboss: true,
                payment: 11000
            },
            '9': {
                name: 'Chief of the Liberty State Police',
                isboss: true,
                payment: 12000
            }
        }
    },
    "lspr": {
        label: 'Liberty State Park Ranger',
        type: 'leo',
        defaultDuty: true,
        offDutyPay: false,
        grades: {
            '0': {
                name: 'Recruit Officer',
                payment: 4000
            },
            '1': {
                name: 'Ranger',
                payment: 6000
            },
            '2': {
                name: 'Senior Ranger',
                payment: 7000
            },
            '3': {
                name: 'Supervisor',
                payment: 8000
            },
            '4': {
                name: 'Division Chief',
                isboss: true,
                payment: 9000
            },
            '5': {
                name: 'Deputy Director',
                isboss: true,
                payment: 10000
            },
            '6': {
                name: 'Director',
                isboss: true,
                payment: 11000
            }
        }
    },
    "lshp": {
        label: 'Liberty State Highway Patrol',
        type: 'leo',
        defaultDuty: true,
        offDutyPay: false,
        grades: {
            '0': {
                name: 'Recruit Officer',
                payment: 4000
            },
            '1': {
                name: 'Trooper',
                payment: 5000
            },
            '2': {
                name: 'Corporal',
                payment: 6000
            },
            '3': {
                name: 'Sergeant',
                payment: 6500
            },
            '4': {
                name: 'Lieutenant',
                payment: 7500
            },
            '5': {
                name: 'Captain',
                payment: 8500
            },
            '6': {
                name: 'Commander',
                isboss: true,
                payment: 9250
            },
            '7': {
                name: 'Deputy Chief',
                isboss: true,
                payment: 10000
            },
            '8': {
                name: 'Assistant Chief',
                isboss: true,
                payment: 11000
            },
            '9': {
                name: 'Chief of the San Andreas Highway Patrol',
                isboss: true,
                payment: 12000
            }
        }
    },
    "fib": {
        label: 'Federal Invenstigation Bureau',
        type: 'leo',
        defaultDuty: true,
        offDutyPay: false,
        grades: {
            '0': {
                name: 'Tranee',
                payment: 4000
            },
            '1': {
                name: 'Agent',
                payment: 7500
            },
            '2': {
                name: 'Special Agent',
                payment: 8500
            },
            '3': {
                name: 'Assistant Director',
                isboss: true,
                payment: 10000
            },
            '4': {
                name: 'Deputy Director',
                isboss: true,
                payment: 11000
            },
            '5': {
                name: 'Director of the Federal Invenstigation Bureau',
                isboss: true,
                payment: 12000
            }
        }
    },
    "noose": {
        label: 'National Office of Security Enforcement',
        type: 'leo',
        defaultDuty: true,
        offDutyPay: false,
        grades: {
            '0': {
                name: 'Bomb Squad Officer',
                payment: 8500
            },
            '1': {
                name: 'Aviation Officer',
                payment: 8500
            },
            '2': {
                name: 'Investigator',
                payment: 8500
            },
            '3': {
                name: 'Field Agent',
                payment: 8500
            },
            '4': {
                name: 'Supervisory Agent',
                payment: 9500
            },
            '5': {
                name: 'Field Supervisor',
                payment: 10000
            },
            '6': {
                name: 'Sector Chief',
                isboss: true,
                payment: 11000
            },
            '7': {
                name: 'Deputy Commissioner',
                isboss: true,
                payment: 12000
            },
            '8': {
                name: 'Commissioner of the National Office of Security Enforcement',
                isboss: true,
                payment: 13000
            }
        }
    },
    "ambulance": {
        label: 'EMS',
        type: 'ems',
        defaultDuty: true,
        offDutyPay: true,
        grades: {
            '0': {
                name: 'Recruit',
                payment: 5000
            },
            '1': {
                name: 'Paramedic',
                payment: 7500
            },
            '2': {
                name: 'Doctor',
                payment: 9000
            },
            '3': {
                name: 'Surgeon',
                payment: 11000
            },
            '4': {
                name: 'Chief of the Medical Emergency Service',
                isboss: true,
                payment: 13000
            }
        }
    },
    'firefighter': {
        label: 'Firefighter',
        type: 'ems',
        defaultDuty: true,
        offDutyPay: true,
        grades: {
            '0': {
                name: 'Recruit',
                payment: 5000
            },
            '1': {
                name: 'Firefighter',
                payment: 7500
            },
            '2': {
                name: 'Lieutenant',
                payment: 9000
            },
            '3': {
                name: 'Captain',
                payment: 11000
            },
            '4': {
                name: 'Chief of the Firefighter Emergency Service',
                isboss: true,
                payment: 13000
            }
        }
    },
    "realestate": {
        label: 'Real Estate',
        defaultDuty: true,
        offDutyPay: false,
        grades: {
            '0': {
                name: 'Recruit',
                payment: 5000
            },
            '1': {
                name: 'House Sales',
                payment: 7500
            },
            '2': {
                name: 'Business Sales',
                payment: 9000
            },
            '3': {
                name: 'Broker',
                payment: 11000
            },
            '4': {
                name: 'Manager',
                payment: 13000
            }
        }
    }
    // more jobs here
};


