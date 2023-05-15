import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// 3010 포트 도메인
// URL 맨 뒤에 / (슬래시) 없어야 하므로 주의할 것
const EXPRESS_URL = 'https://travel-review.run.goorm.site'


function AddReview() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [rating, setRating] = useState('')
  const navigate = useNavigate();
  
  async function addReview() {
    const destinationId = window.location.pathname.split('/').pop();
    const res = await axios.post(EXPRESS_URL + '/destination/' + destinationId + '/review', { title, body, rating })
    console.log(res.data)
    navigate(`/destination/review/${destinationId}`);
  }
  
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', my: 4 }}>
      <h2>리뷰 추가</h2>
      <Stack spacing={2} sx={{ mb: 2 }}>
        <TextField fullWidth label="제목" variant="outlined" value={title} onChange={e => setTitle(e.target.value)}/>
        <TextField fullWidth label="내용" multiline minRows={3} maxRows={6} variant="outlined" value={body} onChange={e => setBody(e.target.value)}/>
        <TextField fullWidth label="별점 (1-5)" variant="outlined" type="number" value={rating} onChange={e => setRating(e.target.value)}/>
        <Button variant="contained" onClick={() => addReview()}>추가</Button>
      </Stack>
    </Box>
  )
}

export default AddReview