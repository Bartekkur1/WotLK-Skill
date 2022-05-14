import { FC, useState } from 'react';
import { httpClient } from '../../httpClient';
import config from '../../config.json';
import './search.css';

import { Player } from '../../types';
import { Hint } from '../hint/Hint';

export const Search: FC = () => {

    const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined);
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleInput = (name: string) => {

        const timeout = setTimeout(async () => {
            if (name.length === 0) {
                return setPlayers([]);
            }

            try {
                setLoading(true);
                const { appUrl, routes } = config;
                const url = appUrl + routes.searchPlayers + name;
                const res = await httpClient.get(url);
                setPlayers(res.data as Player[]);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }, 500);

        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        setTimeoutId(timeout as unknown as number);
    };

    const renderResults = () => {
        if (loading) {
            return <p className='loading'>Loading...</p>
        }
        return players.map(player => <Hint key={player.id} player={player} />);
    }

    return (
        <div className='search-container'>
            <h1 className='search-header'>WotLK-Skill</h1>
            <input className='search-input' onChange={e => {
                handleInput(e.currentTarget.value);
            }} type={"text"} placeholder={"Player name"} />
            <div>
                {renderResults()}
            </div>
        </div>
    )
};