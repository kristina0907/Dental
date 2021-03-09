import React, { useState, useEffect } from "react";
import {IconButton} from "@material-ui/core";

const useMultiAudio = (records) => {
    const [sources] = useState(
        records.map(record=>{
            return{
                url:record.link,
                audio: new Audio(record.link)
            }
        })
    );

    const [players, setPlayers] = useState(
        records.map(record => {
            return {
                url:record.link,
                playing: false
            };
        })
    );

    const toggle = targetIndex => () => {
        const newPlayers = [...players];
        const currentIndex = players.findIndex(p => p.playing === true);
        if (currentIndex !== -1 && currentIndex !== targetIndex) {
            newPlayers[currentIndex].playing = false;
            newPlayers[targetIndex].playing = true;
        } else if (currentIndex !== -1) {
            newPlayers[targetIndex].playing = false;
        } else {
            newPlayers[targetIndex].playing = true;
        }
        setPlayers(newPlayers);
    };

    useEffect(() => {
        sources.forEach((source, i) => {
            players[i].playing ? source.audio.play() : source.audio.pause();
        });
    }, [sources, players]);

    useEffect(() => {
        sources.forEach((source, i) => {
            source.audio.addEventListener("ended", () => {
                const newPlayers = [...players];
                newPlayers[i].playing = false;
                setPlayers(newPlayers);
            });
        });
        return () => {
            sources.forEach((source, i) => {
                source.audio.removeEventListener("ended", () => {
                    const newPlayers = [...players];
                    newPlayers[i].playing = false;
                    setPlayers(newPlayers);
                });
            });
        };
    }, []);

    return [players, toggle];
};

const MultiPlayer = ({ records }) => {
    const [players, toggle] = useMultiAudio(records);

    return (
        <div>
            {players.map((player, i) => (
                <Player key={i} player={player} toggle={toggle(i)} />
            ))}
        </div>
    );
};

const Player = ({ player, toggle }) => (
    <div className="comment_conent">
        <div className={"play_comment"}>
            <IconButton onClick={toggle}>
                {player.playing ?
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9" cy="9" r="8.5" stroke="#DFE6EE"/>
                        <path d="M9 1C4.58 1 1 4.58 1 9C1 13.42 4.58 17 9 17C13.42 17 17 13.42 17 9C17 4.58 13.42 1 9 1ZM8.12 11C8.12 11.5 7.72 11.88 7.24 11.88C6.74 11.88 6.36 11.48 6.36 11V7C6.34 6.52 6.74 6.12 7.22 6.12C7.72 6.12 8.12 6.52 8.12 7V11ZM11.66 11C11.66 11.5 11.26 11.88 10.78 11.88C10.28 11.88 9.9 11.48 9.9 11V7C9.88 6.52 10.28 6.12 10.76 6.12C11.26 6.12 11.66 6.52 11.66 7V11Z" fill="#FF9346"/>
                    </svg>
                    :
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 0C3.58171 0 0 3.58171 0 8C0 12.4183 3.58171 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58171 12.4183 0 8 0ZM5.83954 11.3081V4.69187L11.5671 8L5.83954 11.3081Z" fill="#FF9346"/>
                    </svg>
                }

            </IconButton>
        </div>
        <div>
            <div className="title_comment">Комментарий</div>
            <div className="text_comment">Текст комментария</div>
        </div>
    </div>
);

export default MultiPlayer;
