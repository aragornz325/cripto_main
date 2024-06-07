import { useState } from "react";
import { H3, Container, Elipse } from "./ButtonsGameStyles";
import ButtonRaiseTo from "../ButtonRaiseTo/ButtonRaiseTo";
import { Howl } from "howler";
const ButtonsGame = ({ emit, user, minBet, potTotal }) => {
	//State shows slider
	const [click, setClick] = useState(false);
	const soundCheck = new Howl({
		src: ["/assets/sound/checkSound.mp3"],
		volume: 1,
	});
	const soundFold = new Howl({
		src: ["/assets/sound/foldSound.mp3"],
		volume: 1,
	});
	const handleClick = () => {
		setClick(!click);
	};

	const checkEvent = () => {
		emit("check");
		soundCheck.play();
	};
	const foldEvent = () => {
		emit("fold");
		soundFold.play();
	};
	return (
		<Container>
			{click ? (
				<>
					{/*Button Raise To*/}
					<ButtonRaiseTo
						user={user}
						emit={emit}
						minBet={minBet}
						potTotal={potTotal}
					/>
					<Elipse onClick={foldEvent}>
						<H3 onClick={foldEvent}>FOLD</H3>
					</Elipse>
					<Elipse onClick={checkEvent}>
						<H3 onClick={checkEvent}>CHECK</H3>
					</Elipse>
					{/** 
					<Elipse>
						<H3 onClick={() => emit("call")}>CALL</H3>
					</Elipse>*/}
					<Elipse onClick={handleClick}>
						<H3 nClick={handleClick}>RAISE TO</H3>
					</Elipse>
				</>
			) : (
				<>
					<Elipse onClick={foldEvent}>
						<H3 onClick={foldEvent}>FOLD</H3>
					</Elipse>
					<Elipse onClick={checkEvent}>
						<H3 onClick={checkEvent}>CHECK</H3>
					</Elipse>
					{/** 
					<Elipse>
						<H3 onClick={() => emit("call")}>CALL</H3>
					</Elipse>*/}
					<Elipse onClick={handleClick}>
						<H3 onClick={handleClick}>RAISE TO</H3>
					</Elipse>
				</>
			)}
		</Container>
	);
};
export default ButtonsGame;
