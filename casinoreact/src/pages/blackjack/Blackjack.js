// Npm packages
import React, { useState, useEffect } from "react";

// React functional components
// import Navbar from "../../components/navigation/NavBar";
// import HiddenBtn from "../../components/games/Blackjack/HiddenBtn";
import Table from "../../components/games/Blackjack/Table";
import Chip from "../../components/games/Blackjack/Chip";
import BjUi from "../../components/games/Blackjack/BjUi";
import AlertBar from "../../components/games/AlertBar";
import OptionButton from "../../components/games/Blackjack/OptionButton";
import StatusBar from "../../components/games/StatusBar";
import StaticCard from "../../components/games/Blackjack/StaticCard";
import Marker from "../../components/games/Blackjack/Marker";
import Deck from "../../components/games/Blackjack/Deck";
import DeckResult from "../../components/games/Blackjack/DeckResult";

// blackjackController Controllers
import { blackjackController, usersController } from "../../controllers";

// Redux store action (dispatch) creators
import store from "../../store/reducers/store";
import setGameState from "../../store/actionCreators/setGameState";
import setAlert from "../../store/actionCreators/setAlert";
import addCard from "../../store/actionCreators/addCard";
import resetCard from "../../store/actionCreators/resetCard";
import setGames from "../../store/actionCreators/setGames";
import setIndexedCards from "../../store/actionCreators/setIndexedCards";
import setGameIndex from "../../store/actionCreators/setGameIndex";

// Styled layout components
// import { FaExpand } from "react-icons/fa";
// import Store from "../../components/main/Store";
// import Layout from '../../components/Layout';
import { /*FullScreen,*/ GameView } from "../../layout/styles";
import AudioPlayer from "../../components/audio/AudioPlayer";
import Croupier from "../../components/games/Blackjack/Croupier";
import { Bar, Buttons, /*Coins,*/ Userbalance, UserInfo, Username, UserPicture } from "./styles";
import addBet from "../../store/actionCreators/addBet";

import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import TableName from "../../components/games/TableName/TableName";

