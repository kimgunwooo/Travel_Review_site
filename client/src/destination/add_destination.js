import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const EXPRESS_URL = 'https://travel-review.run.goorm.site';

function AddTravelDestination() {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  
  function changeImageName(e) {
    const file = e.target.files[0];
    const filenameParts = file.name.split('.');
    const extension = filenameParts[filenameParts.length - 1];
    const modifiedFile = new File([file], name + '.' + extension, { type: 'image/' + extension });
    setImage(modifiedFile);
  }
  
  async function addDestination() {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('country', country);
    formData.append('region', region);
    formData.append('description', description);
    formData.append('image',image)
    
    
    try {
      const res = await axios.post(EXPRESS_URL + '/destination', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res.data);
      navigate(`/destination`);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', my: 4 }}>
      <h2>여행지 추가</h2>
      <Stack spacing={2} sx={{ mb: 2 }}>
        <TextField fullWidth label="여행지 이름" variant="outlined" value={name} onChange={e => setName(e.target.value)} />
        <TextField fullWidth label="국가" variant="outlined" value={country} onChange={e => setCountry(e.target.value)} />
        <TextField fullWidth label="지역" variant="outlined" value={region} onChange={e => setRegion(e.target.value)} />
        <TextField fullWidth label="설명" multiline minRows={3} maxRows={6} variant="outlined" value={description} onChange={e => setDescription(e.target.value)} />
        <input type="file" onChange={e => changeImageName(e)} />
        <Button variant="contained" onClick={() => addDestination()}>추가</Button>
      </Stack>
    </Box>
  );
}

export default AddTravelDestination;