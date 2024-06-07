import { useState, useEffect } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { Howl } from "howler";
import { usePoker } from "../../PokerProvider";

const KeypadButton = () => {

    const { keypadSound, keypadUserSound } = usePoker()

    // Manage enable-disable sound button
    const handleSetSound = () => {
        keypadSound()
    }

    return (
        <div className="musicButton" onClick={handleSetSound}>
            {
                keypadUserSound ? <FaVolumeUp /> : <FaVolumeMute />    
            }
        </div>
    )
}

export default KeypadButton