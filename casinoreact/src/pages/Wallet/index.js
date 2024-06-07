import React, { useState, useEffect } from 'react'
import { Balance, BalanceContainer, BalanceTitle, Coin, Option, Selector, Title, TitleContainer, TitleIcon, Wrapper, Wallet as WalletDiv } from './styles'
import Orders from '../../components/main/Orders';
import Withdraw from '../../components/main/Withdraw';
import { useSession } from '../../SessionContext';
import { getWallet } from '../../controllers/store/wallet';
import CreateWallet from '../../components/main/Wallet/CreateWallet';
const Wallet = () => {

  const { userData: user, userState, getUser } = useSession()
  const selectOptions = [
    'Deposits',
    'Withdraw',
  ];
  const [selected, setSelected] = useState(selectOptions[0]);
  const [wallets, setWallets] = useState([]);
  const [showWallet, setShowWallet] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await getWallet(user._id);
      setWallets(response);
      if (response.length > 0) {
        setSelectedWallet(response[0]);
      }
      if (selected === 'Withdraw') {
        getUser();
      }
      setLoading(false);
    }
    getData();
  }, [selected]);

  return (
    <>
      {
        userState === 'loading'
          ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>LOADING...</div>
          :
          <Wrapper>
            <TitleContainer>
              <div className='titleWrap'>
                <TitleIcon src="/assets/icons/walletActive.png" />
                <Title>
                  {selectedWallet?.nickname ?? "Select Wallet"}
                  {" "}<img onClick={() => setShowWallet(!showWallet)} className={showWallet ? "active" : null} src='assets/icons/arrowDown.svg' width={20} alt='down' />
                </Title>
              </div>
              {showWallet ? (
                <div style={{ position: "relative" }}>
                  <WalletDiv>
                    {wallets.map(wallet => (

                      <p onClick={() => setSelectedWallet(wallet)} className={`${wallet.nickname === selectedWallet?.nickname ? "title" : "item"}`}>
                        {wallet.nickname}
                      </p>
                    ))}
                    <button onClick={() => { setSelected("CreateWallet"); setShowWallet(false) }} type='button'>+ Add Wallet</button>
                  </WalletDiv>
                </div>
              ) : ""}
            </TitleContainer>
            <BalanceContainer>
              <BalanceTitle>Total balance</BalanceTitle>
              <Balance>{user?.balance}</Balance>
              <Coin src="/assets/icons/coin.png" />
            </BalanceContainer>
            <Selector>
              {selectOptions.map((option, i) => {
                return <Option key={i} onClick={() => { setSelected(option) }} selected={selected === option}>{option}</Option>
              })}
            </Selector>
            {selected === 'Deposits' && <Orders selectedWallet={selectedWallet} user={user} loading={loading} />}
            {selected === 'Withdraw' && <Withdraw user={user} selectedWallet={selectedWallet}  />}
            {/* {selected === 'Transfer' && <Transfer user={user} />} */}
            {selected === 'CreateWallet' && <CreateWallet setSelected={setSelected} user={user} />}
          </Wrapper>
      }
    </>
  )
}

export default Wallet