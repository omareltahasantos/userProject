import React from 'react';
import PaginationComponent from '@mui/material/Pagination'; // Cambia el nombre de la importación si es necesario
import Stack from '@mui/material/Stack';

const Pagination = ({ limit, offset, total, onPageChange }) => {
    const pageCount = Math.ceil(total / limit);

    const handleChange = (event, value) => {
        const newOffset = (value - 1) * limit;
        onPageChange(newOffset);
    };

    return (
        <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
            <PaginationComponent
                count={pageCount}
                page={Math.floor(offset / limit) + 1}
                onChange={handleChange}
                color="primary"
            />
            <span>
                Página {Math.floor(offset / limit) + 1} de {pageCount}
            </span>
        </Stack>
    );
};

export default Pagination;
