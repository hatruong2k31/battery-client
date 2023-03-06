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
import Swal from "sweetalert2";

// project import
import ViewPayment from "./ViewPayment";
import MainCard from "../../../components/MainCard";
import ScrollX from "../../../components/ScrollX";
import { renderFilterTypes, GlobalFilter } from "../../../utils/react-table";
import {
  HeaderSort,
  TablePagination,
  TableRowSelection,
} from "../../../components/third-party/ReactTable";
import { useDispatch } from "../../../store";
import { openSnackbar } from "../../../store/reducers/snackbar";
import { del, get } from "../../../utils/request";
import PaymentContext from "../../../contexts/PaymentContext";

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
      setHiddenColumns(["company", "mobile", "phone", "email"]);
    } else {
      setHiddenColumns([]);
    }
    // eslint-disable-next-line
  }, [matchDownSM]);

  const history = useNavigate();

  const handleAddPayment = () => {
    history(`/payment/add-new-payment`);
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
              onClick={handleAddPayment}
            >
              Add Payment
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
                      history(`/payment/view/${row.values.id}`);
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
                      No data!
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
  const { setPayments } = useContext(PaymentContext);
  const { values } = row;
  const deleteSwal = () =>
    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure you want to delete this payment`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        del(`/api/payment/${values.id}`).then((response) => {
          if (response.status === 200) {
            dispatch(
              openSnackbar({
                open: true,
                message: ` deleted successfully!`,
                variant: "alert",
                alert: {
                  color: "success",
                },
                close: false,
              })
            );
            get(`/api/payment/list?filters[is_delete][$eq]=0`)
              .then((response) => {
                if (response.status === 200) {
                  return setPayments(response.data);
                }
              })
              .catch((error) => {
                return error;
              });
          } else {
            dispatch(
              openSnackbar({
                open: true,
                message: response.details
                  ? `You can not delete this record!`
                  : response?.message,
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
        <Link to={{ pathname: `/payment/view/${values.id}` }}>
          <RemoveRedEyeIcon style={{ color: "green" }} />
        </Link>
      </Tooltip>
      <Tooltip title="Edit">
        <Link to={{ pathname: `/payment/edit/${values.id}` }}>
          <Edit style={{ color: "#1890ff" }} />
        </Link>
      </Tooltip>
      <Tooltip title="Delete">
        <Link onClick={() => deleteSwal()}>
          <Delete color="error" />
        </Link>
      </Tooltip>
    </Stack>
  );
};

CellActions.propTypes = {
  row: PropTypes.object,
};

const PaymentList = () => {
  const theme = useTheme();
  // const [payments, setPayments] = useState([]);
  const { payments, setPayments } = useContext(PaymentContext);

  useEffect(() => {
    get(`/api/payment/list?filters[is_delete][$eq]=0`)
      .then((response) => {
        if (response.status === 200) {
          return setPayments(response.data);
        }
      })
      .catch((error) => {
        return error;
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
        className: "cell-center",
      },
      {
        Header: "User Name",
        accessor: "user_name",
      },
      {
        Header: "Battery Type",
        accessor: "battery_type",
      },
      {
        Header: "Station Name",
        accessor: "station_name",
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
    ({ row }) => <ViewPayment data={payments[row.id]} />,
    [payments]
  );

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable
          columns={columns}
          data={payments}
          getHeaderProps={(column) => column.getSortByToggleProps()}
          renderRowSubComponent={renderRowSubComponent}
        />
      </ScrollX>
    </MainCard>
  );
};

export default PaymentList;
