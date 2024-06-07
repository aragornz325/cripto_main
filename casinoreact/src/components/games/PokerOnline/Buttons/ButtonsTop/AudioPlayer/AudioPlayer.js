import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { Howl } from "howler";
import { useEffect, useState } from "react";
import { Audio } from "./AudioPlayerStyles";
const AudioPlayer = () => {
	const [playing, setPlaying] = useState(false);
	const [audio] = useState(
		new Howl({
			src: ["/assets/sound/background-music-2.mp3"],
			volume: 0.02,
		})
	);

	const toggle = () => {
		if (playing) {
			audio.play();
		} else {
			audio.pause();
		}
	};
	useEffect(() => {
		audio.play();
	}, [audio]);

	// Enable and disable poker-holdem music + change icon
	const handleOnOffMusic = () => {
		console.log("### MUSIC STATUS POKER HOLDEM:", playing ? "ON ###" : "OFF ###")
		setPlaying(!playing);
		toggle();
	}

	return (
		<div>
			<Audio
				onClick={handleOnOffMusic}>
				{playing ? (
					<FaVolumeMute color='white' size={20} />
				) : (
					<FaVolumeUp color='white' size={20} />
				)}
			</Audio>
		</div>
	);
};

export default AudioPlayer;
