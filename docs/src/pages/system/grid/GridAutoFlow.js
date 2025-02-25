import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        p: 1,
        borderRadius: 1,
        textAlign: 'center',
        fontSize: '1rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default function GridAutoFlow() {
  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'grid',
          gridAutoFlow: 'row',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: 'repeat(2, 50px)',
          gap: 1,
        }}
      >
        <Item sx={{ gridColumn: '1', gridRow: '1 / 3' }}>1</Item>
        <Item>2</Item>
        <Item>3</Item>
        <Item>4</Item>
        <Item sx={{ gridColumn: '5', gridRow: '1 / 3' }}>5</Item>
      </Box>
    </div>
  );
}
