import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';


// 3010 포트 도메인
// URL 맨 뒤에 / (슬래시) 없어야 하므로 주의할 것
const EXPRESS_URL = 'https://travel-review.run.goorm.site'


function AddReview() {
  const [writer, setWriter] = useState('')
  const [rating, setRating] = useState('')
  const [body, setBody] = useState('')
  const [showAlert, setShowAlert] = useState(false);
  const [showRatingAlert, setShowRatingAlert] = useState(false);
  const [showBodyAlert, setShowBodyAlert] = useState(false);
  const [showWriterAlert, setShowWriterAlert] = useState(false);
  const navigate = useNavigate();
  
  async function addReview() {
    const destinationId = window.location.pathname.split('/').slice(-3)[0];
    
    const writerResponse = await axios.get(`${EXPRESS_URL}/member/${writer}`);
    console.log(writerResponse.data)
    if (!writerResponse.data.exists) {
      setShowWriterAlert(true);
      return;
    }
    if (!writer) {
      setShowAlert(true);
      return;
    }
    if (!rating || rating < 1 || rating > 5) {
      // Show alert for invalid rating
      setShowRatingAlert(true);
      return;
    }

    if (!body) {
      // Show alert for empty review content
      setShowBodyAlert(true);
      return;
    }
    
    const res = await axios.post(`${EXPRESS_URL}/destination/${destinationId}/review`, { writer, rating, body })
    console.log(res.data)
    navigate(`/destination/${destinationId}/review`);
  }
  
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', my: 4 }}>
      <h2>리뷰 추가</h2>
      {showWriterAlert && (
        <Alert severity="error" onClose={() => setShowWriterAlert(false)}>작성자 이름이 존재하지 않습니다.</Alert>
      )}
      <Stack spacing={2} sx={{ mb: 2 }}>
        {showAlert && (
          <Alert severity="error" onClose={() => setShowAlert(false)}>작성자를 입력해주세요.</Alert>
        )}
        <TextField fullWidth label="작성자" variant="outlined" value={writer} onChange={e => setWriter(e.target.value)}/>
        {showRatingAlert && (
          <Alert severity="error" onClose={() => setShowRatingAlert(false)}>별점은 1부터 5까지 입력해주세요.</Alert>
        )}
        <TextField fullWidth label="별점 (1-5)" variant="outlined" type="number" value={rating} onChange={e => setRating(e.target.value)}/>
        {showBodyAlert && (
          <Alert severity="error" onClose={() => setShowBodyAlert(false)}>리뷰 내용을 입력해주세요.</Alert>
        )}
        <TextField fullWidth label="내용" multiline minRows={3} maxRows={6} variant="outlined" value={body} onChange={e => setBody(e.target.value)}/>
        <Button variant="contained" onClick={() => addReview()}>추가</Button>
      </Stack>
    </Box>
  )
}

export default AddReview