import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import {
	NavLink,
	Navbar,
	Links,
	Logo,
	Profile,
	NavBtn,
	LinksPopup,
	SignUp,
	LogInDiv,
	Coins,
	Coin,
	CoinImg,
	CoinLabel,
	Wrapper
} from "./styles.js";
import { FaBars } from "react-icons/fa";
import store from "../../../store/reducers/store.js";
import storeUserInit from "../../../functions/storeUserInit";
//import logo from '../../../../public/assets/home/navbar/logo.png';
//import Name from '../../../../public/assets/home/navbar/CRYPGO.png';
import MenuIcon from "@mui/icons-material/Menu";
import { usersController } from "../../../controllers";
import stringToNumber from "../../../functions/stringToNumber.js";
import renderStore from "../../../store/actionCreators/renderStore.js";

function NavBar() {
	const [username, setUsername] = useState(store.getState().username);
	const [url, setUrl] = useState(
		"https://devshift.biz/wp-content/uploads/2017/04/profile-icon-png-898.png"
	);

	useEffect(() => {
		const asyncEffect = async () => {
			await storeUserInit();
			console.log("done");
		}
		asyncEffect()
	}, []);

	store.subscribe(() => {
		if (username !== store.getState().username) {
			setUsername(store.getState().username);
		}
	});

	const [toggleNavLinks, setToggleNavLinks] = useState(false);
	const [dimensions, setDimensions] = React.useState({
		height: window.innerHeight,
		width: window.innerWidth,
	});
	React.useEffect(() => {
		function handleResize() {
			setDimensions({
				height: window.innerHeight,
				width: window.innerWidth,
			});
		}
		window.addEventListener("resize", handleResize);
		return (_) => {
			window.removeEventListener("resize", handleResize);
		};
	});

	const [coins, setCoins] = useState([]);
	const [hovering, setHovering] = useState(false);
	// User data loading
	const userRefresh = async() => {
		const result = await usersController.getUserData();
		if (result) {
			const { coins, ...user } = result;
			let newCoins = [];
			if (coins) {
				for (let coin in coins) {
					newCoins.push([]);
					newCoins[newCoins.length - 1][0] = coin;
					newCoins[newCoins.length - 1][1] = coins[coin];
				}
			}
			setCoins(newCoins);
		}
	}
	
	useEffect(() => {
		const asyncEffect = async () => {
			await userRefresh();
		}
		asyncEffect()
	}, []);

	return (
		<div style={{height: '80px'}}>
		<Wrapper>
			<Navbar>
				<NavLink href="/">
					<img
						src={"assets/home/navbar/logo.png"}
						style={{
							marginLeft: "30px",
							marginRight: 10,
							height: 60,
							width: 60,
						}}
					/>
				</NavLink>
				<NavLink href="/">
					<img
						src={"assets/home/navbar/CRYPGO.png"}
						alt=""
						style={{ height: 26, width: 140 }}
					/>{" "}
				</NavLink>

				{dimensions.width > 650 ? (
					<Navbar>
						<Links>
							<NavLink href="/" style={{ height: "30px" }}>
								Home
							</NavLink>
							<Link
								to="about"
								smooth={true}
								duration={1000}
								style={{ height: "30px" }}
							>
								{" "}
								<NavLink href="#">About</NavLink>{" "}
							</Link>
							<Link
								to="contact"
								smooth={true}
								duration={1000}
								style={{ height: "30px" }}
							>
								{" "}
								<NavLink href="#">Contact</NavLink>
							</Link>
							<NavLink style={{ height: "30px" }} onClick={() => renderStore(true)}>
								Store
							</NavLink>
						</Links>
						<Links>
							{!username ? (
								<LogInDiv>
									<NavLink href="/login">Login</NavLink>
									<NavLink href="/signup">
										<SignUp>Sign Up</SignUp>
									</NavLink>
								</LogInDiv>
							) : (
								<Profile
									onClick={() => {
										window.location = "/profile";
									}}
									onMouseOver={() => { userRefresh(); setHovering(true) }}
									onMouseOut={() => setHovering(false)}
								>
									<img
										src={url}
										style={{
											width: "32px",
											borderRadius: "6px",
											marginRight: "10px",
										}}
									/>
									<NavLink
										href="/profile"
										style={{ fontSize: "32px" }}
									>
										{username.toUpperCase()}
									</NavLink>
									{hovering && (
										<Coins>
											{coins && coins.length ? (
												coins.map((coin, index) => {
													return (
														<Coin key={index}>
															<CoinImg
																src={`/assets/fichas/f${stringToNumber(
																	coin[0]
																)}.png`}
															/>
															<CoinLabel>
																x{Math.floor(coin[1])}
															</CoinLabel>
														</Coin>
													);
												})
											) : (
												<h1>NO COINS</h1>
											)}
										</Coins>
									)}
								</Profile>
							)}
						</Links>
					</Navbar>
				) : (
					<NavBtn onClick={() => setToggleNavLinks(!toggleNavLinks)}>
						<MenuIcon style={{ height: 50, width: 50 }} />
					</NavBtn>
				)}
			</Navbar>
			{toggleNavLinks && dimensions.width < 650 ? (
				<LinksPopup>
					<NavLink href="/">Home</NavLink>
					<Link to="about" smooth={true} duration={1000}>
						{" "}
						<NavLink href="/">About</NavLink>{" "}
					</Link>
					<Link to="contact" smooth={true} duration={1000}>
						{" "}
						<NavLink href="/"> Contact</NavLink>{" "}
					</Link>
					<NavLink href="/">Store</NavLink>
					<NavLink href="/login">Login</NavLink>
				</LinksPopup>
			) : (
				""
			)}
		</Wrapper>
		</div>
	);
}

export default NavBar;
