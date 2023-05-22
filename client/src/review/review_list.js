import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Fab from '@mui/material/Fab';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// 3010 포트 도메인
// URL 맨 뒤에 / (슬래시) 없어야 하므로 주의할 것
const EXPRESS_URL = 'https://travel-review.run.goorm.site'

function ReviewList() {
  const { destinationId } = useParams()
  const [destination, setDestination] = useState(null)
  const [reviews, setReviews] = useState([])
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');

   useEffect(() => {
    fetchData();
  }, [destinationId]);

  async function fetchData() {
    try {
      const destinationResponse = await axios.get(`${EXPRESS_URL}/destination/${destinationId}`);
      const reviewResponse = await axios.get(`${EXPRESS_URL}/destination/${destinationId}/review`);
      setDestination(destinationResponse.data);
      setReviews(reviewResponse.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  if (!reviews) return <div>Loading...</div> // 리뷰가 null이나 undefined인 경우 처리
  if (!destination) {
    return <div>Loading...</div>
  }

  function goToAdd() { //추가
    navigate(`/destination/${destinationId}/review/add`);
  }
  function handleUpdateClick(event, id) { //수정
    event.stopPropagation(); //이벤트 버블링 방지
    navigate(`/review/${id}/edit`);
  }
  async function handleDeleteClick(event,id) { //삭제
    event.stopPropagation();
    await axios.delete(`${EXPRESS_URL}/review/${id}`);
    fetchData();
  }
  function handleSearchClick() { //검색
    if (searchKeyword.trim() === '') {
      fetchData();
    } else {
      const filteredItems = reviews.filter( 
        (item) => //rating 검색
          item.rating.toString().toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setReviews(filteredItems);
    }
  }
    
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <h2>여행지 '{destination[0].name}'에 대한 리뷰</h2>
      <Fab color="primary"
        sx={{
          position: "fixed",
          top: (theme) => theme.spacing(9),
          right: (theme) => theme.spacing(2)
        }}
        onClick={() => { goToAdd() }}>
        <AddIcon />
      </Fab>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, margin: 2 }}>
        <TextField
          id="search"
          label="평점 검색"
          type="search"
          variant="outlined"
          size="small"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <Button variant="contained" onClick={() => handleSearchClick()}>
          검색
        </Button>
      </Box>
      <TableContainer sx={{ maxHeight: 545 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>작성자</TableCell>
              <TableCell>별점</TableCell>
              <TableCell>내용</TableCell>
              <TableCell>수정</TableCell>
              <TableCell>삭제</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { reviews.slice(0).reverse().map( (review, i) => <TableRow hover role="checkbox" key={i}>
              <TableCell>{i+1}</TableCell>              
              <TableCell>{review.writer_name}</TableCell>
              <TableCell>{review.rating}</TableCell>
              <TableCell>{review.review_content}</TableCell>
              <TableCell>
                <Button color="primary" onClick={(event) => handleUpdateClick(event,review.review_id)}>수정</Button>
              </TableCell>
              <TableCell>
                <Button color="secondary" onClick={(event) => handleDeleteClick(event,review.review_id)}>삭제</Button>
              </TableCell>
            </TableRow>) }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default ReviewList