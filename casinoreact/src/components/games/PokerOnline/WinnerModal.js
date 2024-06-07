import { useEffect, useState } from "react";
import { Winner, WinnerTitle, WinnerTxt, WinnerPlayer } from "./PokerStyles"
import { FaStar } from "react-icons/fa";
import { usePoker } from "./PokerProvider";
import { useCountdownTimer } from 'use-countdown-timer';

const WinnerModal = () => {

    const { data, winners, ownPlayer } = usePoker()
       
    const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
        timer: new Date(data.startTime).getTime() - Date.now(),
        autostart: true
      });
      
    useEffect(() => {
        if (data.activeRound?.roundState === 5) start()
    },[data])

    return (
        <Winner className={data.activeRound?.roundState == 5 ? "open" : "close"}>
            <WinnerTitle>
                <FaStar />
                <WinnerTxt>
                    { winners.length > 1 ? 'WINNERS' : 'WINNER' }
                </WinnerTxt>
                <FaStar />
            </WinnerTitle>
            {
                winners ? 
                winners.map((winner, index) => {
                    const nameHand = winner.solvedHandArray.length > 0 ? winner.nameHand : 'folds'
                    if (winner._id === ownPlayer._id) {
                        return <WinnerPlayer key={winner._id}>You win with {nameHand}</WinnerPlayer>
                    }
                    return <WinnerPlayer key={winner._id}>{winner.user?.username} wins with {nameHand}</WinnerPlayer>
                })  : null
            }
                <p>New round in {isRunning ? Math.ceil(countdown / 1000) : 0}s</p>            
        </Winner>
    )
}
export default WinnerModal