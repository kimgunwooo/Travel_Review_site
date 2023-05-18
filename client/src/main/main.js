import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Stack, Typography } from '@mui/material';

const Main = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h1" component="h1" gutterBottom>
          여행 리뷰 블로그
        </Typography>
        <Stack spacing={2} direction="row" justifyContent="center">
          <Button
            component={RouterLink}
            to="/member"
            variant="contained"
            size="large"
          >
            멤버 목록
          </Button>
          <Button
            component={RouterLink}
            to="/destination"
            variant="contained"
            size="large"
          >
            여행지 리스트
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default Main;