import React, { useState, useEffect, useCallback } from "react";
import { usePoker } from "../../PokerProvider";
import { AiOutlineCheck } from "react-icons/ai";
import {
	Buttons,
	Container,
	Button,
	ContainerRaise,
	ButtonsRaise,
	AllIn,
	HalfPot,
	FullPot,
	Bet,
	RaiseTo,
	CircleCheck,
	ButtonLess,
	ButtonMore,
	H3,
	Input,
	UserInfoBox,
	UserInfo,
	UserName,
	UserBalance,
	UserPicture,
	UserPictureBox
} from "./ButtonsBottomStyles";
import Slider from "react-input-slider";
import { Howl } from "howler";
import { FaMinus } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import StatusAsidePlayer from "../../statusAsidePlayer/statusAsidePlayer";
const BottomsButtom = () => {
	const { 
		data, 
		keypadUserSound, 
		turnPlayer, 
		currentBet, 
		actions, 
		foldAction, 
		currentPot, 
		callAction, 
		checkAction,
		raisetoAction,
		allInAction,
		turnTimeout,
        colorsTimeout,
		ownPlayer,
		user,
		disabledButtons,
		setDisabledButtons
	} = usePoker()
    const [ rangeValue, setRangeValue ] = useState(data.entryPrice)
    const [ betActions, setBetActions ] = useState([])
    const [ raiseActions, setRaiseActions ] = useState(false)
    const [ allInStatus, setAllInStatus ] = useState(false)
	const [ alertUserTime, setAlertUserTime ] = useState() 
	
	const [callSound] = useState(
		new Howl({
			src: ["/assets/sound/chip.mp3"],
			volume: 1,
		})
	)
	const [checkSound] = useState(
		new Howl({
			src: ["/assets/sound/check.mp3"],
			volume: 2,
		})
	)
	const [foldSound] = useState(
		new Howl({
			src: ["/assets/sound/foldSound.mp3"],
			volume: 1,
		})
	)
	const [halfpotSound] = useState(
		new Howl({
			src: ["/assets/sound/chip.mp3"],
			volume: 1,
		})
		)
	const [allinSound] = useState(
		new Howl({
			src: ["/assets/sound/Allin.mp3"],
			volume: 1,
		})
	)
	const [confirmSound] = useState(
		new Howl({
			src: ["/assets/sound/confirm.mp3"],
			volume: 1.5,
		})
	)

	const [startTurnSound] = useState(
		new Howl({
			src: ["/assets/sound/ownplayerTurn.mp3"],
			volume: 1.5,
		})
	)

	const [startTurnAlertSound] = useState(
		new Howl({
			src: ["/assets/sound/ownplayerTurnFinish.mp3"],
			volume: 1.5,
		})
	)

		
	const handleConfirmButton = () => {
		if ( allInStatus) {
			allInAction(rangeValue)
			if (keypadUserSound) confirmSound.play();
		} else {
			raisetoAction(rangeValue)
			if (keypadUserSound) confirmSound.play();
		}
	}
	
    useEffect(() => {
		setBetActions(user?.betActions)
        setRaiseActions(false)
    }, [user?.betActions])

    useEffect(() => {
        setRangeValue(data.entryPrice)
    }, [data])
	
	
    // All buttons actions avaible.
    const handleCheckButton = () => { 
		checkAction()
		if (keypadUserSound) checkSound.play();
	}
    const handleRaiseToButton = () => { 
        setRaiseActions(!raiseActions)
    }
    const handleFoldButton = () => { 
		foldAction(); 
		if (keypadUserSound) foldSound.play();
	}
    
	const handleCallButton = () => { 
		callAction();
		if (keypadUserSound) callSound.play();
	}
	
    const handleAllinButton = () => { 
        setRangeValue(ownPlayer.roomBalance)
        setAllInStatus(true) 
		if (keypadUserSound && !raiseActions) allinSound.play();

    }
    const handleHalfpotButton = () => { 
		if (currentPot / 2 <= data.entryPrice ) {
			setRangeValue(data.entryPrice)
		} else {
			setRangeValue(Math.round(currentPot / 2)) 
		}
        setAllInStatus(false)
		if (keypadUserSound && !raiseActions) halfpotSound.play();

    }
    const handleFullpotButton = () => { 
        setRangeValue(currentPot) 
        setAllInStatus(false)
		if (keypadUserSound && !raiseActions) halfpotSound.play();

    }

    const handleChangeRange = useCallback((event) => {
        setRangeValue(Number(event))
        if (event === ownPlayer?.roomBalance) {
            setAllInStatus(true)
        } else {
            setAllInStatus(false)
        }
    })

    const handleButtonLess = () => { 
		if (rangeValue <= currentBet) {
			console.log("cant do less")
		} else if ((rangeValue - Math.round((ownPlayer?.roomBalance * 10) / 100)) < currentBet) {
            setRangeValue(currentBet)
        } else {
            setRangeValue(rangeValue - Math.round((ownPlayer?.roomBalance * 10) / 100));
        }
	}

    const handleButtonMore = () => {
		if (rangeValue >= ownPlayer?.roomBalance) {
			console.log("cant do more")
		} else if ((rangeValue + Math.round((ownPlayer?.roomBalance * 10) / 100)) > ownPlayer?.roomBalance) {
            setRangeValue(ownPlayer?.roomBalance)
        } else {
            setRangeValue(rangeValue + Math.round((ownPlayer?.roomBalance * 10) / 100));
        }
	}

	// CALL price
	const callPrice = data.activeRound?.currentBet - ownPlayer?.currentBet

    // Left buttoms harcode
    const hardcodeButtons = [
        { text: actions?.CHECK ? "Check" : "Call", action: actions?.CHECK ? handleCheckButton : handleCallButton, className: `check`, color: "#8FFFF1", price: callPrice},
        { text: "Fold", action: handleFoldButton, className: `fold`, color: "#E41513" }
    ]

	// Alert user turn
	useEffect(() => {
		if (turnTimeout && keypadUserSound && ownPlayer?._id === turnPlayer._id) {
			startTurnSound.play()
		}
	}, [turnTimeout])

	// Alert user finsh turn
	useEffect(() => {
		if (alertUserTime === Math.round(colorsTimeout[2]) && keypadUserSound && ownPlayer?._id === turnPlayer._id) {
			startTurnAlertSound.play()
		}
	}, [turnTimeout])


	return (
		<Container>
			<Buttons>
				{hardcodeButtons.map(action => {
					return (
						<Button
							roomBalance={ownPlayer?.roomBalance}
							raiseActions={raiseActions}
							key={action.text} 
							disabled={disabledButtons} 
							color={action.color} 
							price={action.price}
							text={action.text}
							onClick={ownPlayer?._id === turnPlayer._id && action.action}>
							{action.text}
						</Button>
					)
				})}
			</Buttons>
			<UserInfoBox>
				<UserInfo>
					<UserName>{ownPlayer?.user?.username || user?.username}</UserName>
					<UserBalance>{ownPlayer?.roomBalance}</UserBalance>
				</UserInfo>
				<UserPictureBox turn={ownPlayer?._id === turnPlayer._id && data.activeRound?.roundState !== 5}>
				{
					ownPlayer?._id === turnPlayer._id && data.activeRound?.roundState !== 5 &&
					<CountdownCircleTimer
						key={turnTimeout}
						isPlaying={!disabledButtons}
						duration={turnTimeout}
						colorsTime={colorsTimeout}
						colors={['#22C914', '#F7B801', '#A30000', '#FF0000']}
						strokeWidth={8}
						trailColor="#d9d9d9"
						size={window.innerWidth / 100 * 7}
						onComplete={() => setDisabledButtons(true)}
					>
						{({ remainingTime }) => setAlertUserTime(remainingTime)}
					</CountdownCircleTimer>
				}
				<div className="alignAvatarStausOwnplayer">
					{
						ownPlayer?.betState?._id === 6 ? <StatusAsidePlayer text="FOLDED" textColor="redFolded"/> :  
						ownPlayer?.betState?._id === 5 ? <StatusAsidePlayer text="ALL-IN" textColor="greenAllIn"/> : null
					}
				</div>
					<UserPicture src="/assets/3memoji.png" />
				</UserPictureBox>
			</UserInfoBox>
			<ContainerRaise disabled={disabledButtons}>
				<ButtonsRaise raiseActions={raiseActions}>
					<Bet>
						<AllIn 
							onClick={handleAllinButton}
							disabled={disabledButtons}
						>
							All in
						</AllIn>
						<HalfPot 
							onClick={handleHalfpotButton}
							disabled={disabledButtons || ownPlayer?.roomBalance < currentBet / 2 ? true : false}
						>
							Half Pot
						</HalfPot>
						<FullPot 
							onClick={handleFullpotButton}
							disabled={disabledButtons || ownPlayer?.roomBalance < currentBet ? true : false}
						>
							Full Pot
						</FullPot>
					</Bet>
					<RaiseTo>
						<H3>Raise { ownPlayer?.betState?._id === 3 ? `(Call ${callPrice}) ` : '' }</H3>
						<Input name='number' value={rangeValue} type='text' />
						<ButtonLess onClick={handleButtonLess}>
							<FaMinus size={'.8vw'} />
						</ButtonLess>
						<Slider
							styles={{
								track: {
									width: "13.5vw",
									height: '.8vw',
									border: "1px solid #fff",
									background: "transparent",
								},
								active: {
									backgroundColor: "#FE17FF",
								},
								thumb: {
									width: '1vw',
									height: '1vw',
									backgroundColor: "#A602A7",
									//background: "url(/assets/Coin.png)",
								},
							}}
							axis='x'
							xstep={1}
							x={rangeValue}
							xmax={ownPlayer?.betState?._id === 3 ? ownPlayer?.roomBalance - (currentBet - ownPlayer?.currentBet) : ownPlayer?.roomBalance}
							xmin={data.entryPrice}
							onChange={e => handleChangeRange(e.x)}
							disabled={disabledButtons}
						/>
						<ButtonMore onClick={handleButtonMore}>
							<TiPlus size={'.8vw'} />
						</ButtonMore>
					</RaiseTo>
				</ButtonsRaise>
				<CircleCheck 
					raiseActions={raiseActions} 
					disabled={disabledButtons} 
					onClick={ownPlayer?._id === turnPlayer._id && (raiseActions ? null : handleConfirmButton)} 
				>
				<AiOutlineCheck size={25} />
				</CircleCheck>
			</ContainerRaise>
		</Container>
	);
};

export default BottomsButtom;
