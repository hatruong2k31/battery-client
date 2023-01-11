import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, Fragment } from "react";
import { useNavigate, Link } from "react-router-dom";

// material-ui
import { alpha, useTheme } from "@mui/material/styles";
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
import { Delete, Edit } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

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
import ViewAccount from "./ViewAccount";
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
import { getAccounts } from "../../../store/reducers/account";
import { openSnackbar } from "../../../store/reducers/snackbar";
// assets
import { PlusOutlined } from "@ant-design/icons";

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, getHeaderProps, renderRowSubComponent }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: "name", desc: false };

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
    // @ts-ignore
    gotoPage,
    // @ts-ignore
    setPageSize,
    // @ts-ignore
    state: { globalFilter, selectedRowIds, pageIndex, pageSize },
    // @ts-ignore
    preGlobalFilteredRows,
    // @ts-ignore
    setGlobalFilter,
    // @ts-ignore
    setSortBy,
  } = useTable(
    {
      columns,
      data,
      // @ts-ignore
      filterTypes,
      // @ts-ignore
      initialState: {
        pageIndex: 0,
        pageSize: 5,
        hiddenColumns: ["description"],
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
      setHiddenColumns([
        "id",
        "name",
        "type",
        "tax_code",
        "identity_card",
        "phone",
        "email",
        "owner_name",
      ]);
    } else {
      setHiddenColumns(["description"]);
    }
    // eslint-disable-next-line
  }, [matchDownSM]);

  const history = useNavigate();

  const handleAddAccount = () => {
    history(`/account/add-new-account`);
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
              onClick={handleAddAccount}
            >
              Add Account
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
                        ? alpha(theme.palette.primary.lighter, 0.35)
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
  const { accounts } = useSelector((state) => state.account);

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

        await axios.delete(`/api/account/${values.id}`, header).then(
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
            dispatch(getAccounts());
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
    [accounts]
  );

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={0}
    >
      <Tooltip title="View">
        <Link to={{ pathname: `/account/view/${values.id}` }}>
          <button>View</button>
        </Link>
      </Tooltip>
      <Tooltip title="Edit">
        <Link to={{ pathname: `/account/edit/${values.id}` }}>
          <button>Edit</button>
        </Link>
      </Tooltip>
      <Tooltip arrow placement="right" title="Delete">
        <IconButton color="error" onClick={() => handleDeleteRow(values)}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

CellActions.propTypes = {
  row: PropTypes.object,
};

const AccountList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { accounts } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(getAccounts());

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
        Header: "Account Name",
        accessor: "name",
      },
      {
        Header: "Account Type",
        accessor: "type",
      },
      {
        Header: "Tax Code/Identity Card",
        accessor: "tax_identity",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Account Owner",
        accessor: "owner_name",
      },

      {
        Header: "Actions",
        className: "cell-center",
        disableSortBy: true,
        Cell: CellActions,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  const renderRowSubComponent = useCallback(
    ({ row }) => <ViewAccount data={accounts[row.id]} />,
    [accounts]
  );

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable
          columns={columns}
          data={accounts}
          getHeaderProps={(column) => column.getSortByToggleProps()}
          renderRowSubComponent={renderRowSubComponent}
        />
      </ScrollX>
    </MainCard>
  );
};

export default AccountList;
