import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';



// 3010 포트 도메인
// URL 맨 뒤에 / (슬래시) 없어야 하므로 주의할 것
const EXPRESS_URL = 'https://travel-review.run.goorm.site'


function TravelDestinationTable() {
  const [items, setItems] = useState([])
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState('');
  
  useEffect(() => {
    refresh()
  }, [])
  
  async function refresh() {
    const res = await axios.get(EXPRESS_URL + '/destination')
    setItems(res.data)
  }
  function goToReviews(destinationId) { //리뷰 페이지
    navigate(`/destination/${destinationId}/review`);
  }
  function goToAdd() { //추가
    navigate('/destination/add');
  }
  function handleUpdateClick(event, id) { //수정
    event.stopPropagation(); //이벤트 버블링 방지
    navigate(`/destination/${id}/edit`);
  }
  async function handleDeleteClick(event,id) { //삭제
    event.stopPropagation();
    await axios.delete(`${EXPRESS_URL}/destination/${id}`);
    refresh();
  }
  function handleSearchClick() { //검색
    if (searchKeyword.trim() === '') {
      refresh();
    } else {
      const filteredItems = items.filter( 
        (item) => //여행지, 국가, 지역 필드에서 검색어에 해당하는 값을 찾음.
          item.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          item.country.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          item.region.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      
      if (selectedItem !== '') {
      filteredItems = filteredItems.filter(
        (item) => item.someProperty === selectedItem // Replace someProperty with the actual property you want to filter by
      );
    }
      setItems(filteredItems);
    }
  }
  
  function handleDropdownChange(event) {
    const selectedValue = event.target.value;
    setSelectedItem(selectedValue);
    
    if (selectedValue === 'option1') {//최신순
      refresh();
    }
    else if (selectedValue === 'option2') {//평점순
      const sortedItems = [...items].sort((a, b) => a.average_rating - b.average_rating);
      setItems(sortedItems);
    }
  }
  
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <h2>여행지 리스트</h2>
      <Fab color="primary"
        sx={{
          position: "fixed",
          top: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2)
        }}
        onClick={() => { refresh() }}>
        <RefreshIcon/>
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
        <Select
          value={selectedItem}
          onChange={(e) => handleDropdownChange(e)}
          variant="outlined"
          size="small"
        >
          <MenuItem value="">정렬</MenuItem>
          <MenuItem value="option1">최신순</MenuItem>
          <MenuItem value="option2">평점순</MenuItem>
        </Select>
      </Box>
      <TableContainer sx={{ maxHeight: 545 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>여행지</TableCell>
              <TableCell>국가</TableCell>
              <TableCell>지역</TableCell>
              <TableCell>설명</TableCell>
              <TableCell>평점(평균)</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>수정</TableCell>
              <TableCell>삭제</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { items.slice(0).reverse().map( (destination, i) => <TableRow hover role="checkbox" key={i} onClick={() => goToReviews(destination.destination_id)}>
                <TableCell>{i+1}</TableCell>
                <TableCell>{destination.name}</TableCell>
                <TableCell>{destination.country}</TableCell>
                <TableCell>{destination.region}</TableCell>
                <TableCell>{destination.description}</TableCell>
                <TableCell>{destination.average_rating}</TableCell>
                { 
                  destination.image == '' 
                  ? <TableCell/>
                  : <TableCell><img src={process.env.PUBLIC_URL + `/images/${destination.name}.jpg`} alt='이미지'/></TableCell>
                }
                <TableCell>
                  <Button color="primary" onClick={(event) => handleUpdateClick(event,destination.destination_id)}>수정</Button>
                </TableCell>
                <TableCell>
                  <Button color="secondary" onClick={(event) => handleDeleteClick(event,destination.destination_id)}>삭제</Button>
                </TableCell>
                </TableRow>) }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default TravelDestinationTable