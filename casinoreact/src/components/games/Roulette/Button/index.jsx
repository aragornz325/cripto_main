import React from "react";

const ImgButton = (props) => {
	return <img src={props.src} onClick={props.onClick} style={props.style} />;
};

export default ImgButton;
