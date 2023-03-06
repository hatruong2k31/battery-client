import PropTypes from "prop-types";
import {
  useCallback,
  useEffect,
  useMemo,
  Fragment,
  useState,
  useContext,
} from "react";
import { useNavigate, Link } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
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
  Typography,
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
import Swal from "sweetalert2";

// project import
import ViewUser from "./ViewUser";
import MainCard from "../../../components/MainCard";
import ScrollX from "../../../components/ScrollX";
import { renderFilterTypes, GlobalFilter } from "../../../utils/react-table";
import {
  HeaderSort,
  TablePagination,
  TableRowSelection,
  SortingSelect,
} from "../../../components/third-party/ReactTable";
import { useDispatch, useSelector } from "../../../store";
import { getUsers } from "../../../store/reducers/user";
import { openSnackbar } from "../../../store/reducers/snackbar";
import { del, get } from "../../../utils/request";
import UserContext from "../../../contexts/UserContext";
// assets
import { PlusOutlined } from "@ant-design/icons";

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, getHeaderProps, renderRowSubComponent }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: "id", desc: false };

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
        hiddenColumns: [],
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
      setHiddenColumns(["phone", "email"]);
    } else {
      setHiddenColumns([]);
    }
    // eslint-disable-next-line
  }, [matchDownSM]);

  const history = useNavigate();

  const handleAddUser = () => {
    history(`/user/create`);
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
          <SortingSelect
            sortBy={sortBy.id}
            setSortBy={setSortBy}
            allColumns={allColumns}
          />
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              variant="contained"
              startIcon={<PlusOutlined />}
              onClick={handleAddUser}
            >
              Add User
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
                    hover
                    {...row.getRowProps()}
                    onClick={() => {
                      history(`/user/view/${row.values.id}`);
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
            {page.length === 0 && (
              <Fragment>
                <TableRow>
                  <TableCell colSpan={6}>
                    <Typography
                      component="span"
                      sx={{ color: `error.main` }}
                      justifyContent="center"
                    >
                      No Users!
                    </Typography>
                  </TableCell>
                </TableRow>
              </Fragment>
            )}
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
  const { setUsers } = useContext(UserContext);
  const { values } = row;
  const deleteSwal = (username) =>
    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure you want to delete ${username}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        del(`/api/user/${values.id}`).then((response) => {
          if (response.status === 200) {
            dispatch(
              openSnackbar({
                open: true,
                message: `${values.username} deleted successfully!`,
                variant: "alert",
                alert: {
                  color: "success",
                },
                close: false,
              })
            );
            get(`/api/user/list?filters[is_delete][$eq]=0`)
              .then((response) => {
                if (response.status === 200) {
                  return setUsers(response.data);
                }
              })
              .catch((error) => {
                return error;
              });
            // dispatch(getUsers());
          } else {
            dispatch(
              openSnackbar({
                open: true,
                message: `${values.username} deleted Error! ${response?.message}`,
                variant: "alert",
                alert: {
                  color: "error",
                },
                close: false,
              })
            );
          }
        });
      }
    });

  return (
    <Stack
      onClick={(e) => {
        e.stopPropagation();
      }}
      direction="row"
      alignItems="left"
      justifyContent="left"
      spacing={2}
    >
      <Tooltip title="View">
        <Link to={{ pathname: `/user/view/${values.id}` }}>
          <RemoveRedEyeIcon style={{ color: "green" }} />
        </Link>
      </Tooltip>
      <Tooltip title="Edit">
        <Link to={{ pathname: `/user/edit/${values.id}` }}>
          <Edit style={{ color: "#1890ff" }} />
        </Link>
      </Tooltip>
      <Tooltip title="Delete">
        <Link onClick={() => deleteSwal(values.username)}>
          <Delete color="error" />
        </Link>
      </Tooltip>
    </Stack>
  );
};

CellActions.propTypes = {
  row: PropTypes.object,
};

const UserList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  // const { users } = useSelector((state) => state.user);
  const { users, setUsers } = useContext(UserContext);
  // const [users, setUsers] = useState([]);

  useEffect(() => {
    get(`/api/user/list?filters[is_delete][$eq]=0`)
      .then((response) => {
        if (response.status === 200) {
          return setUsers(response.data);
        }
      })
      .catch((error) => {
        return error;
      });
    // dispatch(getUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        className: "cell-center",
      },
      {
        Header: "User Name",
        accessor: "username",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Card ID",
        accessor: "card_id",
      },
      {
        Header: "Balance",
        accessor: "balance",
      },
      {
        Header: "Provider",
        accessor: "provider",
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
    ({ row }) => <ViewUser data={users[row.id]} />,
    [users]
  );

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable
          columns={columns}
          data={users}
          getHeaderProps={(column) => column.getSortByToggleProps()}
          renderRowSubComponent={renderRowSubComponent}
        />
      </ScrollX>
    </MainCard>
  );
};
export default UserList;
