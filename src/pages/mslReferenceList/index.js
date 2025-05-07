import React, { useEffect, useState } from 'react';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
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
import AddNewMSL from './AddNewMSL';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ExpandableTableRow from './ExpandableTableRow';
import ClaimantList from './ClaimantList';
import EditMassLayoff from './EditMassLayoff';
import CloneMassLayoff from './CloneMassLayoff';
import UploadMassLayoff from './UploadMassLayoff';
import CustomModal from '../../components/customModal/CustomModal';

import client from '../../helpers/Api';


import Loader from '../../components/loader/Loader';
import { toast, ToastContainer } from 'react-toastify';

export default function MSLReferenceList() {

    const navigate = useNavigate();

    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);

    const [openAddNewMSLModal, setOpenNewMSLModal] = useState(false);
    const [openEditMasslayoffModal, setOpenEditMasslayoffModal] = useState(false);
    const [openUploadMassLayoffModal, setUploadMassLayoffModal] = useState(false);
    const [openCloneMassLayoffModal, setCloneMassLayoffModal] = useState(false);
    const [mslReferences, setMSLReferences] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        toast("User Logged in Successfully!");
        fetchMSLReferencesList({ offset: 0, limit: 10 })
    }, [])

    const fetchMSLReferencesList = async ({ offset, limit }) => {
        setLoading(true);
        try {
            const response = await client.get(
                `./mockData/references.json`,
            );
            setMSLReferences(response)
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }

    const handleRadioChange = (event) => {
        setValue(event.target.value);
        setError(false);
    };
    const handleSubmit = (event) => {

    }

    const handleAddNewMSL = () => {
        setOpenNewMSLModal(true)
    }
    const handleCloseNewMSLModal = () => {
        setOpenNewMSLModal(false)
    }

    const columns = [
        { id: 'uiAccountNumber', label: 'UI Account #', minWidth: 100 },
        { id: 'unit', label: 'Unit', minWidth: 100 },
        {
            id: 'layoffDate',
            label: 'Mass Layoff Date',
            minWidth: 100,
        },
        {
            id: 'recallDate',
            label: 'Recall Date',
            minWidth: 100,
        },
        {
            id: 'claimantsCount',
            label: 'Claimants #',
            align: "center"
        },
        {
            id: 'status',
            label: 'Status',
        },
        {
            id: 'di',
            label: 'Deductible Income',
        },
        {
            id: 'msl',
            label: 'MSL #',
        },
    ];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
            return <></>
        }
    }

    const handleEditClaimantList = () => {
        navigate('/claimant-list')
    }

    const handleCloneMassLayoff = () => {
        setCloneMassLayoffModal(true);
    }
    const handleCloseCloneMassLayoff = () => {
        setCloneMassLayoffModal(false)
    }

    const handleEditMassLayoff = () => {
        setOpenEditMasslayoffModal(true)
    }
    const handleCloseEditMassLayoff = () => {
        setOpenEditMasslayoffModal(false)
    }
    const handleUploadMassLayoff = () => {
        setUploadMassLayoffModal(true)
    }
    const handleCloseUploadMassLayoff = () => {
        setUploadMassLayoffModal(false)
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
    const handleKeyPress = (event) => {
        const charCode = event.which ? event.which : event.keyCode;
        if (
            (charCode < 48 || charCode > 57)
        ) {
            event.preventDefault();
        }
    };

    return (
        <>
            <Stack margin={theme.spacing(11, 10, 2)}>
                <Typography variant="h5">MSL Reference List</Typography>
                <Paper square elevation={4} sx={{ p: 2, marginTop: 2 }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item md={5}>
                                <FormControl error={error} variant="standard" fullWidth>
                                    <RadioGroup
                                        aria-labelledby="demo-error-radios"
                                        name="searchBy"
                                        value={value}
                                        onChange={handleRadioChange}
                                    >
                                        <Grid container alignItems="center" spacing={1}>
                                            <Grid item md={4}>
                                                <FormControlLabel value="employer" control={<Radio />} label="By Employer:" />
                                            </Grid>
                                            <Grid item md={4}>
                                                <TextField size='small' fullWidth id="employer" label="Employer" variant="outlined" />
                                            </Grid>
                                            <Grid item md={4}>
                                                <TextField size='small' fullWidth id="unit" label="Unit" variant="outlined" onKeyPress={handleKeyPress} />
                                            </Grid>
                                        </Grid>
                                        <Grid container mt={2} alignItems="center">
                                            <Grid item md={4}>
                                                <FormControlLabel value="claimant" control={<Radio />} label="By Claimant:" />
                                            </Grid>
                                            <Grid item md={8}>
                                                <TextField size='small' fullWidth id="claimant" label="Claimant" variant="outlined" onKeyPress={handleKeyPress} />
                                            </Grid>
                                        </Grid>
                                        <Grid container mt={2} alignItems="center">
                                            <Grid item md={4}>
                                                <FormControlLabel value="msl" control={<Radio />} label="By MSL#:" />
                                            </Grid>
                                            <Grid item md={8}>
                                                <TextField size='small' fullWidth id="msl" label="MSL #" variant="outlined" />
                                            </Grid>
                                        </Grid>
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item md={7}>
                                <FormGroup>
                                    <Grid container alignItems="center">
                                        <Grid item md={5}>
                                            <FormControlLabel control={<Checkbox />} label="Mass Layoff Date between" />
                                        </Grid>
                                        <Grid item md={7}>
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                                    <DatePicker
                                                        slotProps={{ textField: { size: 'small' } }}
                                                    />
                                                </LocalizationProvider>
                                                <Typography>and</Typography>
                                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                                    <DatePicker
                                                        slotProps={{ textField: { size: 'small' } }}
                                                    />
                                                </LocalizationProvider>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                    <Grid container mt={2} alignItems="center">
                                        <Grid item md={5}>
                                            <FormControlLabel control={<Checkbox />} label="Recall Date between" />
                                        </Grid>
                                        <Grid item md={7}>
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                                    <DatePicker slotProps={{ textField: { size: 'small' } }} />
                                                </LocalizationProvider>
                                                <Typography>and</Typography>
                                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                                    <DatePicker
                                                        slotProps={{ textField: { size: 'small' } }}
                                                    />
                                                </LocalizationProvider>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                    {/* <Grid container mt={2} alignItems="center">
                                        <Grid item md={6}>
                                            <FormControlLabel value="msl" control={<Radio />} label="By MSL#:" />
                                        </Grid>
                                        <Grid item md={6}>
                                            <TextField id="msl" label="MSL #" variant="outlined" />
                                        </Grid>
                                    </Grid> */}




                                    <FormControlLabel mt={2} control={<Checkbox />} label="Show only current and future Massoff Layoffs" />
                                    <FormControlLabel mt={2} control={<Checkbox />} label="Show only pending entries" />
                                </FormGroup>
                            </Grid>
                        </Grid>

                    </form>
                    <Stack justifyContent="center" alignItems="end" width="100%" >
                        <Button variant="contained">Search</Button>
                    </Stack>
                </Paper>
                {
                    loading ? <Loader /> :
                        <Paper square elevation={10} sx={{ width: '100%', overflow: 'hidden', marginTop: 3 }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table size="small" stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell padding="checkbox" sx={{ backgroundColor: "#183084" }}>
                                            </TableCell>
                                            <TableCell padding="checkbox" sx={{ backgroundColor: "#183084" }}>
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
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {mslReferences
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => {
                                                return (
                                                    <ExpandableTableRow
                                                        hover
                                                        role="checkbox"
                                                        tabIndex={-1}
                                                        key={row.code}
                                                        expandComponent={<TableCell colSpan="8"><ClaimantList /></TableCell>}
                                                    >
                                                        {/* <TableCell padding="checkbox">
                                                    <Radio
                                                        name="radio-select"
                                                    />
                                                </TableCell> */}
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
                                                    </ExpandableTableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={mslReferences.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                }
                <Stack direction="row" spacing={theme.spacing(5)} sx={{ marginTop: 3 }}>
                    <Button variant="contained" onClick={handleEditClaimantList}>Edit Claimant List</Button>
                    <Button variant="contained" onClick={handleCloneMassLayoff}>Clone Mass Layoff entry</Button>
                    <Button variant="contained" onClick={handleEditMassLayoff}>Edit Mass Layoff entry</Button>
                    <Button variant="contained" onClick={handleAddNewMSL}>Add New MSL</Button>
                    <Button variant="contained" onClick={handleUploadMassLayoff}>Upload Mass Layoff</Button>
                </Stack>
            </Stack>
            <CustomModal
                open={openAddNewMSLModal}
                onClose={handleCloseNewMSLModal}
                title="Add New MSL"
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <AddNewMSL closeModalPopup={handleCloseNewMSLModal} />
            </CustomModal>

            <CustomModal
                open={openEditMasslayoffModal}
                onClose={handleCloseEditMassLayoff}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                title="Edit Mass Layoff"
                maxWidth="md"
                PaperProps={{ sx: { width: "50%", height: "100%" } }}
            >
                <EditMassLayoff closeModalPopup={handleCloseEditMassLayoff} />
            </CustomModal>

            <CustomModal
                open={openUploadMassLayoffModal}
                onClose={handleCloseUploadMassLayoff}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                title="Upload Mass Layoff"
            >
                <UploadMassLayoff closeModalPopup={handleCloseUploadMassLayoff} />
            </CustomModal>
            <CustomModal
                open={openCloneMassLayoffModal}
                onClose={handleCloseCloneMassLayoff}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                title="Clone Mass Layoff"
            >
                <CloneMassLayoff closeModalPopup={handleCloseCloneMassLayoff} />
            </CustomModal>
            <ToastContainer />
        </>
    )
}