import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, Fragment, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// material-ui
import { alpha, useTheme } from "@mui/material/styles";
import { Delete, Edit } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
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
  Modal,
  Box,
} from "@mui/material";

// third-party
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
import View from "./View";
import MainCard from "../../../components/MainCard";
import ScrollX from "../../../components/ScrollX";
import { renderFilterTypes, GlobalFilter } from "../../../utils/react-table";
import {
  HeaderSort,
  TablePagination,
  TableRowSelection,
} from "../../../components/third-party/ReactTable";
import { useDispatch, useSelector } from "../../../store";

// assets
import {
  PlusOutlined,
} from "@ant-design/icons";
import { getOpportunitys } from "../../../store/reducers/opportunity";
// import store from "@store";

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, getHeaderProps, renderRowSubComponent }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: "username", desc: false };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setHiddenColumns,
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
        hiddenColumns: ["image", "description"],
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
      setHiddenColumns(["id", "name", "email", "description", "phone"]);
    } else {
      setHiddenColumns(["image", "description"]);
    }
    // eslint-disable-next-line
  }, [matchDownSM]);

  const history = useNavigate();
  const handleAddOpportunity = () => {
    history(`/opportunity/add`);
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
            {/* <SortingSelect
              sortBy={sortBy.id}
              setSortBy={setSortBy}
              allColumns={allColumns}
            /> */}
            <Button
              variant="contained"
              startIcon={<PlusOutlined />}
              onClick={handleAddOpportunity}
            >
              Add Opportunity
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
const Probabi = ({row}) => {
  const { values } = row;
  return (
    <span> {values.probability} </span>
  );

}
const CellActions = ({ row }) => {
  const { values } = row;
  return (
    <Stack
      direction="row"
      alignItems="left"
      justifyContent="left"
      spacing={0}
    >
      <Tooltip title="View">
        <Link to={{ pathname: `/opportunity/view/${values.id}` }} className="btn btn-primary">
          <RemoveRedEyeIcon/>
        </Link>
      </Tooltip>
      <Tooltip title="Edit">
       
        <Link to={{ pathname: `/opportunity/edit/${values.id}` }} className="btn btn-primary">
          <Edit />
        </Link>
      </Tooltip>
      <Tooltip title="Delete">
        
        <Link onClick={(e) => {
            e.stopPropagation();
          }} className="btn btn-primary">
          <Delete />
        </Link>
      </Tooltip>
    </Stack>
  );
};

CellActions.propTypes = {
  row: PropTypes.object,
};
Probabi.propTypes = {
  row: PropTypes.object,
};

//===== Model Delete =====//
const DeleteModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

const OpportunityList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { opportunitys } = useSelector((state) => state.opportunity);
  // const opportunitys = [];
  useEffect(() => {
    dispatch(getOpportunitys());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        className: "cell-center",
      },
      {
        Header: "Opportunity Name",
        accessor: "name",
      },
      {
        Header: "Account Name",
        accessor: "account_name",
      },
      {
        Header: "Stage",
        accessor: "stage_name",
      },
      {
        Header: "Probability",
        Cell: Probabi,
      },
      {
        Header: "Close Date",
        accessor: "close_date",
      },
      {
        Header: "Amount",
        accessor: "amount",
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
    ({ row }) => <View data={opportunitys[row.id]} />,
    [opportunitys]
  );

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable
          columns={columns}
          data={opportunitys}
          getHeaderProps={(column) => column.getSortByToggleProps()}
          renderRowSubComponent={renderRowSubComponent}
        />
      </ScrollX>
    </MainCard>
  );
};

export default OpportunityList;
