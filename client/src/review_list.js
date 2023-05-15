import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Fab from '@mui/material/Fab';
import RefreshIcon from '@mui/icons-material/Refresh';

// 3010 포트 도메인
// URL 맨 뒤에 / (슬래시) 없어야 하므로 주의할 것
const EXPRESS_URL = 'https://travel-review.run.goorm.site'

function ReviewList() {
  const { destinationId } = useParams()
  const [destination, setDestination] = useState(null)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    async function fetchData() {
      const destinationResponse = await axios.get(`${EXPRESS_URL}/destination/${destinationId}`)
      const reviewResponse = await axios.get(`${EXPRESS_URL}/destination/review/${destinationId}`)
      setDestination(destinationResponse.data)
      setReviews(reviewResponse.data || []) // 리뷰가 없는 경우 빈 배열로 초기화
    }
    fetchData()
    }, [destinationId])

    if (!reviews) return <div>Loading...</div> // 리뷰가 null이나 undefined인 경우 처리
    if (!destination) {
      return <div>Loading...</div>
    }
  
    return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <h2>여행지 '{destination[0].name}'에 대한 리뷰</h2>
      <TableContainer sx={{ maxHeight: 545 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>작성자</TableCell>
              <TableCell>평점</TableCell>
              <TableCell>내용</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { reviews.map( (review, i) => <TableRow hover role="checkbox" key={i}>
              <TableCell>{review.writer_name}</TableCell>
              <TableCell>{review.rating}</TableCell>
              <TableCell>{review.review_content}</TableCell>
            </TableRow>) }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default ReviewList