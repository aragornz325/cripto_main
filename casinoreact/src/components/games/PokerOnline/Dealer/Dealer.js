import React from "react";
import { Img } from "./DealerStyles";

const Dealer = (props) => {
	const { img } = props;
	return (
		<>
			<Img src={img} />
		</>
	);
};

export default Dealer;
