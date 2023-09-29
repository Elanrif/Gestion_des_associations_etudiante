import  React,{useState,useContext} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { RxUpdate } from "react-icons/rx";
import DeleteUser from "./User/DeleteUser"
import { FcInfo } from "react-icons/fc";
import { Link } from "react-router-dom";
import axios from "axios";
import UserFilter from "./UserFilter";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { UserInfoContext } from "../../../AuthContext";

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
  { id: "apogee", label: "Num Apogée", minWidth: 10 },
  { id: "name", label: "Nom", minWidth: null },
  { id: "lastName", label: "Prenom", minWidth: null },
  { id: "role", label: "Role", minWidth: null },
  { id: "email", label: "Email", minWidth: null },
  { id: "option", label: "OPTION", minWidth: null },
  /*   { id: "update", label: "", minWidth: null },
  { id: "view", label: "", minWidth: null }, */
];

const handleClickTable = (e) => {
  console.log("vous avez supprimer : ", e);
};

/*<DeleteUser membre ={"Elanrif"}/>  */
const opt = (e) => (
  <div className="flex items-center">
    <DeleteUser user={e} />

    <button>
      <Link to={`/dashboard/admin/user/update/${e.id}`}>
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

function createData(key, apogee, image, name, lastName, role, email, option) {
  return { key, apogee, image, name, lastName, role, email, option };
}


export default function UsersPage() {

    const { userConnected} = useContext(UserInfoContext);


  const [users, setUsers] = React.useState([]);
  const [search, setSearch] = useState({
    response: "",
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    displayUsers();
  }, []);

  const displayUsers = () => {
    axios
      .get("http://localhost:8080/user/find/all")
      .then((response) => {
        
      
        const filteredUsers = response.data.filter(user => user.id !== userConnected.id);
        setUsers(filteredUsers);

      })
      .catch((error) => {
        console.log("error : ", error);
      });
  };

  const rows = users.map((item, index) =>
    createData(
      index + 1,
      item.apogee,
      item.image,
      item.firstName,
      item.lastName,
      item.role,
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

    axios
      .get(
        "http://localhost:8080/user/findByFirstNameContainingOrLastNameContaining",
        {
          params: {
            name: `${value}`,
          },
        }
      )
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterFirstNameAsc = () => {
    axios
      .get("http://localhost:8080/user/findAllByOrderByFirstNameAsc")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterFirstNameDesc = () => {
    axios
      .get("http://localhost:8080/user/findAllByOrderByFirstNameDesc")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterLastNameAsc = () => {
    axios
      .get("http://localhost:8080/user/findAllByOrderByLastNameAsc")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterLastNameDesc = () => {
    axios
      .get("http://localhost:8080/user/findAllByOrderByLastNameDesc")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="ms-3 mt-4 text-md uppercase text-2xl font-black text-slate-500">
            liste des Utllisateurs
          </h1>
          <Link to="/dashboard/admin/association/save">
            <button className="px-2 py-1 my-3 ms-3 capitalize text-white rounded-lg hover:bg-blue-400 bg-blue-400 duration-300 ease-in-out" disabled>
              ajouter
            </button>
          </Link>
        </div>

        <div>
          <UserFilter
            filterByFirstNameAsc={filterFirstNameAsc}
            filterByFirstNameDesc={filterFirstNameDesc}
            filterByLastNameAsc={filterLastNameAsc}
            filterByLastNameDesc={filterLastNameDesc}
          />
        </div>

        <div className="me-4">
          <form className="relative group">
            {" "}
            <SearchRoundedIcon className="absolute group-hover:text-blue-500 duration-300 text-slate-500 top-3 left-3" />
            <input
              className="w-[20rem] ps-12 capitalize bg-slate-50 focus:bg-white border ring-offset-blue-400 px-3 py-2 rounded-xl focus:ring-1 ring-offset-1 focus:outline-none duration-300"
              placeholder="rechercher par nom ou prenom..."
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
              {columns.map((column,index) => (
                <TableCell
                  key={index}
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
              .map((row,index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}> {/* key= {row.code} */}
                    {columns.map((column,index) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={index} /* key={column.id} */
                          align={column.align}
                          className="min-w-[1rem] text-center"
                        >
                          {column.id === "image" ? (
                            <img
                              /*  src={value} */
                              src={
                                value != null
                                  ? `data:image/jpeg;base64,${value}`
                                  : `/image/users/images.png`
                              }
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
