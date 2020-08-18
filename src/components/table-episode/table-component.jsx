import React from "react";

import { useTable, useSortBy, usePagination } from "react-table";
import {
  Flex,
  IconButton,
  FormControl,
  Select,
  useColorMode,
  Input,
  Box,
} from "@chakra-ui/core";
import "./table-style.css";

export function TablePodcast({ columns, data }) {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.800" };
  const color = { light: "black", dark: "white" };
  const borderColor = { light: "black", dark: "white" };
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,

    prepareRow,
    page,

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  // Render the UI for your table
  return (
    <React.Fragment>
      <Flex
        align="center"
        justifyContent="center"
        overflowX="auto"
        p="20px"
        direction="column"
      >
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}

        <Flex mt="10px">
          <Box mt="10px" mr="10px">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </Box>

          <FormControl className="menu-items">
            <Select
              border="1px"
              borderColor={borderColor[colorMode]}
              bg={bgColor[colorMode]}
              color={color[colorMode]}
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Select>
          </FormControl>
        </Flex>

        <Flex className="pagination" mt="20px">
          <IconButton
            className="menu-items"
            variant="outline"
            aria-label="arrow-left"
            icon="arrow-left"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            m="3px"
          />
          <IconButton
            className="menu-items"
            variant="outline"
            aria-label="chevron-left"
            icon="chevron-left"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            m="3px"
          />
          <IconButton
            className="menu-items"
            variant="outline"
            aria-label="chevron-right"
            icon="chevron-right"
            onClick={() => nextPage()}
            disabled={!canNextPage}
            m="3px"
          />
          <IconButton
            className="menu-items"
            variant="outline"
            aria-label="arrow-right"
            icon="arrow-right"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            m="3px"
          />

          <Input
            placeholder="Go To Page"
            border="1px"
            borderColor={borderColor[colorMode]}
            autoComplete="off"
            m="3px"
            type="number"
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
          />
        </Flex>
      </Flex>
    </React.Fragment>
  );
}
