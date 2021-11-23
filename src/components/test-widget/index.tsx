import React from 'react';
import Rating from '@mui/material/Rating';



export default function TestWidget({ rating }) {

    return (
        <Rating name="rating widget from @mui" value={rating || 0} readOnly/>
    )
}