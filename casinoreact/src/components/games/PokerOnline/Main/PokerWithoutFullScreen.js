import { useEffect } from "react";
import { useState } from "react";
import PokerHoldemTable from "../Table/pokerHoldemTable";
import { usePoker } from "../PokerProvider";
import Players from "./Players";
import ModalEnterWithMoney from "../modalEnterWithMoney/modalEnterWithMoney";
import { Buttons, GameView, TableImg } from "./styles";
import ButtonsBottom from '../Buttons/ButtonsBottom';
import ContentButtonsTop from "../Buttons/ButtonsTop/contentButtonsTop";
import WinnerModal from '../WinnerModal';
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { useNavigate } from "react-router-dom";
import { TiSortNumerically } from "react-icons/ti";

const PokerWithoutFullScreen = () => {
	const navigate = useNavigate()
	const { 
		pokerFullScreen,
		data,
		ownPlayer,
		leaveRoom
	} = usePoker()

	return (
		<GameView size={75}>
			<div onClick={ () => navigate('/') } style={{padding: "10px", fontSize: "20px", position: "absolute", zIndex: "10", cursor: "pointer" }}>
				<MdOutlineArrowBackIosNew />
			</div>
			{
				data.activeRound?.roundState === 5 ?
				<WinnerModal/>
				: null
			}
			<ContentButtonsTop />
			<ModalEnterWithMoney />
			{
				ownPlayer && !data.activeRound ?
				<button style={{ position: 'absolute', margin: '0.5vw 0 0 3vw', zIndex: '99999' }} onClick={leaveRoom}>Leave Room</button>
				: null
			}
			<div className="table">
				<TableImg src='/assets/tablePoker.png' />
				<Players/>
				<PokerHoldemTable />
			</div>
			<Buttons>
				<ButtonsBottom/>
			</Buttons>
		</GameView>
	)
}

export default PokerWithoutFullScreen