import styled from "styled-components";
import * as colors from "../../../utils/colors/index.js";

export const Wrapper = styled.div`
	position: fixed;
	z-index: 99999999;
	background: rgba(15, 15, 15, 1);
	top: 0;
	box-shadow: 0 0 8px rgba(0, 0, 0, .4);
`

export const Navbar = styled.nav`
	background: transparent;
	color: white;
	width: 100vw;
	height: 80px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const Name = styled.h1`
	font-size: 3vmax;
	color: white;
`;

export const Links = styled.div`
	width: 500px;
	display: flex;
	font-family: "Poppins";
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	margin-left: 0px;
`;

export const NavLink = styled.a`
	color: ${colors.light};
	text-decoration: none;
	transition: .4s;
	font-family: Poppins;
	font-style: normal;
	font-weight: normal;
	font-size: 26px;
	line-height: 27px;

	&:hover {
		color: #edbe18;
	}
`;

export const LogInDiv = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-around;
margin-right: 15px;
padding-left: 0;
margin-left: 100px;
`;

export const SignUp = styled.button`
	width: 110px;
	height: 45px;
	left: 1216px;
	transition: 0.5s;
	top: 19px;
	background: #edbe18;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
	border: 0;
	margin-left: 20px;
	font-family: Poppins;
	font-style: normal;
	font-weight: normal;
	font-size: 22px;
	line-height: 27px;
	&:hover {
		width: 120px;
		height: 50px;
	}
`;

export const NavBtn = styled.button`
	height: 15px;
	width: 10vh;
	margin-right: 5vw;
	background: transparent;
	transition: 0.5s;
	border: 0;
	color: ${colors.light};
	font-family: "Poppins";
	font-size: 13vw;
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		color: #edbe18;
	}
`;

export const LinksPopup = styled.div`
	position: fixed;
	border-radius: 10px;
	right: 0;
	background: #000000;
	display: flex;
	width: 30vw;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-evenly;

	& ${NavLink} {
		color: #ffffff;
		margin: 1.5vh;
		font-size: 4vmax;
	}
`;

export const Profile = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background: #2c2c2c;
	padding: 6px 12px;
	border-radius: 6px;
	position: relative;
	min-width: 150px;
`;

export const Coins = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-evenly;
	position: absolute;
	top: 40px;
	padding: 20px 0px;
	background: #2c2c2c;
	z-index: 999999999;
	border-bottom-right-radius: 12px;
	border-bottom-left-radius: 12px;
`;

export const Coin = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 6px 2px;
	width: 80px;
`;

export const CoinImg = styled.img`
	width: 64px;
	margin: 0;
`;

export const CoinLabel = styled.p`
	font-size: 18px;
	font-weight: 700;
	margin: 0;
	margin-top: 2px;
`;
