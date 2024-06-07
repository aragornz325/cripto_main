import React, { useState } from "react";
import { useEffect } from "react";
import { Img, SecondImg } from "./CardsStyles";
const Card = (props) => {
	const [reparto, setReparto] = useState(false);
	const { img, top, left, secondTop, secondLeft, w, h } = props;

	useEffect(() => {
		setTimeout(() => {
			setReparto(true);
		}, 3000);
	}, []);
	return (
		<>
			{!reparto ? (
				<Img
					w={w}
					h={h}
					src={img}
					top={top}
					left={left}
					secondTop={secondTop}
					secondLeft={secondLeft}
				/>
			) : (
				<SecondImg
					w={w}
					h={h}
					src={img}
					top={top}
					left={left}
					secondTop={secondTop}
					secondLeft={secondLeft}
				/>
			)}
		</>
	);
};

export default Card;
