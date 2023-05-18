import './App.css'
import Main from './main/main';
import TravelDestinationTable from './destination/travel_destination_table'
import ReviewList from './review/review_list'
import AddTravelDestination from './destination/add_destination'
import EditTravelDestination from './destination/edit_destination'
import AddReview from './review/add_review'
import AddMember from './member/add_member'
import MemberList from './member/member'

import { BrowserRouter, Routes,Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <h1>여행 리뷰 블로그</h1>
        <Routes>
          <Route exact path="/" element={<Main/>} />
          <Route exact path="/destination" element={<TravelDestinationTable/>} />
          <Route exact path="/destination/:destinationId/review" element={<ReviewList/>} />
          <Route exact path="/destination/add" element={<AddTravelDestination/>} />
          <Route exact path="/destination/:id/edit" element={<EditTravelDestination/>} />
          <Route exact path="/destination/:id/review/add" element={<AddReview/>} />
          <Route exact path="/member/add" element={<AddMember/>}/>
          <Route exact path="/member" element={<MemberList/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App