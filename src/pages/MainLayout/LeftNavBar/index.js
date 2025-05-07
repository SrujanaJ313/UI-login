import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";
import React from "react";

import {
  DashboardOutlined,
  TaskOutlined,
  CalendarMonthOutlined,
  PagesOutlined
} from "@mui/icons-material";

const drawerWidth = 300;
const MUIDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    backgroundColor: '#e2e2e2',
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const MUIListItemText = styled(ListItemText)(() => ({
  "& .MuiTypography-root": {
    fontWeight: 500,
    fontSize: 18
  }
}));

const LeftNavBar = () => {
  return (
    <MUIDrawer variant="permanent">
      <Toolbar />
      <List component="nav">
        <React.Fragment>
          <ListItemButton className="!bg-gray-300 !bg-opacity-70 !text-sky-600">
            <ListItemIcon>
              <DashboardOutlined className="text-sky-600"/>
            </ListItemIcon>
            <MUIListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <TaskOutlined className="text-slate-600"/>
            </ListItemIcon>
            <MUIListItemText primary="Tasks" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <PagesOutlined className="text-slate-600"/>
            </ListItemIcon>
            <MUIListItemText primary="Pages" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <CalendarMonthOutlined className="text-slate-600"/>
            </ListItemIcon>
            <MUIListItemText primary="Calendar" />
          </ListItemButton>          
        </React.Fragment>
      </List>
    </MUIDrawer>
  );
};

export default LeftNavBar;
