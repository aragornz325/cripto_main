import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSession } from '../SessionContext'
import EditProfile from './EditProfile'
import Home from './Home'
import Language from './Language'
import PasswordAndSecurity from './Password&Security'
import Settings from './Settings'
import TermsOfService from './TermsOfService'
import PokerRooms from './Rooms'
import Wallet from './Wallet'
import Points from './Points'
import RecentlyPlayed from './RecentlyPlayed'
import Favorites from './Favorites'
import Blackjack from './blackjack/Blackjack'
import Poker from './Poker/Poker'
import PokerHoldem from './PokerHoldem'
import Roulette from './Roulette/Roulette'
import Profile from './Profile/Profile'
import Admin from './Admin/Admin'
import Feedback from './Feedback/Feedback'
import Transaction from './Transaction'
import Stats from '../components/Stats/Stats'
import ErrorComponent from './ErrorComponent/ErrorComponent'

const Pages = () => {
    const { userData } = useSession()

    return (
        <>
            {
                userData?.isAdmin ? 
                    <Routes>
                        <Route path='/' element={<Stats/>} />
                    </Routes>
                    : 
                    <Routes>
                        <Route path="" element={<Home/>}/>
                        <Route path="settings" element={<Settings/>}/>
                        <Route path="editprofile" element={<EditProfile/>}/>
                        <Route path="language" element={<Language/>}/>
                        <Route path="password&security" element={<PasswordAndSecurity/>}/>
                        <Route path="termsofservice" element={<TermsOfService/>}/>
                        <Route path="poker-holdem" element={<PokerRooms/>}/>
                        <Route path='poker-holdem/:roomId' element={<PokerHoldem/>}/>
                        <Route path="wallet" element={<Wallet/>}/>
                        <Route path="points" element={<Points/>}/>
                        <Route path="recent" element={<RecentlyPlayed/>}/>
                        <Route path="favorites" element={<Favorites/>}/>
                        <Route path="blackjack" element={<Blackjack/>}/>
                        <Route path="poker" element={<Poker/>}/>
                        <Route path="roulette" element={<Roulette/>}/>
                        <Route path="profile" element={<Profile/>}/>
                        <Route path="admin" element={<Admin/>}/>
                        <Route path="feedback" element={<Feedback/>}/>
                        <Route path="transaction" element={<Transaction/>}/>
                        <Route path="*" element={<ErrorComponent/>}/>
                    </Routes>
            }
        </>
    )
}

export default Pages