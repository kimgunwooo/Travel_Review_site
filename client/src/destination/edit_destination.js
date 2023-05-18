import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const EXPRESS_URL = 'https://travel-review.run.goorm.site'

function EditTravelDestination() {
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [region, setRegion] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getDestination() {
      const res = await axios.get(`${EXPRESS_URL}/destination/${id}`)
      setName(res.data[0].name)
      setCountry(res.data[0].country)
      setRegion(res.data[0].region)
      setDescription(res.data[0].description)
      setImage(res.data[0].image)
    }
    getDestination();
  }, [id])

  async function updateDestination() {
    const res = await axios.put(`${EXPRESS_URL}/destination/${id}`, { name, country, region, description, image })
    console.log(res.data)
    navigate(`/destination`);
  }
  
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', my: 4 }}>
      <h2>여행지 수정</h2>
      <Stack spacing={2} sx={{ mb: 2 }}>
        <TextField fullWidth label="여행지 이름" variant="outlined" value={name} onChange={e => setName(e.target.value)}/>
        <TextField fullWidth label="국가" variant="outlined" value={country} onChange={e => setCountry(e.target.value)}/>
        <TextField fullWidth label="지역" variant="outlined" value={region} onChange={e => setRegion(e.target.value)}/>
        <TextField fullWidth label="설명" multiline minRows={3} maxRows={6} variant="outlined" value={description} onChange={e => setDescription(e.target.value)}/>
        <TextField fullWidth label="이미지" variant="outlined" value={image} onChange={e => setImage(e.target.value)}/>
        <Button variant="contained" onClick={() => updateDestination()}>수정</Button>
      </Stack>
    </Box>
  )
}

export default EditTravelDestination