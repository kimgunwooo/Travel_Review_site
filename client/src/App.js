import './App.css'
import Main from './main/main';
import TravelDestinationTable from './destination/destination'
import ReviewList from './review/review_list'
import AddTravelDestination from './destination/add_destination'
import EditTravelDestination from './destination/edit_destination'
import AddReview from './review/add_review'
import AddMember from './member/add_member'
import MemberList from './member/member'
import EditMember from './member/edit_member'
import EditReview from './review/edit_review'

import { BrowserRouter, Routes,Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1>Before The Trip</h1>
        </Link>
        <Routes>
          <Route exact path="/" element={<Main/>} />
          <Route exact path="/destination" element={<TravelDestinationTable/>} />
          <Route exact path="/destination/:destinationId/review" element={<ReviewList/>} />
          <Route exact path="/destination/add" element={<AddTravelDestination/>} />
          <Route exact path="/destination/:id/edit" element={<EditTravelDestination/>} />
          <Route exact path="/destination/:id/review/add" element={<AddReview/>} />
          <Route exact path="/member/add" element={<AddMember/>}/>
          <Route exact path="/member" element={<MemberList/>}/>
          <Route exact path="/member/:id/edit" element={<EditMember/>}/>
          <Route exact path="/review/:id/edit" element={<EditReview/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App