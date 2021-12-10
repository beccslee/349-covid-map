import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "assets/stylesheets/application.scss";

// function createData(country, count) {
//   return { country, count };
// }

// const columns = [
//   { id: 'country', label: 'Country', minWidth: 100 },
//   { id: 'count', label: 'Count', minWidth: 100 }
// ];

const BasicTable = (props) => {
  const { data, showTotal } = props; //receive data
  // const reducer = (previousValue, currentValue) => {
  //   return { value: previousValue.value + currentValue.value }
  // }
  // let worldwide_total = data.reduce(reducer)
  let totalsum = 0;
  for (let i = 0; i < data?.length; i++) {
    totalsum += data[i].value;
  }

  // console.log(worldwide_total);
  return (
    <TableContainer
      className="tableBody"
      component={Paper}
      style={{ maxWidth: 230, maxHeight: 550 }}
    >
      <Table sx={{ maxWidth: 100 }} size="small" aria-label="simple table">
        <TableHead className="tableHead">
          <TableRow className="tableRow">
            <TableCell className="tableCell">Country</TableCell>
            <TableCell className="tableCell" align="right">
              Count
            </TableCell>
          </TableRow>
        </TableHead>
        {showTotal ? (
          <TableBody className="tableBody">
            <TableRow
              className="tableRow"
              key={"worldwide total"}
              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell className="tableCell" component="th" scope="row">
                Worldwide Total
              </TableCell>
              <TableCell align="right">{totalsum}</TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody className="tableBody">
            {data &&
              data.map((elem) => {
                return (
                  <TableRow
                    className="tableRow"
                    key={elem.country}
                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell className="tableCell" component="th" scope="row">
                      {elem.country}
                    </TableCell>
                    <TableCell className="tableCell" align="right">
                      {elem.value}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
