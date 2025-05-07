import React, { useState } from 'react';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormGroup from '@mui/material/FormGroup';
import theme from "../../theme/theme";
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

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
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import { blue, } from '@mui/material/colors';

import DoneIcon from '@mui/icons-material/Done';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

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
            claimant: "John Some",
            ssn: "000-22-3333",
            source: "cloned",
            status: "pending",
        },
        {
            claimant: "Peter Smith",
            ssn: "000-22-4444",
            source: "Claimant Work History",
            status: "pending",
        },
        {
            claimant: "Mary Fargo",
            ssn: "000-22-5555",
            source: "Staff entered",
            status: "completed",
        },
        {
            claimant: "Linda Boxer",
            ssn: "000-22-6666",
            source: "Claimant Work History",
            status: "completed",
        },
        {
            claimant: "Raymond Grand",
            ssn: "000-22-3333",
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
            return <Avatar sx={{ bgcolor: deepOrange[500], width: 20, height: 20, fontSize: "0.625rem" }}>P</Avatar>
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
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };
    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
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
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table size="small" stickyHeader aria-label="sticky table">
                    {/* <TableHead sx={{zIndex: 10}}> */}
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth, fontWeight: "bold", backgroundColor: "#2160c942" }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                    {/* </TableHead> */}
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                const isItemSelected = isSelected(row.name);
                                return (
                                    <StyledTableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.code}
                                        selected={isItemSelected}
                                        onClick={(event) => handleClick(event, row.name)}
                                    >
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
                                    </StyledTableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
