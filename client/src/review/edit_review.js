import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const EXPRESS_URL = 'https://travel-review.run.goorm.site';

function EditReview() {
  const [rating, setRating] = useState(0);
  const [reviewContent, setReviewContent] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getReview() {
      const res = await axios.get(`${EXPRESS_URL}/review/${id}`);
      setRating(res.data[0].rating);
      setReviewContent(res.data[0].review_content);
    }
    getReview();
  }, [id]);

  async function updateReview() {
    const updateData = {
      rating: rating,
      review_content: reviewContent
    };

    try {
      await axios.put(`${EXPRESS_URL}/review/${id}`, updateData);
      navigate(-1); // Navigate back to the previous page
    } catch (error) {
      console.error('Error updating review:', error);
    }
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', my: 4 }}>
      <h2>리뷰 수정</h2>
      <Stack spacing={2} sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Rating"
          variant="outlined"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <TextField
          fullWidth
          label="Review Content"
          variant="outlined"
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
        />
        <Button variant="contained" onClick={updateReview}>
          수정
        </Button>
      </Stack>
    </Box>
  );
}

export default EditReview;