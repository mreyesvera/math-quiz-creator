import {
    Box,
} from '@mui/material';
import Welcome from '..//pages/Welcome';
import { Outlet } from 'react-router-dom';

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Wraps the application content when a user is not logged in logged in. 
 * It helps style the container for the content.  
 * 
 * @returns {React.ReactElement} Public Layout Wrapper
 */
export default function PublicLayout(){
    return (
        <Box>
            <Welcome>
                <Outlet />
            </Welcome>
        </Box>
    );
}