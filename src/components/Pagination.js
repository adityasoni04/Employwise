import React from 'react';
import { Pagination as MuiPagination, Stack } from '@mui/material';

const Pagination = ({ page, onChange, totalPages }) => (
  <Stack spacing={2} alignItems="center">
    <MuiPagination count={totalPages} page={page} onChange={(_, value) => onChange(value)} />
  </Stack>
);

export default Pagination;
