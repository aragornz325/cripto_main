import React from 'react'
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai'
import { usePoker } from '../../PokerProvider'

const FullScreenButton = () => {

    const {viewFullScreen, pokerFullScreen} = usePoker()

    const handleFullScreen = () => {
        viewFullScreen()
    }

    return (
        <div className='musicButton' onClick={handleFullScreen}>
            {
                pokerFullScreen.active ? null : <AiOutlineFullscreen />
            }
        </div>
    )
}

export default FullScreenButton