import React, { useState, useEffect, useContext } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import DeleteAe from "../../Admin/AssociationForm/DeleteAe";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AssoFilter from "../../Admin/Main/AssoFilter";
import { UserInfoContext } from "../../../AuthContext";
import BackDrop from "../../../BackDrop";

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
  { id: "nom", label: "Nom", minWidth: 10 },
  { id: "def", label: "Def", minWidth: null },
  { id: "desc", label: "Desc", minWidth: null },
  { id: "date", label: "Date Création", minWidth: null },
  { id: "option", label: "OPTION", minWidth: null },
];

const handleClickTable = (e) => {
  console.log("vous avez supprimer : ", e);
};

function createData(key, image, nom, def, desc, date, option) {
  return { key, image, nom, def, desc, date, option };
}

export default function Association() {

  const navigate = useNavigate() ; 

  const { userConnected, setUserConnected } = useContext(UserInfoContext);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [assos, setAsso] = useState([]); // dans le cycle de vie on entrera dans le DOM avec tab vide []
  const [checkAsso, setCheckAsso] = useState(false) // quand on entre dans axios.get on le met a true peut importe le resultat 
  const [search, setSearch] = useState({
    response: "",
  });

  const [leuci, setLeuci] = useState(0);
  /* il faut préciser le type de useState que c'est un tableau [] */
  /* ainsi on évite l'erreur 'row.slice is not a function.....' */

  useEffect(() => {
    display();
  }, [leuci]);

  /* sur POSTMAIN, il a un size qu'il ne peut pas dépassé pour prendre les objets,
    on a pas ce problème sur 'axios' heureusement */
  const play = () => {
    axios
      .get("http://localhost:8080/association/findByName/containing", {
        params: {
          name: "de",
        },
      })
      .then((response) => {
        setAsso(response.data);      
        console.log("containging : ", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const display = () => {
    axios
      .get(`/association/userInfo/associations/${userConnected.id}`)
      .then((response) => {
        setAsso(response.data);
        setCheckAsso(true); //pour dire voila on a executer la methode et peu importe le resultat vide ou liste de data, on met a true.
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* en +,tu peux mettre des fonctions , composant etc.... Dans cette fonction tu peux modifier les valeurs , même envoyé des <div> */
  const opt = (e) => (
    <div className="flex ">
     
      <button onClick={() => navigate(`/association/${e.id}`)}>
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


  const rows = assos.map((item, index) =>
    createData(
      index + 1,
      item.image,
      item.name,
      <div className="">
        {item.def && item.def.split(" ").slice(0, 3).join(" ")} ...
      </div>,
      <div className="">
        {item.desc && item.desc.split(" ").slice(0, 3).join(" ")} ...
      </div>,
      item.date,
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
      <div className="flex  justify-between items-center">
        <div>
          <h1 className="ms-3 mt-4 text-md uppercase text-2xl font-black text-slate-500">
            liste des Associations
          </h1>
          <Link>
            <button className="px-2 py-1 my-3 ms-3 capitalize text-white rounded-lg hover:bg-blue-700 bg-blue-400 duration-300 ease-in-out"> 
            </button>
          </Link>
        </div>


        <div className="me-4">
          <form className="relative group">
            {" "}
            <SearchRoundedIcon className="absolute group-hover:text-blue-500 duration-300 text-slate-500 top-3 left-3" />
            <input
              className="w-[20rem] ps-12 bg-slate-50 focus:bg-white border ring-offset-blue-400 px-3 py-2 rounded-xl focus:ring-1 ring-offset-1 normal-case focus:outline-none duration-300"
              placeholder="recherche par nom..."
              value={search.data}
              name="response"
              onChange={handlChange}
            />
          </form>
        </div>
      </div>{" "}
      {/* c'est un tableau vide . */}
      {assos.length > 0 ? (
        <>
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
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
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
        </>
      ) : ( /* quand on a pas d'association : [] */
        <>
          {checkAsso === false ? ( //au début on affiche le backDrop, car check initialisé a false
            <div>
              <p className="text-center mt-[10rem] text-3xl font-black">
                {" "}
               En attente de chargement ....{" "}
              </p>

              <BackDrop />
            </div>
          ) : ( //aprés on retourne dans le DOM et que Association tjrs [] , on entre ici car on a mis a true peu importe le resultat de Asso.
            <div>
              <p className="text-center mt-[10rem] text-3xl font-black">
                {" "}
                Vous n'avez suivi aucune association ....{" "}
              </p>

            </div>
          )}
        </>
      )}
    </div>
  );
}