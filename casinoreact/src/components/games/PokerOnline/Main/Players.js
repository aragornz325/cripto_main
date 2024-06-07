import { usePoker } from "../PokerProvider"
import Player from "./Player"

const Players = () => {
    const { players, ownPlayer } = usePoker()
    return (
        <div>
            {players.map((player, i) => {
                return (
                    <Player 
                        key={player?._id}
                        i={i}
                        id={player?._id}
                        username={player?.user.username}
                        roomBalance={player?.roomBalance}
                        hand={player?.hand}
                        currentBet={player?.currentBet}
                        ownPlayer={ownPlayer}
                        player={player}
                    />
                )
            })}
        </div>
    )
}
export default Players