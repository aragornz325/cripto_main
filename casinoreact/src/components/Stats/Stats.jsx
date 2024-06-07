import React, { useEffect } from 'react'
import { useState } from 'react'
import Layout from '../Layout'
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
import { Line } from 'react-chartjs-2'
import { ChartContainer } from './components.scss';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
  

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Games use by hour',
      },
    },
    labels: { color: 'white' },
    scales: { 
        yAxes: { ticks: { color: 'rgb(255, 255, 255)'}, grid: { color: 'rgba(255, 255, 255, 0.626)'} }, 
        xAxes: { ticks: { color: 'rgb(255, 255, 255)'} },
        
    },
    color: 'white',
    borderColor: 'rgb(255, 255, 255)'
  };

const Stats = () => {
    const [ loading, setLoading ] = useState(true)
    const [ data, setData ] = useState({})

    useEffect(() => {
        fetch('https://apicasino.herokuapp.com/stats')
        .then((response) => {
            response.json()
            .then( body => {
                const { labels,poker,blackjack,roulette } = body
                setData({
                    labels,
                    datasets: [
                        {
                            label: 'Poker',
                            data: poker,
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                        {
                            label: 'BlackJack',
                            data: blackjack,
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                        {
                            label: 'Roulette',
                            data: roulette,
                            borderColor: 'rgb(53, 235, 62)',
                            backgroundColor: 'rgba(168, 235, 53, 0.5)',
                        }
                    ]
                })
                setLoading(false)
            })
        })
    },[])

    return (
        <Layout>
            <ChartContainer>
                <h2>Games use by hour</h2>
                {
                    loading ?
                    <div>LOADING</div>
                    : 
                    <Line data={data} options={{ ...options }} style={{ color: 'inherit' }}/>
                }
            </ChartContainer>
        </Layout>
    )
}

export default Stats