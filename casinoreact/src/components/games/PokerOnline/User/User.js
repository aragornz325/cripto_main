import UserCard from "./UserCard";
import Dealer from "../Dealer/Dealer";
const User = ({ users, turn }) => {
	const positions = [
		{
			colorSecond: "#acedfb",
			left: "46%",
			top: "60%",
			secondLeft: "38%",
			secondTop: "66%",
			iconw: "100%",
			border: "none",
			iconh: "100%",
			imgH: "84%",
			imgW: "80%",
			height: "16.5%",
			width: "8%",
			font: "140%",
			size: "95",
		},
		{
			bgColor2: "#F474E1",
			colorSecond: "#fff",
			left: "15%",
			top: "42%",
			secondLeft: "18%",
			secondTop: "44%",
			iconw: "100%",
			iconh: "100%",
			border: "2px solid #F474E1",
			bgFrom: "#F474E1",
			bgTo: "rgba(244, 116, 225, 0)",
			imgH: "90%",
			imgW: "90%",
			height: "10%",
			width: "4.5%",
			font: "80%",
			size: "60",
		},
		{
			bgColor2: "#F474E1",
			colorSecond: "#fff",
			left: "27%",
			top: "15%",
			secondLeft: "30%",
			secondTop: "17%",
			iconw: "100%",
			iconh: "100%",
			border: "2px solid #F474E1",
			bgFrom: "#F474E1",
			bgTo: "rgba(244, 116, 225, 0)",
			imgH: "90%",
			imgW: "90%",
			height: "10%",
			width: "4.5%",
			font: "80%",
			size: "60",
		},
		{
			bgColor2: "#F474E1",
			colorSecond: "#fff",
			left: "60%",
			top: "15%",
			secondLeft: "63%",
			secondTop: "17%",
			iconw: "100%",
			iconh: "100%",
			border: "2px solid #F474E1",
			bgFrom: "#F474E1",
			bgTo: "rgba(244, 116, 225, 0)",
			imgH: "90%",
			imgW: "90%",
			height: "10%",
			width: "4.5%",
			font: "80%",
			size: "60",
		},
		{
			bgColor2: "#F474E1",
			colorSecond: "#fff",
			left: "72%",
			top: "42%",
			secondLeft: "75%",
			secondTop: "44%",
			iconw: "100%",
			iconh: "100%",
			border: "2px solid #F474E1",
			bgFrom: "#F474E1",
			bgTo: "rgba(244, 116, 225, 0)",
			imgH: "90%",
			imgW: "90%",
			height: "10%",
			width: "4.5%",
			font: "80%",
			size: "60",
		},
	];


	return (
		<>
			<Dealer img={`/assets/dealer.png`} />
			<>
				{positions.map((position, index) => {
					return (
							<UserCard
								size={position.size}
								bgColor2={position.bgColor2}
								font={position.font}
								colorSecond={position.colorSecond}
								users={users[index] && users[index]._id}
								turn={turn}
								img={`/assets/3memoji.png`}
								iconW={position.iconw}
								iconH={position.iconh}
								margin='auto'
								border={position.border}
								left={position.left}
								top={position.top}
								height={position.height}
								width={position.width}
								background='#F474E1'
								name={users[index] && users[index].username}
								number={users[index] && users[index].balance}
								h='7%'
								w='10%'
								imgH={position.imgH}
								imgW={position.imgW}
								bgFrom={position.bgFrom}
								bgTo={position.bgTo}
								secondTop={position.secondTop}
								secondLeft={position.secondLeft}
							/>
					);
				})}
			</>
		</>
	);
};

export default User;
