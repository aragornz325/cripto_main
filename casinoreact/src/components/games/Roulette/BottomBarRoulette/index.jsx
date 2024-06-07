/* eslint-disable react-hooks/exhaustive-deps */
import {
  Buttons,
  Container,
  Button,
  ContainerRaise,
  UserInfoBox,
  UserInfo,
  UserName,
  UserBalance,
  UserPicture,
  UserPictureBox,
  ContainerFirstButtons,
} from "./styles";
import { useEffect, useRef, useState } from "react";

import { AiOutlineReload } from "react-icons/ai";
import startRoulette from "../../../../controllers/roulette/startRoulette";
import store from "../../../../store/reducers/store";
import { formatBet } from "../../../../pages/Roulette/auxiliar";
import { dif_dict, do_bet_if_possible, to_val } from "../../logic_asistant";
import { useSession } from "../../../../SessionContext";

const BottomBarRoulette = ({
  username,
  parentCallback,
  secondParentCallback,
  userBalance,
  thirdParentCallback,
  setTimeResult,
  timeResult,
  degrees,
  userId,
}) => {
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
  const [Menu, setMenu] = useState([]);
  const [Selected, setSelected] = useState(0);
  const [Rebet, setRebet] = useState([]);
  const lastRouletteIndex = useRef(0);

  const { getUser, userData } = useSession();

  const rouletteNumbers = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 31, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29,
    7, 28, 12, 35, 3, 26,
  ];

  let audio = new Audio("/assets/roulette/rouletteSpinSound.mp3");
  let bets = [];
  store.getState().stacks.map((stack) => {
    return bets.push(formatBet(stack.chips, stack.ids, store.getState().cells));
  });

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
  const refreshSelected = () => {
    secondParentCallback(Selected);
  };
  useEffect(() => {
    const setCoins = async () => {
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
      //for (let kind in coins) console.log(kind, coins[kind]);
      refreshMenu(coins);
      refreshSelected();
    };
    setCoins();
  }, [Selected]);

  const refreshMenu = (a_coins = userCoins) => {
    // Esta comentando porque cada vez que hago una modificacion en el archivo se rompe
    const coins = a_coins;
    let menu = Object.keys(coins).filter((key) => coins[key] > 1);
    setMenu(menu);
  };

  const doChangeSelected = (action) => {
    if (Menu.length === 0) return;

    switch (action) {
      case "INCREMENT":
        setSelected((Selected + 1) % Menu.length);
        break;
      case "DECREMENT":
        setSelected((Menu.length + Selected - 1) % Menu.length);
        break;
      default:
        break;
    }
  };

  const doRebet = async () => {
    const coins = await getRefreshChips();

    Rebet.map((pre_stack) => {
      return do_bet_if_possible(coins, pre_stack.chips, () => {
        store.dispatch({
          type: "ADD_STACK",
          data: pre_stack,
        });
        setUserCoins(dif_dict(userCoins, pre_stack.chips));
        // refreshMenu(dif_dict(userCoins, pre_stack.chips));
      });
    });
  };

  const buttonStyle = {
    width: "60px",
    cursor: "pointer",
  };

  const goShop = () => {};

  const handlerRouletteRes = async () => {
    const response = await startRoulette(userId, bets);
    //console.log("response", response);
    const rouletteIndex = rouletteNumbers.findIndex((value) => response.rouletteNumber.number === value);
    if (rouletteIndex > -1) {
      //console.log("lastROulette", lastRouletteIndex.current);
      parentCallback(false, `${360 - lastRouletteIndex.current * 9.72}deg`, true, true);
      lastRouletteIndex.current = rouletteIndex;
      setTimeout(() => {
        parentCallback(true, `${rouletteIndex * -9.72 + -5 * 360}deg`, false);
        audio.play();
      }, 500);
      getUser();
    }
    thirdParentCallback(true, response);
  };

  const handlerSpin = () => {
    // setTimeout(handlerRouletteRes, 8250)
    handlerRouletteRes();
    // doClearBets();
    thirdParentCallback(false);
    // setTimeout(() => setTimeResult(false), 10000)
    setTimeResult(false);
    setRebet(store.getState().stacks);
    // setTimeout(() => setSpinAround(false), 10500)
  };

  const doClearBets = async () => {
    const coins = await getRefreshChips();
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
    store.getState().stacks.map((stack) => {
      return store.dispatch({ type: "REMOVE_STACK", data: stack });
    });

    refreshMenu(coins);
  };

  const chipOrShop = () => {
    return Menu.length === 0 || Menu === [] ? (
      <div
        onClick={() => goShop}
        style={{
          ...buttonStyle,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Shop
      </div>
    ) : (
      <div style={{ ...buttonStyle, position: "relative" }}>
        <img
          src={`assets/fichas/f${to_val(Menu[Selected])}.png`}
          alt={""}
          style={{
            ...buttonStyle,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </div>
    );
  };

  const calculeBet = (bets) => {
    let amount = 0;
    bets.map((bet) => {
      amount += bet.bet;
    });
    return amount;
  };

  return (
    <>
      <Container>
                <div style={{position: "absolute", top: "-70%", right: "15%", fontSize: "15px"}}>Your total current bet is: {calculeBet(bets)} Coins</div>
        <ContainerFirstButtons>
          <Buttons>
            {/* <Button style={{boxShadow: '0 0 0.3vw #C285FF', border: '0.2vw solid #C285FF'}}>
            X2
        </Button> */}
            <Button style={{ boxShadow: "0 0 0.3vw #FF64DD", border: "0.2vw solid #FF64DD" }} onClick={doRebet}>
              <AiOutlineReload size={24} />
            </Button>
          </Buttons>
        </ContainerFirstButtons>
        <UserInfoBox>
          <UserInfo>
            <UserName>{username}</UserName>
            <UserBalance>{userData?.balance}</UserBalance>
          </UserInfo>
          <UserPictureBox>
            <UserPicture src="/assets/3memoji.png" />
          </UserPictureBox>
        </UserInfoBox>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/assets/roulette/backArrow.png"
            style={{ width: "30px", height: "30px", paddingRight: "3%", cursor: "pointer" }}
            onClick={() => doChangeSelected("DECREMENT")}
            alt="decrement"
          />
          {chipOrShop()}
          <img
            src="/assets/roulette/nextArrow.png"
            style={{ width: "30px", height: "30px", paddingLeft: "3%", cursor: "pointer" }}
            onClick={() => doChangeSelected("INCREMENT")}
            alt={"increment"}
          />
        </div>
        <ContainerRaise>
          <Buttons>
            <Button style={{ boxShadow: "0 0 0.3vw #FF0000", border: "0.2vw solid #FF0000" }} onClick={doClearBets}>
              CLEAR BETS
            </Button>
            <Button
              disabled={bets.length === 0 || (degrees !== "0deg" && timeResult === false)}
              style={{ boxShadow: "0 0 0.3vw #00ff00", border: "0.2vw solid #00FF00" }}
              onClick={handlerSpin}
            >
              SPIN
            </Button>
          </Buttons>
        </ContainerRaise>
      </Container>
    </>
  );
};

export default BottomBarRoulette;
