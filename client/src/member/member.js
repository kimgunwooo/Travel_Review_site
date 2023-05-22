import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

// 3010 포트 도메인
// URL 맨 뒤에 / (슬래시) 없어야 하므로 주의할 것
const EXPRESS_URL = 'https://travel-review.run.goorm.site'

function MemberList() {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    const response = await axios.get(EXPRESS_URL + '/member');
    setMembers(response.data);
  }

  function goToAdd() { //추가
    navigate('/member/add');
  }
  function handleUpdateClick(event, id) { //수정
    event.stopPropagation(); //이벤트 버블링 방지
    navigate(`/member/${id}/edit`);
  }
  async function handleDeleteClick(event,id) { //삭제
    event.stopPropagation();
    await axios.delete(`${EXPRESS_URL}/member/${id}`);
    fetchMembers();
  }
  function handleSearchClick() {
    if (searchKeyword.trim() === '') {
      fetchMembers();
    } else {
      const filteredItems = members.filter(
        (member) =>
          member.name.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setMembers(filteredItems);
    }
  }
  
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <h2>멤버 목록</h2>
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          top: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2),
        }}
        onClick={fetchMembers}
      >
        <RefreshIcon />
      </Fab>
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
          label="검색어를 입력하세요"
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
              <TableCell>리스트</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>이메일</TableCell>
              <TableCell>나이</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>수정</TableCell>
              <TableCell>삭제</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { members.map( (member, i) => <TableRow key={i}>
                <TableCell>{i+1}</TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.age}</TableCell>
                { 
                  member.profile_image == '' 
                  ? <TableCell/>
                  : <TableCell><img src={process.env.PUBLIC_URL + `/images/member/${member.profile_image}.jpg`} alt='이미지'/></TableCell>
                }
                <TableCell>
                  <Button color="primary" onClick={(event) => handleUpdateClick(event,member.member_id)}>수정</Button>
                </TableCell>
                <TableCell>
                  <Button color="secondary" onClick={(event) => handleDeleteClick(event,member.member_id)}>삭제</Button>
                </TableCell>
                </TableRow>) }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default MemberList;