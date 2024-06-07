import { useState, useEffect } from "react"
import ChipPokerStatus from "../chipPokerStatus/chipPokerStatus"
import { usePoker } from "../PokerProvider"
import { OwnPlayerCards } from "./styles"


const OwnPlayer = ({i,username,hand,roomBalance, ownPlayer }) => {

    const { data, currentBet, winnersCards, pokerFullScreen } = usePoker()
    const [statusPlayer, setStatusPlayer] = useState()
    const [isDealer, setIsDealer] = useState()

    useEffect(() => {
        if (data.activeRound?.bigBlind.includes(ownPlayer?._id)) {setStatusPlayer("B")}
        else if (data.activeRound?.smallBlind === ownPlayer?._id) {setStatusPlayer("S")} else {setStatusPlayer(null)}
    }, [data])
    
    useEffect(() => {
        if (data.activeRound?.dealer === ownPlayer?._id) {setIsDealer("D")} else {setIsDealer(null)}
    }, [data])

    return (
        <>
            {hand?.map((card,index) => {
                return <OwnPlayerCards 
                    key={index}
                    index={index}
                    src={`/assets/cartas/${card}.png`}  
                />
            } )}
            {
                data.activeRound ? 
                    <div className="ownplayerBet__bet ">
                        <img className="ownplayerBet__bet-image" src="/assets/fichas/f1.png" />
                        <p className="ownplayerBet__bet-text" >{ownPlayer?.currentBet ? ownPlayer?.currentBet : 0}</p>
                        {
                            statusPlayer ? <ChipPokerStatus text={statusPlayer}/> : null 
                        }
                        {
                            isDealer ? <ChipPokerStatus text={isDealer}/> : null
                        }   
                    </div> 
                : null
            }
        </>
    )
}
export default OwnPlayer    
