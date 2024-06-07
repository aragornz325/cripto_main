import React from 'react'

const ChipPokerStatus = ({text}) => {
    return (
        <div className={"pokerChip " + text}>{text}</div>
    )
}

export default ChipPokerStatus