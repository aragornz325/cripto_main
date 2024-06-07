import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useParams } from "react-router-dom";
import { useSession } from '../../../SessionContext'


const context = createContext()
const { Provider } = context;

export const usePoker = () => {
    return useContext(context)
}

const PokerProvider = ({ children }) => {
    const { roomId } = useParams()
    const { userData: user, getUser } = useSession()

    const [joined, setJoined] = useState(false);
    const [joinBalance, setJoinBalance] = useState(0)
    const [joinRequest, setJoinRequest] = useState(false)

    const [ownPlayer, setOwnPlayer] = useState(null)

    const [turnPlayer, setTurnPlayer] = useState({});
    const [currentBet, setCurrentBet] = useState(0);
    const [socket, setSocket] = useState();
    const [data, setData] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [winners, setWinners] = useState([])
    const [winnersCards, setWinnersCards] = useState([])
    const [keypadUserSound, setKeypadUserSound] = useState(true)
    const [fullScreen, setFullScreen] = useState()
    const [turnTimeout, setTurnTimeout] = useState(null)
    const [colorsTimeout, setColorsTimeout] = useState([])
    const [players, setPlayers] = useState([])
    const [disabledButtons, setDisabledButtons] = useState(true)

    useEffect(() => {
        setDisabledButtons(!data?.activeRound || ownPlayer?._id !== turnPlayer._id || data.activeRound?.roundState === 5)
    }, [turnPlayer])


    const pokerFullScreen = useFullScreenHandle();

    const viewFullScreen = () => {
        pokerFullScreen.enter()
    }

    const keypadSound = () => {
        setKeypadUserSound(!keypadUserSound)
    }

    const emit = (event, data) => {
        socket.emit(event, data)
    }

    const allInAction = (amount) => {
        setDisabledButtons(true)
        emit("bet", {
            playerId: data.activeRound.activePlayer,
            roomId: roomId,
            raiseAmount: amount,
            betAction: 6
        })
    }

    const checkAction = () => {
        setDisabledButtons(true)
        emit("bet", {
            playerId: data.activeRound.activePlayer,
            roomId: roomId,
            raiseAmount: 1,
            betAction: 5
        })
    }

    const foldAction = () => {
        setDisabledButtons(true)
        emit("bet", {
            playerId: data.activeRound.activePlayer,
            roomId: roomId,
            raiseAmount: 1,
            betAction: 7
        })
    }

    const raisetoAction = (amount) => {
        setDisabledButtons(true)
        emit("bet", {
            playerId: data.activeRound.activePlayer,
            roomId: roomId,
            raiseAmount: amount,
            betAction: 4
        })
    }

    const callAction = () => {
        setDisabledButtons(true)
        emit("bet", {
            playerId: data.activeRound.activePlayer,
            roomId: roomId,
            raiseAmount: 1,
            betAction: 3
        })
    }

    const leaveRoom = async () => {
        'LEAVING'
        await emit('leave',{
            roomId,
            playerId: ownPlayer?._id
        })
        setTimeout(() => getUser(),4000)
    }
    
    // Enter balance
    const joinRoom = async (balance) => {
        if (socket) {
            await socket.emit('join', {
                roomId: roomId,
                userId: user?._id,
                roomBalance: balance
            })
            setJoined(true)
            setTimeout(() => getUser(),4000)
        }
    }

    const actions = useMemo(() => turnPlayer.betState?.betActions.reduce((acc, action) => {
        acc[action.name] = true;
        return acc;
    }, {}), [turnPlayer.betState?.betActions])

    const contextValue = {
        joinRoom,
        pokerFullScreen,
        viewFullScreen,
        fullScreen,
        keypadUserSound,
        keypadSound,
        turnPlayer,
        setTurnPlayer,
        checkAction,
        foldAction,
        callAction,
        actions,
        currentBet,
        setCurrentBet,
        raisetoAction,
        data,
        currentPot: data.activeRound?.pot,
        user,
        emit,
        roomId,
        allInAction,
        setData,
        winnersCards,
        turnTimeout,
        colorsTimeout,
        players,
        ownPlayer,
        winners,
        disabledButtons,
        setDisabledButtons,
        leaveRoom
    }

    useEffect(() => {
        const socket = io(`wss://apicasino.herokuapp.com/poker-holdem`)
        socket.on("connect", () => { setSocket(socket) })
        socket.on("refresh", (data) => {
            setData(data)
            if (!loaded) setLoaded(true)
        })
        socket.emit("see-room", {
            roomId: roomId,
            playerId: ownPlayer?._id || null
        })
        if (ownPlayer) setJoined(true)


        return () => socket.disconnect()
    }, [])

    useEffect(() => {
        if (ownPlayer && !joined) {
            socket.emit("see-room", {
                roomId: roomId,
                playerId: ownPlayer?._id || null
            })
            setJoined(true)
        }
    }, [ownPlayer])

    useEffect(() => {
        if (data.activeRound?.roundState === 5) {
            console.log('SETTING WINNERS')
            let mappedWinners = []
            let cards = []
            for (const winner of data.activeRound?.winners) {
                cards = cards.concat(winner.solvedHandArray)
                const newObj = JSON.parse(JSON.stringify(winner));
                newObj.user = players.find(player => player?._id === newObj._id)?.user
                mappedWinners.push(newObj)
            }
            setWinners(mappedWinners)
            setWinnersCards(cards)
        } else {
            console.log('RESTART WINNER')
            setWinners([])
            setWinnersCards([])
        }
    }, [data])

    useEffect(() => {
        if (data.activeRound && data.activeRound.roundState !== 5) {
            const endsTime = (new Date(data.activeRound?.turnEndTime).getTime() - Date.now()) / 1000
            setTurnTimeout(endsTime)
            setColorsTimeout([endsTime, endsTime * 0.66, endsTime * 0.33, 0])
        }
    }, [data])

    //Este efecto le da formato a los players para que tengan el username y balance que ya tenian antes pero le agrega currentBet
    useEffect(() => {
        let playersWithBet = data.players || [];

        if (data?.activeRound?.players.length > 0) {
            playersWithBet = playersWithBet.map(player => {
                return { ...player, ...data.activeRound.players.find(p => p._id === player._id) }
            })
        }

        let orderedPlayers = []

        if (playersWithBet.length > 0) {
            for (let i = 1; i <= data.maxPlayers; i++) {
                const player = playersWithBet.find(player => player.seat === i)
                if (player) orderedPlayers.push(player)
                else orderedPlayers.push(null)
            }
            let ownPlayer = orderedPlayers.find(p => p?.user?._id === user?._id)
            if (ownPlayer) {
                const ownPlayerSeat = ownPlayer.seat
                if (ownPlayerSeat !== 1) {
                    const tail = orderedPlayers.splice(0, ownPlayerSeat - 1)
                    orderedPlayers = orderedPlayers.concat(tail)
                }
                setOwnPlayer(orderedPlayers.find(p => p?.user?._id === user?._id) || orderedPlayers)
            }
        }

        setPlayers(orderedPlayers)
        setTurnPlayer(data.activeRound?.players.find(p => p._id === data.activeRound.activePlayer) || "")
        setCurrentBet(data.activeRound?.currentBet || 0)
    }, [data])


    return (
        <Provider value={contextValue}>
            {
                loaded
                    ? children
                    : <div>Loading...</div>
            }
        </Provider>
    )
}

export default PokerProvider;
