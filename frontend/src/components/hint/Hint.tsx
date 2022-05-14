import { FC } from "react";
import { Player } from "../../types";
import './hint.css';

export interface HintProps {
    player: Player;
}

export const Hint: FC<HintProps> = ({ player: { id, name, realm } }) => {
    return (
        <div className="hint-container">
            <p>{name} - {realm}</p>
        </div>
    )
};