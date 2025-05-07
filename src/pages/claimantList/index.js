import React, { useState } from 'react';
import Typography from "@mui/material/Typography";
// import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormHelperText from '@mui/material/FormHelperText';
// import FormGroup from '@mui/material/FormGroup';
import theme from "../../theme/theme";
import Checkbox from '@mui/material/Checkbox';
// import TextField from '@mui/material/TextField';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import { deepOrange, } from '@mui/material/colors';
import AddNewClaimant from './AddNewClaimant';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import CustomModal from '../../components/customModal/CustomModal';
import DoneIcon from '@mui/icons-material/Done';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function ClaimantList() {
    const navigate = useNavigate();

    const [openAddNewClaimantModal, setOpenNewClaimantModal] = useState(false);

    const handleAddNewClaimant = () => {
        setOpenNewClaimantModal(true)
    }
    const handleCloseNewMSLModal = () => {
        setOpenNewClaimantModal(false)
    }

    const columns = [
        { id: 'claimant', label: 'Claimant', minWidth: 170 },
        {
            id: 'ssn',
            label: 'SSN',
            minWidth: 170,
        },
        {
            id: 'source',
            label: 'Source',
            minWidth: 170,
        },
        {
            id: 'status',
            label: 'Status',
            minWidth: 170,
        },
    ];

    const rows = [
        {
            id: 1,
            claimant: "John Some",
            ssn: "000-22-3333",
            source: "cloned",
            status: "pending",
        },
        {
            id: 2,
            claimant: "Peter Smith",
            ssn: "000-22-4444",
            source: "Claimant Work History",
            status: "pending",
        },
        {
            id: 3,
            claimant: "Mary Fargo",
            ssn: "000-22-5555",
            source: "Staff entered",
            status: "completed",
        },
        {
            id: 4,
            claimant: "Linda Boxer",
            ssn: "000-22-6666",
            source: "Claimant Work History",
            status: "completed",
        },
        {
            id: 5,
            claimant: "Raymond Grand",
            ssn: "000-22-7777",
            source: "cloned",
            status: "pending",
        },

    ]

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [selected, setSelected] = React.useState([]);

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getStatusIcon = (status) => {
        if (status === "pending") {
            return <Avatar sx={{ bgcolor: deepOrange[500], width: 20, height: 20, fontSize: "0.625rem", }}>P</Avatar>
        } else {
            return <>
                <DoneIcon fontSize="small" color="success" />
            </>
        }
    }

    const handleIncludeInList = () => {
    }
    const handleDeleteFromList = () => {
    }

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };
    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    return (
        <>
            <Stack margin={theme.spacing(11, 10, 2)}>
                <Stack direction="row" spacing={theme.spacing(1)} alignItems="center">
                    <ArrowBackIosNewIcon sx={{ cursor: "pointer" }} fontSize="medium" onClick={() => navigate(-1)} />
                    <Typography variant="h5">Edit Claimant List</Typography>
                </Stack>

                <Stack direction="row" mt={2} spacing={theme.spacing(3)}>
                    <Stack direction="row" spacing={theme.spacing(1)}>
                        <Typography fontWeight="bold" color="#183084">Employer:</Typography>
                        <Typography>Hartford Industries</Typography>
                    </Stack>
                    <Stack direction="row" spacing={theme.spacing(1)}>
                        <Typography fontWeight="bold" color="#183084">UI Account #:</Typography>
                        <Typography>000096876</Typography>
                    </Stack>
                    <Stack direction="row" spacing={theme.spacing(1)}>
                        <Typography fontWeight="bold" color="#183084">Unit:</Typography>
                        <Typography>000</Typography>
                    </Stack>
                    <Stack direction="row" spacing={theme.spacing(1)}>
                        <Typography fontWeight="bold" color="#183084">Mass Layoff Date:</Typography>
                        <Typography>2/10/2023</Typography>
                    </Stack>
                    <Stack direction="row" spacing={theme.spacing(1)}>
                        <Typography fontWeight="bold" color="#183084">Recall Date:</Typography>
                        <Typography>2/17/2023</Typography>
                    </Stack>
                    <Stack direction="row" spacing={theme.spacing(1)}>
                        <Typography fontWeight="bold" color="#183084">MSL#:</Typography>
                        <Typography>1265765</Typography>
                    </Stack>
                </Stack>
                <Paper square elevation={10} sx={{ width: '100%', overflow: 'hidden', marginTop: 3 }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table size="small" stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox" sx={{ backgroundColor: "#183084" }}>
                                        <Checkbox
                                            color="success"
                                            indeterminate={selected.length > 0 && selected.length < rows.length}
                                            checked={rows.length > 0 && selected.length === rows.length}
                                            onChange={handleSelectAllClick}
                                            inputProps={{
                                                'aria-label': 'select all desserts',
                                            }}
                                        // sx={{ color: "white", borderColor: "white" }}
                                        />
                                    </TableCell>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, fontWeight: "bold", backgroundColor: "#183084", color: "white" }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                    <TableCell
                                        style={{minWidth: 150, fontWeight: "bold", backgroundColor: "#183084", color: "white" }}
                                    >
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        const isItemSelected = isSelected(row.id);
                                        return (
                                            <StyledTableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.code}
                                                selected={isItemSelected}
                                                onClick={(event) => handleClick(event, row.id)}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        name="radio-select"
                                                        checked={isItemSelected}
                                                    />
                                                </TableCell>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {
                                                                column.id === "status" ? <>
                                                                    {getStatusIcon(value)}
                                                                </> : value
                                                            }
                                                        </TableCell>
                                                    );
                                                })}
                                                <TableCell padding="checkbox">
                                                    <Stack direction="row" spacing={theme.spacing(1)} alignItems="center">
                                                        <AddCircleOutlineIcon sx={{ cursor: "pointer" }} fontSize="medium" color="primary" />
                                                        <RemoveCircleOutlineIcon sx={{ cursor: "pointer" }} fontSize="medium" color="error" />

                                                    </Stack>
                                                </TableCell>
                                            </StyledTableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <Stack direction="row" spacing={theme.spacing(5)} sx={{ marginTop: 3 }}>

                    <Button variant="contained" onClick={handleIncludeInList}>Include in List</Button>
                    <Button variant="contained" onClick={handleDeleteFromList}>Delete from List</Button>
                    <Button variant="contained" onClick={handleAddNewClaimant}>Add New Claimant to List</Button>

                </Stack>
            </Stack>
            <CustomModal
                open={openAddNewClaimantModal}
                onClose={handleCloseNewMSLModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                title="Add New Claimant"
            // maxWidth="md"
            >
                <AddNewClaimant closeModalPopup={handleCloseNewMSLModal} />
            </CustomModal>
        </>
    )
}