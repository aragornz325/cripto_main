import { useState, useEffect } from "react";
import { MdOutlineMusicNote, MdOutlineMusicOff } from 'react-icons/md'
import { Howl } from "howler";

// Button enable/disable music.
const MusicButton = () => {
    const [sound, setSound] = useState(false) // True enable - False disable
    const [audio] = useState(
		new Howl({
			src: ["/assets/sound/background-music-2.mp3"],
			volume: 0.05,
            loop: true
		})
	);
    
    // Manage enable-disable sound button
    const handleSetSound = () => {
        setSound(!sound)
        if (sound === true ) {
            audio.play()
        } else {
            audio.pause()
        }
    }
    
    // Auto start play music.
    useEffect(() => {
        audio.play();
        return () => audio.unload()
    }, [audio]);
    
    // Render button.
    return (
        <div className="musicButton" onClick={handleSetSound}>
            {
                sound ? <MdOutlineMusicOff /> : <MdOutlineMusicNote />    
            }
        </div>
    )
}

export default MusicButton