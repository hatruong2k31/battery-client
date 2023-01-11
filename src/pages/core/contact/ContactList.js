import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, Fragment, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// material-ui
import { alpha, useTheme } from "@mui/material/styles";
import { Delete, Edit } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  useMediaQuery,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";

import {
  useFilters,
  useExpanded,
  useGlobalFilter,
  useRowSelect,
  useSortBy,
  useTable,
  usePagination,
} from "react-table";

// project import
import ViewContact from "./ViewContact";
import IconButton from "../../../components/@extended/IconButton";
import MainCard from "../../../components/MainCard";
import ScrollX from "../../../components/ScrollX";
import { renderFilterTypes, GlobalFilter } from "../../../utils/react-table";
import {
  HeaderSort,
  TablePagination,
  TableRowSelection,
} from "../../../components/third-party/ReactTable";
import axios from "../../../utils/axios";
import { useDispatch, useSelector } from "../../../store";
import { getContacts } from "../../../store/reducers/contact";
import { openSnackbar } from "../../../store/reducers/snackbar";
// assets
import { PlusOutlined } from "@ant-design/icons";

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, getHeaderProps, renderRowSubComponent }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: "id", desc: true };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setHiddenColumns,
    allColumns,
    visibleColumns,
    rows,
    // @ts-ignore
    page,
    gotoPage,
    setPageSize,
    state: { globalFilter, selectedRowIds, pageIndex, pageSize },
    preGlobalFilteredRows,
    setGlobalFilter,
    setSortBy,
  } = useTable(
    {
      columns,
      data,
      // @ts-ignore
      filterTypes,
      initialState: {
        pageIndex: 0,
        pageSize: 5,
        hiddenColumns: ["account_name", "email", "mobile_phone", "owner_name"],
        sortBy: [sortBy],
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  useEffect(() => {
    if (matchDownSM) {
      setHiddenColumns(["account_name", "email", "mobile_phone", "owner_name"]);
    } else {
      setHiddenColumns(["account_name", "owner_name"]);
    }
    // eslint-disable-next-line
  }, [matchDownSM]);

  const history = useNavigate();

  const handleAddContact = () => {
    history(`/contact/create`);
  };

  return (
    <>
      <TableRowSelection selected={Object.keys(selectedRowIds).length} />
      <Stack spacing={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 3, pb: 0 }}
        >
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            size="small"
          />
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              variant="contained"
              startIcon={<PlusOutlined />}
              onClick={handleAddContact}
            >
              Add Contact
            </Button>
          </Stack>
        </Stack>

        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, i) => (
              <TableRow
                key={i}
                {...headerGroup.getHeaderGroupProps()}
                sx={{ "& > th:first-of-type": { width: "58px" } }}
              >
                {headerGroup.headers.map((column, index) => (
                  <TableCell
                    key={index}
                    {...column.getHeaderProps([
                      { className: column.className },
                      getHeaderProps(column),
                    ])}
                  >
                    <HeaderSort column={column} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              const rowProps = row.getRowProps();

              return (
                <Fragment key={i}>
                  <TableRow
                    {...row.getRowProps()}
                    onClick={() => {
                      row.toggleRowSelected();
                    }}
                    sx={{
                      cursor: "pointer",
                      bgcolor: row.isSelected
                        ? alpha(theme.palette.primary.light, 0.35)
                        : "inherit",
                    }}
                  >
                    {row.cells.map((cell, index) => (
                      <TableCell
                        key={index}
                        {...cell.getCellProps([
                          { className: cell.column.className },
                        ])}
                      >
                        {cell.render("Cell")}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.isExpanded &&
                    renderRowSubComponent({ row, rowProps, visibleColumns })}
                </Fragment>
              );
            })}
            <TableRow sx={{ "&:hover": { bgcolor: "transparent !important" } }}>
              <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                <TablePagination
                  gotoPage={gotoPage}
                  rows={rows}
                  setPageSize={setPageSize}
                  pageSize={pageSize}
                  pageIndex={pageIndex}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Stack>
    </>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  getHeaderProps: PropTypes.func,
  renderRowSubComponent: PropTypes.any,
};

// ==============================|| PRODUCT LIST - MAIN ||============================== //

const CellActions = ({ row }) => {
  const dispatch = useDispatch();
  const { values } = row;
  const { contacts } = useSelector((state) => state.contact);

  const handleDeleteRow = useCallback(
    async (row) => {
      if (!window.confirm(`Are you sure you want to delete ${values.name}`)) {
        return;
      }

      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.delete(`/api/contact/${values.id}`, header).then(
          () => {
            dispatch(
              openSnackbar({
                open: true,
                message: "Submit Success",
                variant: "alert",
                alert: {
                  color: "success",
                },
                close: false,
              })
            );
            dispatch(getContacts());
          },
          (err) => {
            console.log(err);
            dispatch(
              openSnackbar({
                open: true,
                message: err.error.details || err.error.message || err.message,
                variant: "alert",
                alert: {
                  color: "error",
                },
                close: false,
              })
            );
          }
        );
      } catch (err) {
        dispatch(
          openSnackbar({
            open: true,
            message: err.message,
            variant: "alert",
            alert: {
              color: "error",
            },
            close: false,
          })
        );
      }
    },
    [contacts, values, dispatch]
  );

  return (
    <Stack direction="row" alignItems="left" justifyContent="left" spacing={0}>
      <Tooltip title="View">
        <Link to={{ pathname: `/contact/view/${values.id}` }}>
          <RemoveRedEyeIcon />
        </Link>
      </Tooltip>
      <Tooltip title="Edit">
        <Link to={{ pathname: `/contact/edit/${values.id}` }}>
          <Edit />
        </Link>
      </Tooltip>
      <Tooltip title="Delete">
        <Link color="error" onClick={() => handleDeleteRow(values)}>
          <Delete />
        </Link>
      </Tooltip>
    </Stack>
  );
};

CellActions.propTypes = {
  row: PropTypes.object,
};

const ContactList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { contacts } = useSelector((state) => state.contact);

  useEffect(() => {
    dispatch(getContacts());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
        className: "cell-center",
      },
      {
        Header: "Contact Name",
        accessor: "lastname",
      },
      {
        Header: "Account Name",
        accessor: "account_name",
      },
      {
        Header: "Mobile",
        accessor: "mobile_phone",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Contact Owner",
        accessor: "owner_name",
      },
      {
        Header: "Actions",
        disableSortBy: true,
        Cell: CellActions,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  const renderRowSubComponent = useCallback(
    ({ row }) => <ViewContact data={contacts[row.id]} />,
    [contacts]
  );

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable
          columns={columns}
          data={contacts}
          getHeaderProps={(column) => column.getSortByToggleProps()}
          renderRowSubComponent={renderRowSubComponent}
        />
      </ScrollX>
    </MainCard>
  );
};

export default ContactList;
