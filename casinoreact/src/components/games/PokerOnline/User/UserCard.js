import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import {
	Container,
	ContainerScale,
	Head,
	Head2,
	Imagen,
	SecondContainer,
	SecondContainerScale,
} from "./UserCardStyles";

const UserCard = (props) => {
	//console.log(props)
	const {
		colorSecond,
		turn,
		img,
		left,
		top,
		height,
		width,
		users,
		background,
		name,
		number,
		h,
		iconW,
		iconH,
		w,
		imgH,
		size,
		bgColor2,
		imgW,
		margin,
		bgFrom,
		bgTo,
		secondTop,
		font,
		secondLeft,
		border,
	} = props;

	return (
		<>
			{turn && turn === users ? (
				<>
					<ContainerScale
						left={left}
						top={top}
						bgColor2={bgColor2}
						height={height}
						width={width}
						background={turn && turn === users ? background : null}>
						<CountdownCircleTimer
							isPlaying
							duration={20}
							colors={["#35DC25", "#35DC25", "#A30000", "#A30000"]}
							colorsTime={[20, 15, 10, 0]}
							size={size}
							strokeWidth={10}
							trailColor={"#9b9b9b"}
						/>
						<Imagen imgH={imgH} imgW={imgW} margin={margin}>
							<img src={img} alt='user' width={iconW} height={iconH} />
						</Imagen>
					</ContainerScale>

					<SecondContainerScale
						h={h}
						w={w}
						bgFrom={bgFrom}
						bgTo={bgTo}
						secondTop={secondTop}
						secondLeft={secondLeft}
						border={border}>
						<Head font={font}>{name}</Head>
						<Head2 colorSecond={colorSecond}>{number}</Head2>
					</SecondContainerScale>
				</>
			) : (
				<>
					<Container
						bgColor2={bgColor2}
						left={left}
						top={top}
						height={height}
						width={width}
						background={turn && turn === users ? background : null}>
						<Imagen imgH={imgH} imgW={imgW} margin={margin}>
							<img src={img} alt='user' width={iconW} height={iconH} />
						</Imagen>
					</Container>

					<SecondContainer
						h={h}
						w={w}
						bgFrom={bgFrom}
						bgTo={bgTo}
						secondTop={secondTop}
						secondLeft={secondLeft}
						border={border}>
						<Head font={font}>{name}</Head>
						<Head2 colorSecond={colorSecond}>{number}</Head2>
					</SecondContainer>
				</>
			)}
		</>
	);
};

export default UserCard;
