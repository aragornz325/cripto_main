import React, { useState, useEffect } from 'react';
import getStats from '../../controllers/stats/getStats';
import { Balances, Balance, BalanceText, FeedbackTitle, List, Stat, StatItem, StatItemMobile, Wrapper, StatBox, StatBoxTitle, StatBoxInfo, Tools, ToolIcon, ToolText, Tool, Earnings, AdminTitle, StatBoxPercent, Feedbacks, Feedback, FeedbackText } from './styles';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { feedbackController, statsController } from '../../controllers';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Admin = () => {

  const [stats, setStats] = useState(undefined);
  const [earned, setEarned] = useState(undefined);
  const [percent, setPercent] = useState(undefined);
  const [expanded, setExpanded] = useState(false);
  const [winningFilterMotion, setWinningFilterMotion] = useState(false);
  const [dateFilterMotion, setDateFilterMotion] = useState(false);
  const [filterSelection, setFilterSelection] = useState('date');
  const [earningsData, setEarningsData] = useState([]);
  const [earningsLabels, setEarningsLabels] = useState([]);
  const [graphPoints, setGraphpoints] = useState(100);
  const [feedbackData, setFeedbackData] = useState(undefined);
  const [balances, setBalances] = useState(undefined);

  useEffect(() => {
    const asyncEffect = async () => {
      const newStats = await statsController.getStats();
      const newFeedbacks = await feedbackController.getFeedback();
      const newBalances = await statsController.getBalances();
      let winnings = {};
      let bets = {};
      const newEarningsData = [];
      const newEarningsLabels = [];
    newStats.stats.map((stat, index) => {
      if (index < graphPoints) {
        newEarningsData.push(stat.winning);
        newEarningsLabels.push(stat.game);
      }
      if (!winnings[stat.game]) {
        winnings[stat.game] = 0;
      }
      if(!bets[stat.game]){
        bets[stat.game] = [0, 0];
      }
      if(stat.winning > 0){
        bets[stat.game][0] += stat.winning;
      }else{
        bets[stat.game][1] += stat.winning;
      }
      return winnings[stat.game] += stat.winning;
    });
    for(let property in bets){
      bets[property] = 100 + bets[property][1] / bets[property][0] * 100;
    }
    setPercent(JSON.stringify({...bets}))
    setEarned(JSON.stringify({ Total: newStats.earnings, ...winnings }));
    setEarningsData(newEarningsData.reverse());
    setEarningsLabels(newEarningsLabels.reverse());
    setFeedbackData(JSON.stringify(newFeedbacks));
    setBalances(newBalances);
    return setStats(JSON.stringify(newStats.stats));
  }
  asyncEffect()
  }, [])

  const filterStatsByAmount = () => {
    const compare = (a, b) => {
      if (winningFilterMotion) {
        return a.winning - b.winning;
      } else {
        return b.winning - a.winning;
      }
    }
    setStats(JSON.stringify(JSON.parse(stats).sort(compare)));
    return;
  }

  const filterStatsByDate = async () => {
    if (filterSelection === 'date') {
      return setStats(JSON.stringify(JSON.parse(stats).reverse()));
    }
    const newStats = await getStats();
    setEarned(JSON.stringify(newStats.earnings));
    return setStats(JSON.stringify(newStats.stats));
  }

  return (
    <Wrapper>
      <AdminTitle>Admin</AdminTitle>
      <List style={{ height: expanded ? 80 + 'vh' : 150 + 'px' }}>
        {stats && JSON.parse(stats).map((stat) => {
          const date = new Date(stat.date).toString().substr(4, 20)
          return <Stat>
            <StatItemMobile>{stat.game}</StatItemMobile>
            <StatItemMobile>{stat.winning}</StatItemMobile>
            <StatItemMobile>{stat.description}</StatItemMobile>
            <StatItem>{stat.userId}</StatItem>
            <StatItem>{date}</StatItem>
          </Stat>
        })}
      </List>
      <Tools>
        <Tool onClick={() => setExpanded(!expanded)}>
          <ToolIcon src={`assets/icons/expand_${expanded ? 'less' : 'more'}.svg`} />
          <ToolText>{expanded ? 'Close' : 'Expand'}</ToolText>
        </Tool>
        <Tool onClick={() => { filterStatsByAmount(); filterSelection === 'winnings' && setWinningFilterMotion(!winningFilterMotion); setFilterSelection('winnings'); }} selected={filterSelection === 'winnings'}>
          <ToolIcon src={`assets/icons/expand_${!winningFilterMotion ? 'less' : 'more'}.svg`} />
          <ToolText>Winnings</ToolText>
        </Tool>
        <Tool onClick={() => { filterStatsByDate(); filterSelection === 'date' && setDateFilterMotion(!dateFilterMotion); setFilterSelection('date'); }} selected={filterSelection === 'date'}>
          <ToolIcon src={`assets/icons/expand_${!dateFilterMotion ? 'less' : 'more'}.svg`} />
          <ToolText>Date</ToolText>
        </Tool>
      </Tools>
      <Earnings>
        {earned && Object.keys(JSON.parse(earned)).map(earning => {
          return <StatBox>
            <StatBoxTitle style={earning === 'Total' ? JSON.parse(earned)[earning] > 0 ? { color: 'gold' } : { color: 'red' } : {}}>{earning}</StatBoxTitle>
            <StatBoxInfo>U$D {JSON.parse(earned)[earning] ? JSON.parse(earned)[earning] : 'Loading...'}</StatBoxInfo>
            <StatBoxPercent>{JSON.parse(percent)[earning] && JSON.parse(percent)[earning].toString().slice(0, 7) + '%'}</StatBoxPercent>
          </StatBox>
        })}
      </Earnings>
      <div style={{ width: '80%', margin: '100px 0' }}>
        {earningsData && <Line
          data={{
            labels: earningsLabels,
            datasets: [
              {
                label: 'Earned',
                fill: false,
                lineTension: .4,
                backgroundColor: '#000',
                borderColor: '#666',
                borderWidth: 2,
                data: earningsData,
              }
            ]
          }}
        />}
      </div>
      <FeedbackTitle>Feedback</FeedbackTitle>
      <Feedbacks>
        {feedbackData && JSON.parse(feedbackData).map(feedback => {
          return <Feedback>
            <FeedbackText>{feedback.name}</FeedbackText>
            <FeedbackText>{feedback.email}</FeedbackText>
            <FeedbackText style={{width: '55%'}}>{feedback.message}</FeedbackText>
          </Feedback>
        })}
      </Feedbacks>
      <FeedbackTitle>Balances</FeedbackTitle>
      <Balances>
        {balances && balances.map(balance => {
          return <Balance>
            <BalanceText>{balance[0]}</BalanceText>
            <BalanceText>{balance[1]}</BalanceText>
          </Balance>
        })}
      </Balances>
      {/* <button onClick={async() => { await deleteAllStats() }}>DELETE ALL</button> */}
    </Wrapper>
  )
}

export default Admin;