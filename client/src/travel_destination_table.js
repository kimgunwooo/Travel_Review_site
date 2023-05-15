import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '@mui/material/Button';



// 3010 포트 도메인
// URL 맨 뒤에 / (슬래시) 없어야 하므로 주의할 것
const EXPRESS_URL = 'https://travel-review.run.goorm.site'


function TravelDestinationTable() {
  const [items, setItems] = useState([])
  useEffect(() => {
    refresh()
  }, [])
  
  async function refresh() {
    const res = await axios.get(EXPRESS_URL + '/destination')
    console.log(res.data)
    setItems(res.data)
  }
  
  //사이트 이동
  const navigate = useNavigate();
  function goToReviews(destinationId) {
    navigate(`/destination/review/${destinationId}`);
  }
  function goToAdd() {
    navigate('/destination/add');
  }
  function handleUpdateClick(event, id) {
    event.stopPropagation(); //이벤트 버블링 방지
    navigate(`/destination/edit/${id}`);
  }
  async function handleDeleteClick(event,id) {
    event.stopPropagation();
    await axios.delete(`${EXPRESS_URL}/destination/${id}`);
    refresh();
  }
  
  
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <h2>여행지 리스트</h2>
      <Fab color="primary"
        sx={{
          position: "fixed",
          top: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2)
        }}
        onClick={() => { refresh() }}>
        <RefreshIcon/>
      </Fab>
      <Fab color="primary"
        sx={{
          position: "fixed",
          top: (theme) => theme.spacing(9),
          right: (theme) => theme.spacing(2)
        }}
        onClick={() => { goToAdd() }}>
        <AddIcon />
      </Fab>
      <TableContainer sx={{ maxHeight: 545 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>리스트</TableCell>
              <TableCell>여행지</TableCell>
              <TableCell>국가</TableCell>
              <TableCell>지역</TableCell>
              <TableCell>설명</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>수정/삭제</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { items.map( (destination, i) => <TableRow hover role="checkbox" key={i} onClick={() => goToReviews(destination.destination_id)}>
                <TableCell>{i+1}</TableCell>
                <TableCell>{destination.name}</TableCell>
                <TableCell>{destination.country}</TableCell>
                <TableCell>{destination.region}</TableCell>
                <TableCell>{destination.description}</TableCell>
                { 
                  destination.image == '' 
                  ? <TableCell/>
                  : <TableCell><img src={process.env.PUBLIC_URL + `/images/${destination.image}.png`} alt='이미지'/></TableCell>
                }
                <TableCell>
                  <Button color="primary" onClick={(event) => handleUpdateClick(event,destination.destination_id)}>수정</Button>
                  <Button color="secondary" onClick={(event) => handleDeleteClick(event,destination.destination_id)}>삭제</Button>
                </TableCell>
                </TableRow>) }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default TravelDestinationTable