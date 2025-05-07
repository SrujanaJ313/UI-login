import Dialog from "@mui/material/Dialog";
// import Dialog, { DialogProps } from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";
import theme from "../../theme/theme";
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// import theme from "theme";


function CustomModal(props) {
    const {
        title,
        children,
        // disableScroll = false,
        open,
        onClose,
        maxWidth = "sm",
        fullWidth = true,
        PaperProps,
    } = props;

    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Dialog
            disableEnforceFocus
            fullScreen={!!isMobile}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={open}
            PaperProps={PaperProps}
            sx={{
                zIndex: isMobile ? 1306 : 1300,
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        borderRadius: isMobile ? "0px" : theme.spacing(0.5),
                    },
                },
                // "& .MuiDialogContent-root": {
                //     display: "flex",
                //     // padding: 0,
                //     overflowX: "hidden",
                //     ...(disableScroll && {
                //         overflow: "hidden",
                //     }),
                // },
                "& .MuiDialogActions-root": {
                    padding: 0,
                },
                "& .MuiDialogTitle-root": {
                    padding: theme.spacing(1.5, 4),
                    borderBottom: `1px solid ${theme.palette.text.secondary}`,
                },
            }}
            transitionDuration={{
                enter: theme.transitions.duration.enteringScreen,
                exit: 0,
            }}
            onClose={onClose}
        >
            <DialogTitle id="alert-dialog-title" justifyContent="center" alignItems="center" sx={{backgroundColor: "#1c2d6a"}}>
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="center"
                    sx={{
                        position: "relative",
                    }}
                >
                    <Typography variant="title1" whiteSpace="nowrap" color="white">
                        {title}
                    </Typography>
                </Stack>
            </DialogTitle>
            {children}
        </Dialog>
    );
}

export default CustomModal;