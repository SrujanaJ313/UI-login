import * as React from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
// import { DataGrid, GridColDef, gridClasses } from "@mui/x-data-grid";
import { styled } from "@mui/material";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.columnHeaders}`]: {
    backgroundColor: theme.palette.grey[300]
  }
}));

const CaseDataTable = () => {
  const columns = [
    {
      field: "casenumber",
      headerName: "Case #",
      width:80
    },
    {
      field: "claimant",
      headerName: "Claimant",
      width:100
    },
    {
      field: "priority",
      headerName: "Priority",
      width:100
    },
    {
      field: "caseage",
      headerName: "Case Age",
      type: "number",
      width:100
    },
    {
      field: "mostrecentremedy",
      headerName: "Most Recent Remedy",
      width:150
    },
    {
      field: "casecharacteristics",
      headerName: "Case Characteristics",
      width:300
    },
    {
      field: "nextfollowup",
      headerName: "Next Follow-up",
      width:150
    },
  ];

  const rows = [
    {
      id: 1,
      casenumber: 20004,
      claimant: "Jon",
      priority: "HI",
      caseage: 14,
      mostrecentremedy: "",
      casecharacteristics: "",
      nextfollowup: "",
    },
    {
      id: 2,
      casenumber: 20005,
      claimant: "Cersei",
      priority: "HI",
      caseage: 31,
      mostrecentremedy: "",
      casecharacteristics: "",
      nextfollowup: "",
    },
    {
      id: 3,
      casenumber: 20005,
      claimant: "Jaime",
      priority: "LO",
      caseage: 31,
      mostrecentremedy: "",
      casecharacteristics: "",
      nextfollowup: "",
    },
    {
      id: 4,
      casenumber: 20006,
      claimant: "Arya",
      priority: "LO",
      caseage: 11,
      mostrecentremedy: "",
      casecharacteristics: "",
      nextfollowup: "",
    },
    {
      id: 5,
      casenumber: 20007,
      claimant: "Daenerys",
      priority: "MD",
      caseage: 30,
      mostrecentremedy: "",
      casecharacteristics: "",
      nextfollowup: "",
    },
    {
      id: 6,
      casenumber: 20008,
      claimant: null,
      priority: "LO",
      caseage: 150,
      mostrecentremedy: "",
      casecharacteristics: "",
      nextfollowup: "",
    },
    {
      id: 7,
      casenumber: 20009,
      claimant: "Ferrara",
      priority: "HI",
      caseage: 44,
      mostrecentremedy: "",
      casecharacteristics: "",
      nextfollowup: "",
    },
    {
      id: 8,
      casenumber: 200010,
      claimant: "Rossini",
      priority: "MD",
      caseage: 36,
      mostrecentremedy: "",
      casecharacteristics: "",
      nextfollowup: "",
    },
    {
      id: 9,
      casenumber: 200011,
      claimant: "Harvey",
      priority: "LO",
      caseage: 65,
      mostrecentremedy: "",
      casecharacteristics: "",
      nextfollowup: "",
    },
  ];
  return (
    <StyledDataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      checkboxSelection
      disableRowSelectionOnClick
    />
  );
};

export default CaseDataTable;
