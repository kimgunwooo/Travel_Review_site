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


function AddTravelDestination() {
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [region, setRegion] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const navigate = useNavigate();

  async function addDestination() {
    const res = await axios.post(EXPRESS_URL + '/destination', { name, country, region, description, image })
    console.log(res.data)
    navigate(`/destination`);
  }
  
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', my: 4 }}>
      <h2>여행지 추가</h2>
      <Stack spacing={2} sx={{ mb: 2 }}>
        <TextField fullWidth label="여행지 이름" variant="outlined" value={name} onChange={e => setName(e.target.value)}/>
        <TextField fullWidth label="국가" variant="outlined" value={country} onChange={e => setCountry(e.target.value)}/>
        <TextField fullWidth label="지역" variant="outlined" value={region} onChange={e => setRegion(e.target.value)}/>
        <TextField fullWidth label="설명" multiline minRows={3} maxRows={6} variant="outlined" value={description} onChange={e => setDescription(e.target.value)}/>
        <TextField fullWidth label="이미지" variant="outlined" value={image || ''} onChange={e => setImage(e.target.value)}/>
        <Button variant="contained" onClick={() => addDestination()}>추가</Button>
      </Stack>
    </Box>
  )
}

export default AddTravelDestination