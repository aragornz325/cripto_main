import { TurnLeftTwoTone } from "@mui/icons-material"
import { useState, useEffect } from "react"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import ChipPokerStatus from "../chipPokerStatus/chipPokerStatus"
import { usePoker } from "../PokerProvider"
import StatusAsidePlayer from "../statusAsidePlayer/statusAsidePlayer"
import { PlayerBalance, PlayerImg, PlayerInfo, PlayerName } from "./styles"

const AsidePlayer = ({ i, player }) => {

    const {
        turnPlayer, 
        data, 
        winnersCards, 
        pokerFullScreen,
        turnTimeout,
        colorsTimeout
    } = usePoker()
    const [ statusPlayer, setStatusPlayer ] = useState(false)
    const [ isDealer, setIsDealer ] = useState(false)
    
    let showCards = (data.activeRound?.roundState === 5 && player?.betState?._id !== 6 && player)
    useEffect(() => {
        if (data.activeRound?.bigBlind.includes(player?._id)) {setStatusPlayer("B")}
        else if (data.activeRound?.smallBlind === player?._id) {setStatusPlayer("S")} else {setStatusPlayer(null)}
    }, [data])

    useEffect(() => {
        if (data.activeRound?.dealer === player?._id) {setIsDealer("D")} else {setIsDealer(null)}
    }, [data])
    
    if (player && player._id === turnPlayer._id) {
        return (
            <div className={pokerFullScreen.active ? "asidePlayerFullScreen" : null}>
                <article className={`table-player player-${i} turnPlayer`} key={player.user.username}>
                    {
                        data.activeRound?.roundState !== 5 ?
                        <CountdownCircleTimer
                        key={turnTimeout}
                        isPlaying
                        duration={turnTimeout}
                        colorsTime={colorsTimeout}
                        colors={['#22C914', '#F7B801', '#A30000', '#A30000']}
                        size={100}
                        strokeWidth={6}
                        trailColor="#d9d9d9"
                    >
                        {({ remainingTime }) => (
                            <img className="table-player__avatar" src="/assets/3memoji.png" />
                        )}
                    </CountdownCircleTimer>

                    : <img className="table-player__avatar" src="/assets/3memoji.png" />

                    }
                    <div className="table-player__info">
                        <div className="table-player__name">{player.user.username}</div>
                        <div className="table-player__balance">{player.roomBalance ? Math.round(player.roomBalance): ''}</div>
                    </div>
                    <div className="table-player__bet">
                        <img className="table-player__bet-image" src="/assets/fichas/f1.png" />
                        <p className="table-player__bet-text" >{player.currentBet ? player.currentBet : 0}</p>
                        {
                            statusPlayer ? <ChipPokerStatus text={statusPlayer}/> : null 
                        }
                        {
                            isDealer ? <ChipPokerStatus text={isDealer}/> : null
                        }   
                    </div>
                {
                    player ? 
                    <div className="table-player__hand">
                        <img 
                            className={`table-player__hand-image
                                ${data.activeRound?.roundState === 5 && !winnersCards?.some(c => c.toUpperCase() === player.hand[0]) ? 'not-winner-card' : ''}
                            `} 
                            src={
                                showCards ?
                                `/assets/cartas/${player.hand[0]}.png`: 
                                "/assets/cartas/CartaBack.png" } />
                        <img 
                            className={`table-player__hand-image 
                                ${data.activeRound?.roundState === 5 && !winnersCards?.some(c => c.toUpperCase() === player.hand[1]) ? 'not-winner-card' : ''}
                            `}
                            src={
                            showCards ? // is aWinnerCard ?
                            `/assets/cartas/${player.hand[1]}.png` :
                            "/assets/cartas/CartaBack.png" } />
                    </div> : null
                }
            </article>
            </div>
        )
    } else {
        return (
            <div className={pokerFullScreen.active ? "asidePlayerFullScreen" : null}>
                {
                    player?.betState?._id === 6 ? <StatusAsidePlayer i={i} text="FOLDED" textColor="redFolded"/> :  
                    player?.betState?._id === 5 ? <StatusAsidePlayer i={i} text="ALL-IN" textColor="greenAllIn"/> : null
                }
                <article className={player ? 
                    player.betState?._id === 6 ? `table-player player-${i} folderPlayer` :
                    `table-player player-${i} inactivePlayer` : 
                    `table-player player-${i} disablePlayer` } key={player?.user.username}>
                     <PlayerImg src="/assets/3memoji.png" />
                    <PlayerInfo>
                        <PlayerName>{player?.user.username}</PlayerName>
                        <PlayerBalance>{player?.roomBalance ? Math.round(player?.roomBalance):''}</PlayerBalance>
                    </PlayerInfo>
                    <div className={ player ? "table-player__bet" : "table-player__bet disableBet" }>
                        <img className="table-player__bet-image" src="/assets/fichas/f1.png" />
                        <p className="table-player__bet-text" >{player?.currentBet ? player?.currentBet : 0}</p>
                        {
                            statusPlayer ? <ChipPokerStatus text={statusPlayer}/> : null 
                        }
                        {
                            isDealer ? <ChipPokerStatus text={isDealer}/> : null
                        }   
                    </div>
                    {
                        player ? 
                            <div className="table-player__hand">
                                <img 
                                    className={`table-player__hand-image
                                    ${data.activeRound?.roundState === 5 && !winnersCards?.some(c => c.toUpperCase() === player.hand ? player.hand[0] : null) ? 'not-winner-card' : ''}
                                `}
                                    src={
                                    showCards && player.hand ?
                                    `/assets/cartas/${player.hand[0]}.png`: 
                                    "/assets/cartas/CartaBack.png" } />
                                <img className={`table-player__hand-image
                                    ${data.activeRound?.roundState === 5 && !winnersCards?.some(c => c.toUpperCase() === player.hand ? player.hand[1] : null ) ? 'not-winner-card' : ''}
                                `} src={
                                    showCards && player.hand ?
                                    `/assets/cartas/${player.hand[1]}.png` :  
                                    "/assets/cartas/CartaBack.png" } />
                            </div> : null
                    }
                </article>

            </div>
        )
    }
}
export default AsidePlayer