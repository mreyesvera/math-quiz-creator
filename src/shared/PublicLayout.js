import {
    Box,
} from '@mui/material';
import Welcome from '..//pages/Welcome';
import { Outlet } from 'react-router-dom';


export default function PublicLayout(){
    return (
        <Box>
            <Welcome>
                <Outlet />
            </Welcome>
        </Box>
    );
}