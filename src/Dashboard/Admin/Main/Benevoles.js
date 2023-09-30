import React, { useState, useEffect } from "react";
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
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { FcInfo } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import DeleteAe from "../AssociationForm/DeleteAe";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AssoFilter from "./AssoFilter";
import BeneFilter from "./BeneFilter";
import AssoBenevoleFilter from "./AssoBenevoleFilter";

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
/* les valeurs de l'id de columns , ET de la function createData doivent avoir les mêmes noms correspondantes, 
l'id avec les paramètre de la function createData. sinon ça ne marchera pas. */
const columns = [
  { id: "key", label: "#", minWidth: null },
  { id: "image", label: "Image", minWidth: 10 },
  { id: "apogee", label: "Apogee", minWidth: 10 },
  { id: "firstName", label: "Nom", minWidth: 10 },
  { id: "lastName", label: "Prenom", minWidth: null },
  { id: "email", label: "Email", minWidth: null },
  { id: "option", label: "OPTION", minWidth: null },
];

const handleClickTable = (e) => {
  console.log("vous avez supprimer : ", e);
};

//mettre les id de columns 
function createData(key, image, apogee, firstName, lastName, email, option) {
  return { key, image, apogee, firstName, lastName, email, option };
}

export default function Benevoles() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [associations, setAssociations] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [benevoles, setBenevoles] = useState([]);
  const [search, setSearch] = useState({
    response: "",
  });

  useEffect(() => {
    findAllAssociations();
  }, []);
  /* chercher par les associations dont les membres sont déjà présente ici.
   * ça ne sert a rien d'afficher une asso qui n'a pas de membre de bureau par exemple.
   */
  const findAllAssociations = () => {
    axios
      .get("/association/find/all")
      .then((response) => {
        // on va filter par ceux qui ont des membres de bureaus

        const filteredData = response.data.filter(
          (item) => item.benevoles.length > 0
        );
        // .length , car !=null , est faux : null # [] (tableau  vide.)

        // Si vous souhaitez ensuite utiliser setAssociations pour mettre à jour les associations
        setAssociations(filteredData);

        // setAssociations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [leuci, setLeuci] = useState(0);
  /* il faut préciser le type de useState que c'est un tableau [] */
  /* ainsi on évite l'erreur 'row.slice is not a function.....' */

  useEffect(() => {
    displayBenevoles();
  }, [leuci]);

  const displayBenevoles = () => {
    axios
      .get("/user/allBenevoles")
      .then((response) => {
        setBenevoles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* on prends un param qui est une association  */
  const handleDisplayBenevoles = (association) => {
    setBenevoles(association.benevoles);
  };

  /* en +,tu peux mettre des fonctions , composant etc.... Dans cette fonction tu peux modifier les valeurs , même envoyé des <div> */
  const opt = (e) => (
    <div className="flex ">
      <DeleteAe association={e} loadAsso={() => setLeuci(leuci + 1)} />

      <button onClick={() => handleClickTable(e)} className="mx-3">
        <BootstrapTooltip title="Information">
          <div className="group flex items-center justify-center">
            <FcInfo
              size="1.3rem"
              className="text-green-700 group-hover:text-green-500 duration-300"
            />
          </div>
        </BootstrapTooltip>
      </button>
    </div>
  );

  /*    <div className="">
        {item.def && item.def.split(" ").slice(0, 3).join(" ")} ...
      </div>,
      <div className="">
        {item.desc && item.desc.split(" ").slice(0, 3).join(" ")} ...
      </div>, */
  const rows = benevoles
    .sort((a, b) => b.id - a.id)
    .map((item, index) =>
      createData(
        index + 1,
        item.image,
        item.apogee,
        item.firstName,
        item.lastName,
        item.email,
        opt(item)
      )
    );

  const handlChange = (e) => {
    const { name, value } = e.target;

    setSearch((prev) => ({
      ...prev,
      [name]: value,
    }));

   
  };

  
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="ms-3 mt-4 text-md uppercase text-2xl font-black text-slate-500">
            liste des Bénévoles
          </h1>
          <Link >
            <button className=" text-blue-700 px-2 py-1 my-3 ms-3 capitalize rounded-lg bg-blue-700 duration-300 ease-in-out">
              ajouter
            </button>
          </Link>
        </div>

        <div className="flex items-center space-x-1">
        
          <AssoBenevoleFilter
            value={associations && associations}
            benevole={handleDisplayBenevoles}
            initial={displayBenevoles}
          />
        </div>

        <div className="me-4">
          <form className="relative group">
            {" "}
            <SearchRoundedIcon className="absolute group-hover:text-blue-500 duration-300 text-slate-500 top-3 left-3" />
            <input
              className="w-[20rem] ps-12 capitalize bg-slate-50 focus:bg-white border ring-offset-blue-400 px-3 py-2 rounded-xl focus:ring-1 ring-offset-1 focus:outline-none duration-300"
              placeholder="recherche par nom..."
              value={search.data}
              name="response"
              onChange={handlChange}
            />
          </form>
        </div>
      </div>
      <TableContainer className="border-2 border-slate-200">
        <Table>
          <TableHead>
            <TableRow className="bg-slate-50">
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className="text-start"
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
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className="text-start min-w-[1rem]"
                        >
                          {column.id === "image" ? (
                            <img
                              /*  src={value} */
                              src={`data:image/jpeg;base64,${value}`}
                              /*  src={`data:image/jpeg;base64,${value}`} */
                              alt="Image"
                              className="w-20  h-16"
                            />
                          ) : column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            value
                          )}
                          <div></div>
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
