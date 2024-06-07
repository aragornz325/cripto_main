import React from "react";
import { Btn, BtnDisabled } from "./styles.js";

const OptionButton = ({ children, clickFunction, disabled }) => {
  return (
    <>
      {!disabled ? (
        <Btn disabled={disabled ? disabled : null} onClick={clickFunction}>
          {children}
        </Btn>
      ) : (
        <BtnDisabled
          disabled={disabled ? disabled : null}
          onClick={clickFunction}
        >
          {children}
        </BtnDisabled>
      )}
    </>
  );
};

export default OptionButton;
