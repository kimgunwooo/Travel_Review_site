import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const EXPRESS_URL = 'https://travel-review.run.goorm.site';

function EditMember() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getMember() {
      const res = await axios.get(`${EXPRESS_URL}/member/${id}`);
      setName(res.data[0].name);
      setEmail(res.data[0].email);
      setAge(res.data[0].age);
      setProfileImage(res.data[0].profile_image);
    }
    getMember();
  }, [id]);

  async function updateMember() {
    const res = await axios.put(`${EXPRESS_URL}/member/${id}`, { name, email, age, profile_image: profileImage });
    console.log(res.data);
    navigate('/member');
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', my: 4 }}>
      <h2>멤버 정보 수정</h2>
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
        <Button variant="contained" onClick={updateMember}>
          수정
        </Button>
      </Stack>
    </Box>
  );
}

export default EditMember;