const Blackjack = () => {
	const [cards, setCards] = useState(store.getState().cards);
	const [dealerCards, setDealerCards] = useState([]);
	const [currentValue, setCurrentValue] = useState([]);
	const [bet, setBet] = useState(0);
	const [premio, setPremio] = useState("");
	const [dealerValue, setDealerValue] = useState(0);
	const [index, setIndex] = useState(1);
	const [newDealerCards, setNewDealerCards] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [gameStates, setGameStates] = useState([false, false, false]);
	const [endState, setEndState] = useState([]);
	const [doubles, setDoubles] = useState([false, false, false]);
	const [pairs, setPairs] = useState([false, false, false]);
	const [splits, setSplits] = useState([]);
	const [splitIndex, setSplitIndex] = useState(0);
	const [fullscreen, setFullscreen] = useState(false);
	const [splitted, setSplitted] = useState(false);
	const [id, setId] = useState(undefined);
	const [user, setUser] = useState(undefined);
	const [ties, setTies] = useState(undefined);
	const [disable, setDisable] = useState(false);

	useEffect(() => {
		const asyncEffect = async () => {
			const newUser = await usersController.getUserData();
			setUser(newUser);
			setId(newUser._id);
		}
		asyncEffect()
	}, []);

	const refreshUser = async() => {
		const newUser = await usersController.getUserData();
		setUser(newUser);
		setId(newUser._id);
		return newUser;
	}

	store.subscribe(() => {
		setCards(store.getState().cards);
		setBet(store.getState().bet);
	});
	const start = async (userId) => {
		setDisable(true);
		const user = await refreshUser();
		if(!user._id){
			return setAlert({
				display: true,
				text: "User is not logged in",
				color: "red",
			});
		}
		setCards([]);
		if (store.getState().games.indexOf(true) <= 0) {
			setDisable(false) 
			return setAlert({
				display: true,
				text: "No bets were defined!",
				color: "red",
			}) 
		}
		setAlert({
			display: false
		})
		console.log(userId, store.getState().bet, store.getState().games)
		let response = await blackjackController.startBJ( userId, store.getState().bet, store.getState().games);
		console.log("Start:", await response);
		if (!response["error"] && response !== undefined) {
			if (response.userHasBlackjack.some(game => game)) {
				setGames([false,false,false])
				nextSet(response)
				setIndexedCards([...response.currentHand]);
				setTimeout(() => { setGames([false,true,false]) },1500)
			} else {
				setGames([...response.games]);
				setGameStates([...response.games]);
			setSplits([...response.userSplitted]);
			setIndexedCards([...response.currentHand]);
			setGameState("started");
			setPremio("");
			setDealerValue(response.dealerHandValue);
			setDealerCards([...response.dealerHand]);
			setNewDealerCards(response.dealerHand.length);
			setDoubles([...response.canDouble]);
			setPairs([...response.hasPair]);
			setDisable(false);
			setSplitted(false);
			if (
				response.handStand.length &&
				response.userStand.indexOf(false) &&
				response.handStand[response.userStand.indexOf(false)] &&
				response.handStand[response.userStand.indexOf(false)][0]
				) {
					setGameIndex([response.userStand.indexOf(false), 1]);
					setSplitIndex(1);
				} else {
					setGameIndex([response.userStand.indexOf(false), 0]);
					setSplitIndex(0);
				}
				setCurrentIndex(response.userStand.indexOf(false));
				if (
					response.userSplitted &&
					response.userSplitted.indexOf(true) === -1
					) {
						setGameIndex(response.userStand.indexOf(false));
					}
					setIndex(response.userStand.indexOf(false));
					setValueChecked(response);
			}
		} else {
			setDisable(false) 
			setAlert({ display: true, text: response["error"], color: "red" });
		}
		refreshUser();
	};

	const finish = (response) => {
		setDealerValue(response.dealerHandValue);
		setNewDealerCards(response.dealerHand.length - newDealerCards);
		setDealerCards([...response.dealerHand]);
		setTies(response.tie);
		setEndState(response.userWon);
		setGameState("finished");
		let newPremio = 0;
		response.userWon.map((i, index) => {
			if (i) {
				return (newPremio += 2 * bet[index]);
			} else {
				return newPremio;
			}
		});
		setPremio(newPremio);
	};

	const nextSet = (response) => {
		let newGames = store.getState().games;
		newGames[currentIndex] = false;
		setGames(newGames);
		console.log({ newGames })
		if (store.getState().games.indexOf(true) < 0) {
			console.log('finishing')
			finish(response);
		} else {
			if (
				response &&
				response.userStand[
				store.getState().games.indexOf(true, currentIndex + 1)
				]
			) {
				let newGames = store.getState().games;
				newGames[
					store.getState().games.indexOf(true, currentIndex + 1)
				] = false;
				setGames(newGames);
			}
			if (
				gameStates[
				store.getState().games.indexOf(true, currentIndex + 1)
				]
			) {
				setCurrentIndex(
					store.getState().games.indexOf(true, currentIndex + 1)
				);
				setGameIndex(
					store.getState().games.indexOf(true, currentIndex + 1)
				);
				setIndex(
					store.getState().games.indexOf(true, currentIndex + 1)
				);
			} else {
				console.log('finishing')
				finish(response);
			}
		}
	};

	const setValueChecked = (response) => {
		let hasSplit = false;
		response.currentHandValue.map((value) => {
			if (Array.isArray(value)) {
				return (hasSplit = true);
			} else {
				return value;
			}
		});
		if (hasSplit) {
			let newHandValues = [
				...response.currentHandValue.slice(
					0,
					response.userSplitted.indexOf(true)
				),
				String(
					response.currentHandValue[
					response.userSplitted.indexOf(true)
					][0]
				) +
				" / " +
				String(
					response.currentHandValue[
					response.userSplitted.indexOf(true)
					][1]
				),
				...response.currentHandValue.slice(
					response.userSplitted.indexOf(true) + 1
				),
			];
			setCurrentValue(newHandValues);
		} else {
			setCurrentValue(response.currentHandValue);
		}
	};

	const hit = async (userId, index) => {
		setDisable(true);
		let response = await blackjackController.hitBJ(userId, index);
		console.log("Hit:", response);
		if(!response['error']){
			setDisable(false);
		}
		setDoubles([...response.canDouble]);
		setCurrentValue(response.currentHandValue);
		addCard(
			response.currentHand[index][response.currentHand[index].length - 1],
			index
		);
		if (response.userIsBusted[index]) {
			nextSet(response);
		}
	};

	const stand = async (userId, index) => {
		setDisable(true);
		let response = await blackjackController.standBJ(userId, index);
		console.log("Stand:", await response);
		if (!response["error"] && response !== undefined) {
			setDisable(false);
			nextSet(response);
		} else {
			setAlert({ display: true, text: response["error"], color: "red" });
		}
	};

	const double = async (userId, index) => {
		setDisable(true);
		let response = await blackjackController.doubleBJ(userId, index);
		setDisable(false);
		console.log("Double:", await response);
		setCurrentValue(response.currentHandValue);
		addCard(
			response.currentHand[index][response.currentHand[index].length - 1],
			index
		);
		nextSet(response);
		refreshUser();
	};

	const split = async (userId, index) => {
		setDisable(true);
		let response = await blackjackController.splitBJ(userId, index);
		setDisable(false);
		console.log("Split:", await response);
		setDoubles([...response.canDouble]);
		if (
			response.handStand[response.userStand.indexOf(false)][0] &&
			response.handStand[response.userStand.indexOf(false)][1]
		) {
			nextSet(response);
		} else if (response.handStand[response.userStand.indexOf(false)][0]) {
			setSplitIndex(1);
			setGameIndex([currentIndex, 1]);
		} else {
			setGameIndex([currentIndex, 0]);
			setSplitIndex(0);
		}
		setSplits([...response.userSplitted]);
		setSplitted(true);
		setValueChecked(response);
		setIndexedCards([...response.currentHand]);
		refreshUser();
	};

	const restart = () => {
		setDisable(false)
		setCurrentValue([]);
		setPremio("");
		setGameState("none");
		setAlert({ display: false });
		resetCard();
		setDealerCards([]);
		setDealerValue("");
		setGameIndex([]);
		setGames([
			...store.getState().bet.map((item) => {
				if (item > 0) {
					return true;
				} else {
					return false;
				}
			}),
		]);
		refreshUser();
	};

	const splitHit = async (id, index, handIndex) => {
		setDisable(true);
		const response = await blackjackController.splitHitBJ(id, index, handIndex);
		console.log("Split Hit:", response);
		if (response["error"]) {
			return setAlert({
				display: true,
				text: response["error"],
				color: "red",
			});
		}
		setDisable(false);
		setDoubles([...response.canDouble]);
		setIndexedCards([...response.currentHand]);
		setValueChecked(response);
		if (response.userStand[index]) {
			nextSet(response);
		} else if (response.userIsBusted[index][handIndex]) {
			setGameIndex([currentIndex, 1]);
			setSplitIndex(1);
		}
	};

	const splitStand = async (id, index, handIndex) => {
		setDisable(true);
		const response = await blackjackController.splitStandBJ(id, index, handIndex);
		console.log("Split Stand:", response);
		if (!response["error"] && response !== undefined) {
			setDisable(false);
			if (response.userStand[index]) {
				nextSet(response);
			} else {
				setGameIndex([currentIndex, 1]);
				setSplitIndex(1);
			}
		} else {
			setAlert({ display: true, text: response["error"], color: "red" });
		}
	};

	const splitDouble = async (id, index, handIndex) => {
		setDisable(true);
		const response = await blackjackController.splitDoubleBJ(id, index, handIndex);
		console.log("Split Double:", response);
		if (!response["error"] && response !== undefined) {
			setDisable(false);
			setIndexedCards([...response.currentHand]);
			setValueChecked(response);
			if (response.userStand[index]) {
				nextSet(response);
			} else {
				setGameIndex([currentIndex, 1]);
				setSplitIndex(1);
			}
		} else {
			setAlert({ display: true, text: response["error"], color: "red" });
		}
		refreshUser();
	};

	const clearBets = () => {
		addBet(index, -store.getState().bet[index])
	}

	useEffect(() => {
		const keyDownHandler = event => {
			switch(event.key) {
				case 'Escape':
					setFullscreen(false);					
					event.preventDefault();
					break;
				//  case 'Enter':
				// 		start(id);
				// 		event.preventDefault();
				// 		break;
				//  case 'h':
				// 		splits[currentIndex] ? splitHit(id, currentIndex, splitIndex)	: hit(id, currentIndex);
				// 		event.preventDefault();
				// 		break;
			}
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => document.removeEventListener('keydown', keyDownHandler);
  }, []);

	// const fullscreenHandler = () => {
	// 	const elem = document.querySelector("#gameview");
	// 	if (fullscreen && document.fullscreenElement) {
	// 		if (document.exitFullscreen) {
	// 			document.exitFullscreen();
	// 		} else if (document.webkitExitFullscreen) {
	// 			/* Safari */
	// 			document.webkitExitFullscreen();
	// 		} else if (document.msExitFullscreen) {
	// 			/* IE11 */
	// 			document.msExitFullscreen();
	// 		}
	// 	} else if (!fullscreen) {
	// 		if (elem.requestFullscreen) {
	// 			elem.requestFullscreen();
	// 		} else if (elem.webkitRequestFullscreen) {
	// 			/* Safari */
	// 			elem.webkitRequestFullscreen();
	// 		} else if (elem.msRequestFullscreen) {
	// 			/* IE11 */
	// 			elem.msRequestFullscreen();
	// 		}
	// 	}
	// 	return setFullscreen(!fullscreen);
	// };

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
					<div onClick={ () => window.location.href = "/" } style={{padding: "10px", fontSize: "20px", position: "absolute", zIndex: "10", cursor: "pointer" }}>
						<MdOutlineArrowBackIosNew />
					</div>

					<Croupier dialog={store.getState().gameState === 'none' && 'placeBets'} />

					{/* <FullScreen onClick={() => fullscreenHandler()}>
// 						<FaExpand />
					</FullScr/*een> */}
				<div style={{
						zIndex: "",
						position: "absolute",
						width: "100%",
						transform: "translateY(400px)",
						display: "flex",
						backgroundColor: "blue",
						justifyContent: "center",
					}}>
						<TableName />
					</div>
					<Table />
					<AudioPlayer
						url="/assets/sound/background-music-1.mp3"
						loop={true}
						slider={true}
					/>
					<StatusBar
						itemA={{ title: "GAME", content: "BLACKJACK" }}
						itemB={{
							title: "BET",
							content:
								store.getState().bet && store.getState().bet[1]
						}}
						itemC={ premio ? { title: "You win", content: premio } : null }
					/>

					<Deck />

					{/* {store.getState().gameState === "none" ? (
						<BjUi index={index} />
					) : (
						""
					)} */}

					{store.getState().gameState === "started" ? (
						<>
							{gameStates
								? gameStates.map((item, index) => {
									if (
										currentIndex > index &&
										gameStates[index]
									) {
										return (
											<DeckResult
												key={index}
												index={index}
												background="yellow"
												text="STAND"
											/>
										);
									} else {
										return "";
									}
								})
								: ""}
						</>
					) : (
						""
					)}

					{store.getState().gameState === "finished" ? (
						<>
							{endState.map((item, index) => {
								if (gameStates[index]) {
									if (item.length === 2) {
										return (
											<>
												<DeckResult
													key={index}
													index={index}
													background={
														ties[index][0] ? 'gold' :
															item[0]
																? "lightgreen"
																: "red"
													}
													text={
														ties[index][0] ? 'TIE' : item[0] ? "WON" : "LOST"
													}
													marginLeft="-8%"
												/>
												<DeckResult
													key={index + 3}
													index={index}
													background={
														ties[index][1] ? 'gold' :
															item[1]
																? "lightgreen"
																: "red"
													}
													text={
														ties[index][1] ? 'TIE' : item[1] ? "WON" : "LOST"
													}
													marginLeft="8%"
												/>
											</>
										);
									} else {
										if (ties.length && ties[index]) {
											return (
												<DeckResult
													key={index}
													index={index}
													background={
														'gold'
													}
													text='TIE'
												/>
											);
										} else {
											return (
												<DeckResult
													key={index}
													index={index}
													background={
														item ? "lightgreen" : "red"
													}
													text={item ? "WON" : "LOST"}
												/>
											);
										}
									}
								} else {
									return "";
								}
							})}
						</>
					) : (
						""
					)}

					{/* <Chip index="0" />
					<HiddenBtn
						width="7%"
						height="12%"
						top="30%"
						left="8%"
						clickFunction={() => {
							setIndex(0);
						}}
						index="0"
					/> */}
					<Chip index="1" hidden={store.getState().gameState !== "none"} />
					{/* <HiddenBtn
						width="7%"
						height="12%"
						top="35.5%"
						left="46.65%"
						clickFunction={() => {
							setIndex(1);
						}}
						index="1"
					/> */}
					{/* <Chip index="2" />
					<HiddenBtn
						width="7%"
						height="12%"
						top="30%"
						left="85.35%"
						clickFunction={() => {
							setIndex(2);
						}}
						index="2"
					/> */}

					{index === 0 ? (
						<Marker
							width="5.5%"
							height="10%"
							top="30.4%"
							left="8.4%"
						/>
					) : index === 1 ? (
						<Marker
							hidden={store.getState().gameState !== "none"}
							width="5.5%"
							height="10%"
							top="66%"
    					left="62%"
						/>
					) : (
						<Marker
							width="5.5%"
							height="10%"
							top="30.4%"
							left="85.8%"
						/>
					)}

					<Bar>
						<Buttons>
							{store.getState().gameState === "none" && bet && <>
								<OptionButton
									text="START"
									color="#00FF00"
									clickFunction={() => {
										!disable && start(id);
									}}
								/>
								<OptionButton
									text="CLEAR BETS"
									color="#CC0000"
									clickFunction={() => {
										clearBets();
									}}
								/>
							</>}
							{store.getState().gameState === "started" ? (
							<>
								<OptionButton
									text="HIT"
									color="#9F02FF"
									clickFunction={() => {
										splits[currentIndex]
											? !disable && splitHit(
												id,
												currentIndex,
												splitIndex
											)
											: !disable && hit(id, currentIndex);
									}}
								/>
								<OptionButton
									text="STAND"
									color="#054BFF"
									clickFunction={() => {
										splits[currentIndex]
											? !disable && splitStand(
												id,
												currentIndex,
												splitIndex
											)
											: !disable && stand(id, currentIndex);
									}}
								/>
								{splits[currentIndex] ? (
									<>
										{doubles[currentIndex] &&
											doubles[currentIndex][splitIndex] ? (
											<OptionButton
												text="DOUBLE"
												color="#FBCC72"
												clickFunction={() => {
													!disable && splitDouble(
														id,
														currentIndex,
														splitIndex
													);
												}}
											/>
										) : (
											""
										)}
									</>
								) : (
									<>
										{doubles[currentIndex] ? (
											<OptionButton
												text="DOUBLE"
												color="#FBCC72"
												clickFunction={() => {
													!disable && double(id, currentIndex);
												}}
											/>
										) : (
											""
										)}
										{pairs[currentIndex] && !splitted ? (
											<OptionButton
												text="SPLIT"
												color="#009C51"
												clickFunction={() => {
													!disable && split(id, currentIndex);
												}}
											/>
										) : (
											""
										)}
									</>
								)}
							</>
						) : (
							""
						)}
						{store.getState().gameState === "finished" ? (
							<OptionButton
								text="RESTART"
								color="#FF0000"
								clickFunction={() => {
									restart();
								}}
							/>
						) : (
							""
						)}
						</Buttons>
						<UserInfo>
							<Username>{user?.username}</Username>
							<Userbalance>{user?.balance}</Userbalance>
						</UserInfo>
						<UserPicture src="/assets/1memoji.png" />
						<BjUi index={index} />
					</Bar>

					{currentValue !== [] ? (
						<>
							{currentValue[0] ? (
								<h1
									style={{
										color: "black",
										background: "gold",
										position: "absolute",
										fontSize: "1.5vw",
										bottom: "25%",
										textAlign: "center",
										left: "9%",
										zIndex: "9999999",
										margin: 0,
										padding: ".05vw .5vw .05vw .5vw",
										borderRadius: "1vw",
										border: ".15vw solid black",
									}}
								>
									{currentValue[0]}
								</h1>
							) : (
								""
							)}
							{currentValue[1] ? (
								<h1
									style={{
										color: "black",
										background: "gold",
										position: "absolute",
										fontSize: "1.5vw",
										bottom: "20%",
										textAlign: "center",
										right: "46.75%",
										zIndex: "9999999",
										margin: 0,
										padding: ".05vw .5vw .05vw .5vw",
										borderRadius: "1vw",
										border: ".15vw solid black",
									}}
								>
									{currentValue[1]}
								</h1>
							) : (
								""
							)}
							{currentValue[2] ? (
								<h1
									style={{
										color: "black",
										background: "gold",
										position: "absolute",
										fontSize: "1.5vw",
										bottom: "25%",
										textAlign: "center",
										right: "9%",
										zIndex: "9999999",
										margin: 0,
										padding: ".05vw .5vw .05vw .5vw",
										borderRadius: "1vw",
										border: ".15vw solid black",
									}}
								>
									{currentValue[2]}
								</h1>
							) : (
								""
							)}
							{dealerValue ? (
								<h1
									style={{
										color: "black",
										background: "gold",
										position: "absolute",
										fontSize: "1.5vw",
										top: "15%",
										textAlign: "center",
										right: "46.75%",
										zIndex: "9999999",
										margin: 0,
										padding: ".05vw .5vw .05vw .5vw",
										borderRadius: "1vw",
										border: ".15vw solid black",
									}}
								>
									{dealerValue}
								</h1>
							) : (
								""
							)}
						</>
					) : (
						""
					)}
					<>
						{cards
							? cards.map((cardList, listIndex) => {
								if (
									splits[listIndex] &&
									splits.length &&
									cardList
								) {
									return cardList.map(
										(cardSet, index) => {
											if (
												Array.isArray(cardSet.info)
											) {
												return cardSet.info.map(
													(card, ind) => {
														return (
															<StaticCard
																key={ind}
																game={
																	listIndex
																}
																index={ind}
																imgSrc={`${card.text.toUpperCase()}${card.suite[0].toUpperCase()}`}
																isDealer={
																	false
																}
																splitIndex={
																	index
																}
															/>
														);
													}
												);
											} else if (cardSet.length) {
												return cardSet.map(
													(card, ind) => {
														return (
															<StaticCard
																key={ind}
																game={
																	listIndex
																}
																index={ind}
																imgSrc={`${card.text.toUpperCase()}${card.suite[0].toUpperCase()}`}
																isDealer={
																	false
																}
																splitIndex={
																	index
																}
															/>
														);
													}
												);
											} else {
												return "";
											}
										}
									);
								} else {
									if (cardList && cardList.length) {
										return cardList.map((card, ind) => {
											return (
												<StaticCard
													key={ind}
													game={listIndex}
													index={ind}
													imgSrc={`${card.text.toUpperCase()}${card.suite[0].toUpperCase()}`}
													isDealer={false}
												/>
											);
										});
									} else {
										return "";
									}
								}
							})
							: ""}
					</>
					{dealerCards
						? dealerCards.map((card, ind) => {
							if (card !== null) {
								return (
									<StaticCard
										key={ind}
										index={ind}
										imgSrc={`${card.text.toUpperCase()}${card.suite[0].toUpperCase()}`}
										isDealer={true}
									/>
								);
							} else {
								return "";
							}
						})
						: ""}
					{store.getState().gameState === "started" ? (
						<StaticCard
							index={1}
							imgSrc={`card-back`}
							isDealer={true}
						/>
					) : (
						""
					)}
					<AlertBar />
				</GameView>
		</>
	);
};

export default Blackjack;
