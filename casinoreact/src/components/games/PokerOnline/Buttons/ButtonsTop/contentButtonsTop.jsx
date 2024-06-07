import React from 'react'
import FullScreenButton from '../fullScreenButton/fullScreenButton'
import KeypadButton from '../soundButton/KeypadButton'
import MusicButton from '../soundButton/MusicButton'

const ContentButtonsTop = () => {
    return (
        <div className='alignTopButtons'>
            <MusicButton/>
            <KeypadButton/>
            {/* <FullScreenButton/> */}
        </div>
    )
}

export default ContentButtonsTop