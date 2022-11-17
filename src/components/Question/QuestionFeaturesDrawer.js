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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
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