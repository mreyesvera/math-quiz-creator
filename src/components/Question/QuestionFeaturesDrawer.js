import {
  Grid
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import * as React from 'react';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BarChartIcon from '@mui/icons-material/BarChart';
import DataObjectIcon from '@mui/icons-material/DataObject';
import QuestionParametrization from './QuestionParametrization';
import QuestionVisualizations from './QuestionVisualizations';

const drawerWidth = 450;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const createClasses = (open) => ({
  drawerPaper: {
    '.MuiDrawer-paper': {
      marginTop: "64px",
    }
  },
  listItemButton: {
      minHeight: 48,
      justifyContent: open ? 'initial' : 'center',
      px: 2.5,
  },
  listItemIcon: {
    minWidth: 0,
    mr: open ? 3 : 'auto',
    justifyContent: 'center',
  },
  iconsContainer: {
    width: '64px',
  },
  drawerContentContainer: {
    width: 'calc(100% - 64px)',
  },
});

/**
 * This component is a modified version of one of the
 * example Nav Drawers shown by MUI: 
 * https://mui.com/material-ui/react-drawer/#mini-variant-drawer
 * (particularly the methods to style the components and do any
 * transitions)
 * 
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Handles the drawer for a question's feature drawer. 
 * The features at the moment include Parametrization and Visualizations,
 * however, visualizations is not working. 
 * 
 * @param {Object} param0 
 *    - open: Whether the drawer is open or not
 *    - setOpen: Function to set whether the drawer is open or not
 *    - selectedItem: Whether "Parametrization" or "Visualizations" is selected
 *    - openParametrization: Whether the parametrizations view is open
 *    - openVisualizations: Whether the visualizations view is open
 *    - paramsColumns: MUI Data Grid parameters' columns
 *    - paramsData: MUI Data Grid parameters' rows
 *    - setParamsColumns: Allows to set the parameters' columns
 *    - setParamsData: Allows to set the parameters' rows
 *    - parameters: questions' parameters
 *    - setParameters: Function to set the questions' parameters
 * @returns {React.ReactElement} Question's Features Drawer
 */
export default function QuestionFeaturesDrawer({open, setOpen, selectedItem, openParametrization, openVisualizations,
              paramsColumns, paramsData, setParamsColumns, setParamsData, parameters, setParameters}){
    const theme = useTheme();
    const classes = createClasses(open);

    const handleDrawerToggle = () => {
      setOpen(oldOpen => !oldOpen)
    };
    
    return (
    <Drawer 
      variant="permanent" 
      open={open}
      anchor="right"
      sx={classes.drawerPaper}
      PaperProps={{
        sx: { width: "50%" },
      }}
    >
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Grid container>
          <Grid 
            item
            sx={classes.iconsContainer}
          >
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  sx={classes.listItemButton}
                  onClick={openVisualizations}
                >
                  <ListItemIcon
                    sx={classes.listItemIcon}
                  >
                    <BarChartIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  sx={classes.listItemButton}
                  onClick={openParametrization}
                >
                  <ListItemIcon
                    sx={classes.listItemIcon}
                  >
                    <DataObjectIcon />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </List>
          </Grid>
          <Grid 
            item
            sx={classes.drawerContentContainer}
          >
            { open && 
              (
                selectedItem === "Parametrization" ?
                <QuestionParametrization 
                  paramsColumns={paramsColumns}
                  setParamsColumns={setParamsColumns}
                  paramsData={paramsData}
                  setParamsData={setParamsData}
                  parameters={parameters}
                  setParameters={setParameters}
                />
                :
                <QuestionVisualizations />
              )
            }
          </Grid>
        </Grid>
    </Drawer>
    );
}