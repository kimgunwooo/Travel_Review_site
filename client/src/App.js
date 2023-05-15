import './App.css'
import TravelDestinationTable from './travel_destination_table'
import ReviewList from './review_list'
import AddTravelDestination from './add_destination'
import EditTravelDestination from './edit_destination'

import { BrowserRouter, Routes,Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <h1>여행 리뷰 블로그</h1>
        <Routes>
          <Route exact path="/destination" element={<TravelDestinationTable/>} />
          <Route exact path="/destination/review/:destinationId" element={<ReviewList/>} />
          <Route exact path="/destination/add" element={<AddTravelDestination/>} />
          <Route exact path="/destination/edit/:id" element={<EditTravelDestination/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App