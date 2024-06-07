import React, { useState, useEffect } from "react";
import { usersController, pokerController } from "../../controllers";
import PokerCoins from "../../components/games/PokerOffline/PokerCoinsUi";
import StatusBar from "../../components/games/StatusBar";
import AudioPlayer from "../../components/audio/AudioPlayer";
import { FaExpand } from "react-icons/fa";
import { FullScreen, GameView } from "../../layout/styles";
import setGameState from "../../store/actionCreators/setGameState";
import store from "../../store/reducers/store";
import OptionButton from "../../components/games/PokerOffline/OptionButton";
import cardsToJSON from "../../functions/cardsToJSON";
import StaticCard from "../../components/games/PokerOffline/StaticCard";
import Chip from "../../components/games/PokerOffline/Chip";
import addBet from "../../store/actionCreators/addBet";
import Table from "../../components/games/PokerOffline/Table";
import Navbar from "../../components/navigation/NavBar";
import AlertBar from "../../components/games/AlertBar";
import setAlert from "../../store/actionCreators/setAlert";
import Store from "../../components/main/Store";
import Layout from '../../components/Layout';

const Poker = () => {
	const [fullscreen, setFullscreen] = useState(false);
	const [deckCards, setDeckCards] = useState([]);
	const [userCards, setUserCards] = useState([]);
	const [dealerCards, setDealerCards] = useState([]);
	const [initialBet, setInitialBet] = useState(0);
	const [prize, setPrize] = useState(0);
	const [winnerCards, setWinnerCards] = useState([]);
	const [id, setId] = useState(undefined);
	const [user, setUser] = useState(undefined);

	useEffect( () => {
		const asyncEffect = async () => {
			const newUser = await usersController.getUserData();
			setUser(newUser);
			setId(newUser._id);
		}
		asyncEffect()
	}, []);

	const [state, setState] = useState(store.getState().gameState);
	const [winner, setWinner] = useState("");
	const [bet, setBet] = useState(store.getState().bet[0]);

	store.subscribe(() => {
		if (state !== store.getState().gameState) {
			setState(store.getState().gameState);
		}
		if (bet !== store.getState().bet[0]) {
			setBet(store.getState().bet[0]);
		}
	});

	const startPo = async () => {
		const res = await pokerController.startPO(id, store.getState().bet[0]);
		if(res.error){
			return setAlert({
				display: true,
				text: res.error,
				color: "red",
			});
		}
		setUserCards(res.currentHand);
		const deckCardsLength = res.deckHand.length;
		if (deckCardsLength) {
			setDeckCards(res.deckHand);
		}
		switch (deckCardsLength) {
			case 3:
				setGameState("stage1");
				break;
			case 4:
				setGameState("stage2");
				break;
			case 5:
				setGameState("finished");
				break;
			default:
				setGameState("started");
				break;
		}
		return res;
	};

	const foldPo = async () => {
		const res = await pokerController.foldPO(id);
		setGameState("finished");
		console.log("Fold", res);
		return res;
	};

	const flopPo = async () => {
		const res = await pokerController.flopPO(id);
		if(res.error){
			return setAlert({
				display: true,
				text: res.error,
				color: "red",
			});
		}
		console.log("Flop", res);
		setGameState("stage1");
		setDeckCards(res.deckHand);
		setInitialBet(bet);
		addBet(0, bet * 2);
		return res;
	};

	const checkPo = async () => {
		const response = await pokerController.checkPO(id);
		console.log("Check", response);
		let res = {};
		if (response.game) {
			setWinnerCards(
				response.winnerHand
			);
			res = response.game;
			setDealerCards(res.dealerHand);
			if (res.userWon) {
				setPrize(bet * 2);
			}
		} else {
			res = response;
		}
		if (state === "stage1") {
			setGameState("stage2");
		} else {
			if (response.game.dealerWon === true) {
				setWinner("dealer");
			} else if (response.game.userWon === true) {
				setWinner("user");
			}
			setGameState("finished");
		}
		setDeckCards(res.deckHand);
		return res;
	};

	const betPo = async () => {
		const response = await pokerController.betPO(id);
		console.log("Bet", response);
		if(response.error){
			return setAlert({
				display: true,
				text: response.error,
				color: "red",
			});
		}
		let res = {};
		if (response.game) {
			setWinnerCards(
				response.winnerHand
			);
			res = response.game;
			setDealerCards(res.dealerHand);
			if (res.userWon) {
				setPrize(bet);
			}
		} else {
			res = response;
		}
		if (state === "stage1") {
			setGameState("stage2");
		} else {
			if (response.game.dealerWon === true) {
				setWinner("dealer");
			} else if (response.game.userWon === true) {
				setWinner("user");
			} else {
				setWinner("tie");
			}
			setGameState("finished");
		}
		addBet(0, initialBet);
		setDeckCards(res.deckHand);
		return res;
	};

	const restart = async () => {
		setWinner("");
		setGameState("none");
		setDealerCards([]);
		setDeckCards([]);
		setUserCards([]);
		addBet(0, -bet + initialBet);
		setPrize(0);
		setWinnerCards([]);
	};

	const isGlowing = (comparator) => {
		if (!comparator) {
			return false;
		}
		return (
			winnerCards
				.map(
					(card) => {
					return (comparator[0] === card.value && comparator[1] === card.suit.toUpperCase())
				})
				.includes(true)
		);
	};
	const fullscreenHandler = () => {
		const elem = document.querySelector("#gameview");
		if (fullscreen && document.fullscreenElement) {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				/* Safari */
				document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) {
				/* IE11 */
				document.msExitFullscreen();
			}
		} else if (!fullscreen) {
			if (elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if (elem.webkitRequestFullscreen) {
				/* Safari */
				elem.webkitRequestFullscreen();
			} else if (elem.msRequestFullscreen) {
				/* IE11 */
				elem.msRequestFullscreen();
			}
		}
		return setFullscreen(!fullscreen);
	};

	return (
		<>
				<GameView
					id="gameview"
					style={
						fullscreen
							? {
									width: "100vw",
									height: "calc( 100vw / 16 * 9 )",
									zIndex: 10000,
							  }
							: {}
					}
				>
					<StatusBar
						itemA={{ title: "GAME", content: "POKER" }}
						itemB={{ title: "BET", content: bet }}
						itemC={{ title: "PRIZE", content: prize }}
					/>

					<Table />

					<div
						style={{
							zIndex: 900000,
							position: "absolute",
							width: "90%",
							height: "10%",
							display: "flex",
							flexDirection: "row",
							flexWrap: "wrap",
							alignItems: "center",
							justifyContent: "flex-end",
							bottom: "4%",
							right: 0,
						}}
					>
						{state === "none" && (
							<OptionButton
								clickFunction={startPo}
								disabled={!bet}
							>
								START
							</OptionButton>
						)}
						{state === "started" && (
							<>
								<OptionButton clickFunction={foldPo}>
									FOLD
								</OptionButton>
								<OptionButton clickFunction={flopPo}>
									FLOP
								</OptionButton>
							</>
						)}
						{(state === "stage1" || state === "stage2") && (
							<>
								<OptionButton clickFunction={checkPo}>
									CHECK
								</OptionButton>
								<OptionButton clickFunction={betPo}>
									BET
								</OptionButton>
							</>
						)}
						{state === "finished" && (
							<OptionButton clickFunction={restart}>
								FINISH
							</OptionButton>
						)}
					</div>
					{state === "none" && <PokerCoins />}
					<FullScreen onClick={() => fullscreenHandler()}>
						<FaExpand />
					</FullScreen>
					<AudioPlayer
						url="/assets/sound/background-music-2.mp3"
						loop={true}
						slider={true}
					/>
					<StaticCard
						glowing={isGlowing(dealerCards[0])}
						owner="dealer"
						index="5"
						imgSrc={`${
							dealerCards[0]
								? `${dealerCards[0]}`
								: "card-back"
						}`}
					/>
					<StaticCard
						glowing={isGlowing(dealerCards[1])}
						owner="dealer"
						index="6"
						imgSrc={`${
							dealerCards[1]
								? `${dealerCards[1]}`
								: "card-back"
						}`}
					/>

					{deckCards.map((card, index) => {
						return (
							<StaticCard
								owner="deck"
								index={index}
								imgSrc={`${card}`}
								key={index}
								glowing={isGlowing(card)}
							/>
						);
					})}
					{userCards.map((card, index) => {
						return (
							<StaticCard
								owner="user"
								index={index}
								imgSrc={`${card}`}
								key={index}
								glowing={isGlowing(card)}
							/>
						);
					})}
					<div
						style={{
							zIndex: 900000,
							position: "absolute",
							width: "90%",
							height: "10%",
							left: "75%",
							bottom: "50%",
							right: 0,
						}}
					>
						{state !== "finished" ? null : winner === "dealer" ? (
							<p
								style={{
									fontSize: "30px",
									fontFamily: "Poppins",
									color: "gold",
								}}
							>
								YOU LOST!
							</p>
						) : winner === "user" ? (
							<p
								style={{
									fontSize: "30px",
									fontFamily: "Poppins",
									color: "gold",
								}}
							>
								YOU WON!
							</p>
						) : (
							<p
								style={{
									fontSize: "30px",
									fontFamily: "Poppins",
									color: "gold",
								}}
							>
								TIE!
							</p>
						)}
					</div>

					<Chip clickable={state === 'none'}/>
					<AlertBar />

				</GameView>
			</>
	);
};

export default Poker;
