import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Stack, Typography } from '@mui/material';

const Main = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="h1" component="h1" gutterBottom>
            Before The Trip!
          </Typography>
          <Typography variant="h4" component="h4" gutterBottom>
            여행가기전 둘러보기 좋은
            리뷰사이트입니다
          </Typography>
          <Stack spacing={2} direction="row" justifyContent="center" mt={4}>
            <Button
              component={RouterLink}
              to="/member"
              variant="contained"
              size="large"
              color="primary"
            >
              멤버 목록
            </Button>
            <Button
              component={RouterLink}
              to="/destination"
              variant="contained"
              size="large"
              color="primary"
            >
              여행지 리스트
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}

export default Main;