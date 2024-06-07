import React from "react";
import { FaStar } from "react-icons/fa";
import {
	WinnerFullScreen,
	WinnerPlayeFullScreen,
	WinnerTxt,
} from "../PokerOnline/PokerStyles";

const Winner = (props) => {
	const { winner } = props;
	return (
		<WinnerFullScreen>
			<WinnerPlayeFullScreen>
				<FaStar />
				<WinnerTxt>
					<i>{winner} WINS</i>
				</WinnerTxt>
				<FaStar />
			</WinnerPlayeFullScreen>
		</WinnerFullScreen>
	);
};

export default Winner;
