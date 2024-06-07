/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import {
  // FullScreen, SoundIcon,
  Buttons,
  TheRoulette,
  WinnerContainer,
  WinnerCircle,
  WinnerContent,
  WinnerNumber,
  RouletteBall,
  ResultModal,
  WinnerAmount,
} from "./styles";
import { GameView } from "../../layout/styles.js";

import Table from "../../components/games/Roulette/Table";
import { usersController } from "../../controllers";
import { to_val } from "../../components/games/logic_asistant";
import BottomBarRoulette from "../../components/games/Roulette/BottomBarRoulette";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { WinnerPlayer, WinnerTitle, WinnerTxt } from "../../components/games/PokerOnline/PokerStyles";
import { FaStar } from "react-icons/fa";
import AudioPlayer from "../../components/audio/AudioPlayer";

function Roulette() {
  const [user, setUser] = useState(undefined);
  const [userCoins, setUserCoins] = useState({
    one: 1000,
    five: 1000,
    ten: 1000,
    twentyfive: 1000,
    fifty: 1000,
    hundred: 1000,
    fivehundred: 1000,
    thousand: 1000,
  });
  const [timeResult, setTimeResult] = useState(false);
  const [degrees, setDegrees] = useState("0deg");
  const refreshUser = async () => {
    const newUser = await usersController.getUserData();
    setUser(newUser);
    return newUser;
  };

  const getRefreshChips = async () => {
    let coins = {
      one: 100,
      five: 100,
      ten: 100,
      twentyfive: 100,
      fifty: 100,
      hundred: 100,
      fivehundred: 100,
      thousand: 100,
    };
    // setUserCoins(coins);
    setUserCoins(coins);
    return coins;
  };

  const getChips = () => {
    return userCoins;
  };

  useEffect(() => {
    const asyncEffect = async () => {
      const coins = await getRefreshChips();
      // setUserCoins(coins);
      setUserCoins({
        one: 100,
        five: 100,
        ten: 100,
        twentyfive: 100,
        fifty: 100,
        hundred: 100,
        fivehundred: 100,
        thousand: 100,
      });
      refreshUser();
      refreshMenu(coins);
    };
    asyncEffect();
  }, []);

  const [Spin, setSpin] = useState(null);
  const [rouletteNumberResult, setRouletteNumberResult] = useState(null);
  const [Selected, setSelected] = useState(0);
  const [Menu, setMenu] = useState([]);
  const [initialRotation, setInitialRotation] = useState("0deg");

  const getSelected = () => {
    let selected = {};
    selected[to_val(Menu[Selected])] = 1;
    return selected;
  };

  //console.log("initaalRotation", initialRotation);
  const callback = (props, rouletteIndex, loop, neonModal) => {
    if (loop) {
      setInitialRotation(rouletteIndex);
      setTimeout(() => setTimeResult(neonModal), 11000);
    } else {
      setDegrees(rouletteIndex || "0deg");
      setTimeResult(false);
    }
    setSpin(props);
  };


  const refreshMenu = (a_coins = userCoins) => {
    // Esta comentando porque cada vez que hago una modificacion en el archivo se rompe
    const coins = a_coins;
    let menu = Object.keys(coins).filter((key) => coins[key] > 1);
    setMenu(menu);
  };
  const secondCallback = (props) => {
    setSelected(props);
  };
  const thirdCallback = (props, resultRoulette) => {
    setRouletteNumberResult(resultRoulette);
  };

  // //console.log("willAMount", rouletteNumberResult?.wonAmount);
  //console.log("degrees", degrees);

  return (
    <>
      <GameView
        style={{
          background: "linear-gradient(360deg, rgba(28, 0, 107, 0.61) 50%, rgba(68, 4, 150, 0) 0)",
          backgroundSize: "50vh",
          borderRadius: "10px",
        }}
        id="gameview"
      >
        <div
          onClick={() => (window.location.href = "/")}
          style={{ padding: "10px", fontSize: "20px", position: "absolute", zIndex: "10", cursor: "pointer" }}
        >
          <MdOutlineArrowBackIosNew />
        </div>
        <div style={{ width: "100%", display: "flex", justifyContent: "center", position: "absolute", left: "30px" }}>
          {timeResult && (
            <ResultModal>
              <WinnerTitle>
                <WinnerTxt>Result</WinnerTxt>
              </WinnerTitle>
              {
                rouletteNumberResult?.rouletteNumber.number === 0 || rouletteNumberResult?.rouletteNumber.number === '0'
                ? <WinnerPlayer>Number is 0!</WinnerPlayer> 

                :
                <>
                <WinnerPlayer>Color {rouletteNumberResult?.rouletteNumber.color}</WinnerPlayer>
                <WinnerPlayer>
                  Row {rouletteNumberResult?.rouletteNumber.row} Column {rouletteNumberResult?.rouletteNumber.column}
                </WinnerPlayer>
                <WinnerPlayer>Dozen {rouletteNumberResult?.rouletteNumber.dozen}</WinnerPlayer>
                <WinnerPlayer>
                  {rouletteNumberResult?.rouletteNumber.lessThanEighteen ? "1 to 18" : "19 to 36"}{" "}
                </WinnerPlayer>
              </>
              }
              <WinnerAmount>
                <FaStar />
                <WinnerTxt>You won: {rouletteNumberResult?.wonAmount} </WinnerTxt>
                <FaStar />
              </WinnerAmount>
            </ResultModal>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        ></div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <RouletteBall timeResult={timeResult} />
            {/* <GiCagedBall color="white" /> */}
            {/* </RouletteBall> */}
            <TheRoulette
              src="assets/roulette/ruletav2.png"
              alt="rouleta"
              Spin={Spin}
              timeResult={timeResult}
              degrees={degrees}
              initialRotation={initialRotation}
            />
            {timeResult && (
              <WinnerContainer>
                <WinnerCircle>
                  <WinnerContent>
                    <WinnerNumber>{rouletteNumberResult.rouletteNumber.number}</WinnerNumber>
                  </WinnerContent>
                </WinnerCircle>
              </WinnerContainer>
            )}
          </div>
          <Table
            getSelected={getSelected}
            getChips={getChips}
            setChips={setUserCoins}
            refreshMenu={refreshMenu}
            color_squeme={"classic"}
            style={{
              position: "absolute",
              width: "50%",
              top: "35%",
              right: "3%",
            }}
          />
        </div>
        <div
          id={"Buttons"}
          style={{
            position: "absolute",
            left: "47%",
            top: "68%",
            display: "flex",
            justifyContent: "space-evenly",
            width: "50%",
          }}
        ></div>
        <Buttons>
          <BottomBarRoulette
            username={user?.firstName}
            userBalance={user?.balance}
            userId={user?._id}
            secondParentCallback={secondCallback}
            parentCallback={callback}
            thirdParentCallback={thirdCallback}
            setTimeResult={setTimeResult}
            timeResult={timeResult}
            degrees={degrees}
          />
        </Buttons>
        <AudioPlayer
						url="/assets/sound/background-music-1.mp3"
						loop={true}
						slider={true}
					/>
      </GameView>
    </>
  );
}

export default Roulette;
