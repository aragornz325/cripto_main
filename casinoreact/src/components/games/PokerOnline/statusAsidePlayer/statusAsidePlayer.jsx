import React from 'react'

const StatusAsidePlayer = ({i, text, textColor}) => {
    return (
        <div className={`table-player statusAsidePlayer-${i} player-${i}`}>
            <h1 className={`statusAsidePlayer__text ${textColor}`}>{text}</h1>
        </div>
    )
}

export default StatusAsidePlayer