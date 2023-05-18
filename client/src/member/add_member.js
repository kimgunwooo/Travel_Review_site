import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const EXPRESS_URL = 'https://travel-review.run.goorm.site';

function AddMember() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const navigate = useNavigate();

  async function addMember() {
    try {
      const res = await axios.post(EXPRESS_URL + '/member', {
        name,
        email,
        age,
        profile_image: profileImage
      });
      console.log(res.data);
      navigate(`/member`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', my: 4 }}>
      <h2>멤버 추가</h2>
      <Stack spacing={2} sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="이름"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="이메일"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="나이"
          variant="outlined"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <TextField
          fullWidth
          label="프로필 이미지"
          variant="outlined"
          value={profileImage}
          onChange={(e) => setProfileImage(e.target.value)}
        />
        <Button variant="contained" onClick={addMember}>
          추가
        </Button>
      </Stack>
    </Box>
  );
}

export default AddMember;