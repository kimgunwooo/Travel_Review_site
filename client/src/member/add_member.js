import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const EXPRESS_URL = 'https://travel-review.run.goorm.site';

function AddMember() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  
  function changeImageName(e) {
    const file = e.target.files[0];
    const filenameParts = file.name.split('.');
    const extension = filenameParts[filenameParts.length - 1];
    const modifiedFile = new File([file], name + '.' + extension, { type: 'image/' + extension });
    console.log()
    setProfileImage(modifiedFile);
  }

  async function addMember() {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('age', age);
    formData.append('image',profileImage)
    console.log("profileImage :",profileImage)
    const writerResponse = await axios.get(`${EXPRESS_URL}/member/${name}`);
    console.log(writerResponse.data)
    if (writerResponse.data.length > 0){
      setShowAlert(true);
      return;
    }
    try {
      const res = await axios.post(EXPRESS_URL + '/member', formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
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
      {showAlert && (
        <Alert severity="error" onClose={() => setShowAlert(false)}>
          멤버 이름 또는 이메일이 이미 존재합니다.
        </Alert>
      )}
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
        <input type="file" onChange={e => changeImageName(e)} />
        
        <Button variant="contained" onClick={addMember}>
          추가
        </Button>
      </Stack>
    </Box>
  );
}

export default AddMember;