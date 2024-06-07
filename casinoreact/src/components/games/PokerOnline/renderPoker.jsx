import WinnerModal from "./WinnerModal";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import PokerWithFullScreen from "./Main/PokerWithFullScreen";
import PokerWithoutFullScreen from "./Main/PokerWithoutFullScreen";
import { usePoker } from "./PokerProvider";

// This component render the poker
const RenderPoker = () => {

	const { data, pokerFullScreen } = usePoker()

	return (
		<div className="poker-container ">
			<FullScreen handle={pokerFullScreen}>
				<PokerWithoutFullScreen />
			</FullScreen>
		</div>
	) 
}

export default RenderPoker