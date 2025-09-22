import React from 'react';
import { Pagination as MuiPagination, Select, MenuItem, FormControl, InputLabel, Box, Typography } from '@mui/material';
import { useMyAppDispatch, useMyAppSelector } from '../../store/store';
import { setPage, setLimit, setFilter } from '../../store/todoSlice';

const Pagination: React.FC = () => {
  const toDispatch = useMyAppDispatch();
  const { currentPage, limit, totalPages, total, filter } = useMyAppSelector((state) => state.todos);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    toDispatch(setPage(page));
    console.log('event', event);
  };

  const handleLimitChange = (event: any) => {
    toDispatch(setLimit(event.target.value));
  };

  const handleFilterChange = (event: any) => {
    toDispatch(setFilter(event.target.value));
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0', flexWrap: 'wrap', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Filter</InputLabel>
          <Select value={filter} onChange={handleFilterChange} label="Filter">
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl size="small" sx={{ minWidth: 100 }}>
          <InputLabel>Per page</InputLabel>
          <Select value={limit} onChange={handleLimitChange} label="Per page">
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Total: {total} | Page {currentPage} of {totalPages}
        </Typography>
        <MuiPagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"

        />
      </Box>
    </Box>
  );
};

export default Pagination;
