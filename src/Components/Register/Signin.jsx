import { Button, Alert, Snackbar } from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { login, currentUser } from "../../Redux/Auth/Action";

const Signin = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({ email: "", password: "" });
  const { auth } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  console.log("current user", auth.reqUser);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(inputData));
    setOpenSnackbar(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((values) => ({ ...values, [name]: value }));
  };
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (token) dispatch(currentUser(token));
  }, [token]);
  useEffect(() => {
    if (auth.reqUser?.fullName) {
      navigate("/");
    }
  }, [auth.reqUser]);
  return (
    <div>
      <div className="flex justify-center h-screen items-center">
        <div className="w-[30%] p-10 shadow-md bg-white">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <p className="mb-2">Email</p>
              <input
                placeholder="Enter your Email"
                onChange={(e) => handleChange(e)}
                type="text"
                name="email"
                value={inputData.email}
                className="p-2 outline outline-green-600 w-full rounded-md border"
              />
            </div>
            <div>
              <p className="mb-2">Password</p>
              <input
                placeholder="Enter your Password"
                onChange={(e) => handleChange(e)}
                type="text"
                name="password"
                value={inputData.password}
                className="p-2 outline outline-green-600 w-full rounded-md border"
              />
            </div>
            <div>
              <Button
                type="submit"
                sx={{ bgcolor: green[700], padding: ".5rem 0rem" }}
                className="w-full bg-green-600"
                variant="contained"
              >
                Sign In
              </Button>
            </div>
          </form>
          <div className="flex space-x-3 items-center mt-5">
            <p className="m-0">Create New Account</p>
            <Button variant="text" onClick={() => navigate("/signup")}>
              Register
            </Button>
          </div>
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Login success!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Signin;
