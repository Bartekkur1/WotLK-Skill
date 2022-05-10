export interface CountQueryResult {
    count: string;
}

export interface User {
    id: string;
    username: string;
    avatar: string;
    locale: string;
}

export interface Rating {
    id: string;
    player: string;
    author: string;
    mechanics: number;
    performance: number;
    communication: number;
    comment: string;
}

export const realms = <const>[
    "Frostmourne",
    "Lordaeron",
    "Icecrown",
    "Blackrock"
];

export type Realm = typeof realms[number];

export interface Player {
    id: string;
    name: string;
    realm: Realm;
}