// Provider RenderPonker
import React from "react";
import "./styles.scss"
import PokerProvider from "./PokerProvider";
import RenderPoker from "./renderPoker";

const Poker = () => {
	
	return (
		<PokerProvider>
			<RenderPoker/>
		</PokerProvider>
	)
}

export default Poker