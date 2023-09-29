import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import {MdDelete} from "react-icons/md"
import { RxUpdate } from "react-icons/rx";
import { FcInfo } from "react-icons/fc";
import DeleteUser from "./Main/User/DeleteUser";
import { Link } from "react-router-dom";


const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));
/* les valeurs de l'id de column , ET de la function createData doivent avoir les mêmes noms correspondantes, 
sinon ça ne marchera pas. */
const columns = [
  { id: "key", label: "#", minWidth: null },
  { id: "image", label: "Image", minWidth: 10 },
  { id: "cin", label: "CIN", minWidth: 10 },
  { id: "name", label: "Nom", minWidth: null },
  { id: "lastName", label: "Prenom", minWidth: null },
  { id: "role", label: "Role", minWidth: null },
  { id: "email", label: "Email", minWidth: null },
  { id: "option", label: "OPTION", minWidth: null },
/*   { id: "update", label: "", minWidth: null },
  { id: "view", label: "", minWidth: null }, */
];

const handleClickTable = (e)=>{
     console.log("vous avez supprimer : " , e) ; 
}

/*<DeleteUser membre ={"Elanrif"}/>  */
const opt = (e) => (
  <div className="flex items-center">
    <DeleteUser user={e} />

    <button onClick={() => handleClickTable(e)}>
      <Link to={`/dashboard/admin/association/update/${e.id}`}>
        <BootstrapTooltip title="Modifier">
          <div className="group w-[3rem] flex items-center justify-center">
            <RxUpdate
              size="1.3rem"
              className="text-blue-700 group-hover:text-cyan-500 duration-300"
            />
          </div>
        </BootstrapTooltip>
      </Link>
    </button>

    <button onClick={() => handleClickTable(e)}>
      <BootstrapTooltip title="Information">
        <div className="group flex items-center justify-center">
          <FcInfo
            size="1.3rem"
            className="text-blue-700 group-hover:text-blue-500 duration-300"
          />
        </div>
      </BootstrapTooltip>
    </button>
  </div>
);




function createData(key,cin,image,name,lastName,role,email,option){

  return {key,cin,image,name,lastName,role,email,option}
}

const users = [
  {
    firstName: "John",
    lastName: "Doe",
    role: "USER",
    email: "john@example.com",
    cin: "123456789",
    image: "/Membre/image/v1/president.jpg", // Nom du fichier image
  },
  {
    firstName: "Alice",
    lastName: "Smith",
    role: "ADMIN",
    email: "alice@example.com",
    cin: "987654321",
    image: "alice.jpeg", // Nom du fichier image
  },
  {
    firstName: "Bob",
    lastName: "Johnson",
    role: "USER",
    email: "bob@example.com",
    cin: "456789123",
    image: "/Membre/image/v1/president.jpg", // Nom du fichier image
  },
  {
    firstName: "Emma",
    lastName: "Wilson",
    role: "USER",
    email: "emma@example.com",
    cin: "654321987",
    image: "/Membre/image/v1/president.jpg", // Nom du fichier image
  },
  {
    firstName: "David",
    lastName: "Lee",
    role: "USER",
    email: "david@example.com",
    cin: "789123456",
    image: "/Membre/image/v1/president.jpg", // Nom du fichier image
  },
  {
    firstName: "Sophia",
    lastName: "Brown",
    role: "ADMIN",
    email: "sophia@example.com",
    cin: "321987654",
    image: "sophia.jpeg", // Nom du fichier image
  },
  {
    firstName: "James",
    lastName: "Taylor",
    role: "USER",
    email: "james@example.com",
    cin: "987654123",
    image: "/Membre/image/v1/president.jpg", // Nom du fichier image
  },
  {
    firstName: "Olivia",
    lastName: "Davis",
    role: "USER",
    email: "olivia@example.com",
    cin: "123789456",
    image: "olivia.jpeg", // Nom du fichier image
  },
  {
    firstName: "William",
    lastName: "Miller",
    role: "ADMIN",
    email: "william@example.com",
    cin: "789456123",
    image: "/Membre/image/v1/president.jpg", // Nom du fichier image
  },
  {
    firstName: "Charlotte",
    lastName: "Anderson",
    role: "USER",
    email: "charlotte@example.com",
    cin: "654987321",
    image: "/Membre/image/v1/president.jpg", // Nom du fichier image
  },
];

const rows = users.map((item,index)=>(
          
             createData(index+1,item.cin,item.image,item.firstName,item.lastName,item.role,item.email,opt(item)))
  )


export default function StickyTable() {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
     <div>
      <TableContainer className="border-2 border-slate-200">
        <Table>
          <TableHead>
            <TableRow className="bg-slate-50">
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className="text-center"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} className="min-w-[1rem] text-center">
                           {column.id === "image" && typeof value === "string" && value.toLowerCase().endsWith(".jpg") ? (
                              <img src={value} alt="Image" className="w-16 rounded-full h-16" />
                            ) : (
                              column.format && typeof value === "number" ? column.format(value) : value
                            )}
                            <div>
                            </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[8, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </div>
  );
}
