import React from "react";
import {
	Container,
	FirstChild,
	PotH1,
	PotH3,
	SecondChild,
	ThirdChildren,
} from "./PotStyles";

const Pot = ({ potTotal }) => {
	return (
		<Container>
			<FirstChild>
				<SecondChild>
					<PotH3>POT</PotH3>
				</SecondChild>
				<ThirdChildren>
					<PotH1>{potTotal}</PotH1>
				</ThirdChildren>
			</FirstChild>
		</Container>
	);
};

export default Pot;
