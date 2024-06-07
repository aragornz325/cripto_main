import Card from "./Card";
import { Flex } from "./CardsStyles";
const Cards = ({ userCards, deckCards }) => {
	const positions = [
		{
			left: "38%",
			top: "35%",
			secondLeft: "48%",
			secondTop: "22%",
			h: "14%",
			w: "4.5%",
		},
		{
			left: "43%",
			top: "35%",
			secondLeft: "48.1%",
			secondTop: "22%",
			h: "14%",
			w: "4.5%",
		},
		{
			left: "48%",
			top: "35%",
			secondLeft: "48.2%",
			secondTop: "22%",
			h: "14%",
			w: "4.5%",
		},
		{
			left: "53%",
			top: "35%",
			secondLeft: "48.3%",
			secondTop: "22%",
			h: "14%",
			w: "4.5%",
		},
		{
			left: "58%",
			top: "35%",
			secondLeft: "48.4%",
			secondTop: "22%",
			h: "14%",
			w: "4.5%",
		},
		//UserCards
		{
			left: "21%",
			top: "34%",
			secondLeft: "48.5%",
			secondTop: "22%",
			h: "12%",
			w: "3.5%",
		},
		{
			left: "23%",
			top: "36%",
			secondLeft: "48.6%",
			secondTop: "22%",
			h: "12%",
			w: "3.5%",
		},
		{
			left: "32%",
			top: "6%",
			secondLeft: "48.7%",
			secondTop: "22%",
			h: "12%",
			w: "3.5%",
		},
		{
			left: "34%",
			top: "8%",
			secondLeft: "48.8%",
			secondTop: "22%",
			h: "12%",
			w: "3.5%",
		},
		{
			left: "66%",
			top: "6%",
			secondLeft: "48.9%",
			secondTop: "22%",
			h: "12%",
			w: "3.5%",
		},
		{
			left: "68%",
			top: "8%",
			secondLeft: "49%",
			secondTop: "22%",
			h: "12%",
			w: "3.5%",
		},
		{
			left: "77%",
			top: "34%",
			secondLeft: "49.1%",
			secondTop: "22%",
			h: "12%",
			w: "3.5%",
		},
		{
			left: "79%",
			top: "36%",
			secondLeft: "49.2%",
			secondTop: "22%",
			h: "12%",
			w: "3.5%",
		},
	];

	const thirdPosition = [
		{
			left: "48%",
			top: "62%",
			secondLeft: "49.3%",
			secondTop: "22%",
			h: "14%",
			w: "4.5%",
		},
		{
			left: "49.5%",
			top: "64.5%",
			secondLeft: "49.4%",
			secondTop: "22%",
			h: "14%",
			w: "4.5%",
		},
	];

	return (
		<>
			{/*Cards Table*/}
			<Flex>
				{deckCards &&
					positions.map((position, index) => (
						<>
							<Card
								img={
									deckCards[index]
										? `/assets/cartas/${deckCards[index]}.png`
										: `/assets/cartas/CartaBack.png`
								}
								w={position.w}
								h={position.h}
								left={position.left}
								top={position.top}
								secondLeft={position.secondLeft}
								secondTop={position.secondTop}
							/>
						</>
					))}
			</Flex>
			{/**User Major */}
			{userCards &&
				thirdPosition.map((position, index) => (
					<>
						<Card
							w={position.w}
							h={position.h}
							img={
								userCards[index]
									? `/assets/cartas/${userCards[index]}.png`
									: `/assets/cartas/CartaBack.png`
							}
							left={position.left}
							top={position.top}
							secondLeft={position.secondLeft}
							secondTop={position.secondTop}
						/>
					</>
				))}
		</>
	);
};

export default Cards;
