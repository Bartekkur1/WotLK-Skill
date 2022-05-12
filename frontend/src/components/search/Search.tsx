import { FC, useState } from 'react';
import { httpClient } from '../../httpClient';
import config from '../../config.json';

import { Player } from '../../types';

export const Search: FC = () => {

    const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined);
    const [players, setPlayers] = useState<Player[]>([]);

    const handleInput = (name: string) => {

        const timeout = setTimeout(async () => {
            if (name.length === 0) {
                return setPlayers([]);
            }

            try {
                const { appUrl, routes } = config;
                const url = appUrl + routes.searchPlayers + name;
                const res = await httpClient.get(url);
                setPlayers(res.data as Player[]);
            } catch (err) {
                console.log(err);
            }
        }, 500);

        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        setTimeoutId(timeout as unknown as number);
    };

    return (
        <div>
            <input onChange={e => {
                handleInput(e.currentTarget.value);
                // setName(e.currentTarget.value);
            }} type={"text"} placeholder={"Player name"} list={"suggestions"} />
            <div>
                {players.map(({ id, name, realm }) => {
                    return (
                        <div key={id}>
                            <p>{name} - {realm}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};