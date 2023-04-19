import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton, TablePagination, Toolbar } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import { useState } from "react";

const useStyles = makeStyles((theme: any) => ({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: "50%",
  },
}));

type Params = {
  headers: {
    text: string;
    align: string;
  }[];
  rows: any[];
  loadNextPage: () => void;
  onRefresh: () => void;
  hasNextPage: boolean;
};

export default function CommonTable(props: Params) {
  const classes = useStyles();
  const { headers, rows, loadNextPage, onRefresh, hasNextPage } = props;
  const [page, setPage] = useState(0);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
    loadNextPage();
  };

  return (
    <Paper>
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <IconButton
          onClick={() => {
            setPage(0);
            onRefresh();
          }}
        >
          <RefreshIcon />
        </IconButton>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header: any) => (
                <TableCell align={header.align} key={header.text}>
                  {header.text}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * 50, page * 50 + 50).map((row: any) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {Object.keys(row)
                  .filter((cell) => cell !== "id")
                  .map((cell, index) => (
                    <TableCell
                      align={index === 0 ? "left" : "right"}
                      key={cell}
                    >
                      {cell === "url" || cell === "homepageUrl" ? (
                        <a href={row[cell]} target="_blank" rel="noreferrer">
                          {row[cell]}
                        </a>
                      ) : cell === "avatarUrl" ? (
                        <img
                          src={row[cell]}
                          className={classes.avatar}
                          alt=""
                        />
                      ) : (
                        row[cell]
                      )}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={hasNextPage ? rows.length + 50 : rows.length}
        rowsPerPage={50}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={() => {}}
      />
    </Paper>
  );
}
