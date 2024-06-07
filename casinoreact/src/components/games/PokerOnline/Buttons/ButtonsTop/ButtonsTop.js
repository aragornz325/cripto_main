import { FaExpand } from "react-icons/fa";
import AudioPlayer from "./AudioPlayer/AudioPlayer";
import { FaCompressAlt } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { Button, Container, Content } from "./ButtonsTopStyles";
const ButtonsTop = ({ handle }) => {

	// Enter poker-holdem full screen.
	const handleFullScreenPokerEnter = () => {
		console.log("### ENTER IN POKER-HOLDEM FULL SCREEN ###")
		handle.enter()
	}

	// Exit poker-holdem full screen.
	const handleFullScreenPokerExit = () => {
		console.log("### EXIT POKER-HOLDEM FULL SCREEN ###")
		handle.exit()
	}

	// Go back 
	const handleGoBackPokerHoldem = () => {
		console.log("### HANDLE GO BACK ### - warning - refactor this becouse its a Link from react-router-dom and dosen't discconect the user")
	}


	return (
		<Container>
			{/*BackArrowIcon*/}
			<Link to='/rooms'>
				<Button onClick={handleGoBackPokerHoldem}>
					<IoIosArrowBack size={20} />
				</Button>
			</Link>
			<Content>
				{/*ExpandIcon*/}
				{handle.active ? (
					<FaCompressAlt size={20} color='white' onClick={handleFullScreenPokerExit} />
				) : (
					<FaExpand size={20} color='white' onClick={handleFullScreenPokerEnter} />
				)}
				{/*AudioIcon*/}
				<AudioPlayer />
			</Content>
		</Container>
	);
};

export default ButtonsTop;
