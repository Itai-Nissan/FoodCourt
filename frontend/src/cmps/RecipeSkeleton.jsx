import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const RecipeSkeleton = (props) => {
    return (
        <div className='food-details'>
            <Stack className='details-left food-skeleton' spacing={1}>
                <Skeleton variant="text" width={280} height={40} sx={{ fontSize: '1rem' }} />
                <br />
                <Skeleton variant="text" width={240} height={30} sx={{ fontSize: '1rem' }} />
                <br />
                <Skeleton variant="text" width={220} height={30} sx={{ fontSize: '1rem' }} />
                <br />
                <Skeleton variant="text" width={220} height={25} sx={{ fontSize: '1rem' }} />
                {/* <br /> */}
                <Skeleton variant="text" width={260} height={15} sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" width={260} height={15} sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" width={260} height={15} sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" width={260} height={15} sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" width={260} height={15} sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" width={260} height={15} sx={{ fontSize: '1rem' }} />
                <br />
                <Skeleton variant="text" width={220} height={25} sx={{ fontSize: '1rem' }} />
                <br />
                <Skeleton variant="text" width={260} height={15} sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" width={260} height={15} sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" width={260} height={15} sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" width={260} height={15} sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" width={260} height={15} sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" width={260} height={15} sx={{ fontSize: '1rem' }} />
            </Stack>
            <Stack className='details-right food-skeleton' spacing={1}>
                <Skeleton variant="square" width={320} height={320} />
                <Skeleton variant="square" width={320} height={30} />
            </Stack >
        </div>
    )
}
