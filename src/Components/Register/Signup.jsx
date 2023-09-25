import React, { useEffect, useState } from "react";
import { Button, Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router";
import { green } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, register } from "../../Redux/Auth/Action";

const Signup = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  console.log("current user", auth.reqUser);
  const [inputData, setInputData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit", inputData);
    dispatch(register(inputData));
    setOpenSnackbar(true);
  };
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((values) => ({ ...values, [name]: value }));
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
              <p className="mb-2">User Name</p>
              <input
                placeholder="Enter User Name"
                onChange={(e) => handleChange(e)}
                type="text"
                name="fullName"
                value={inputData.fullName}
                className="py-2 px-3 outline outline-green-600 w-full rounded-md border-1"
              />
            </div>
            <div>
              <p className="mb-2">Email</p>
              <input
                placeholder="Enter your Email"
                onChange={(e) => handleChange(e)}
                type="text"
                name="email"
                value={inputData.email}
                className="py-2 px-3 outline outline-green-600 w-full rounded-md border-1"
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
                className="py-2 px-3 outline outline-green-600 w-full rounded-md border-1"
              />
            </div>
            <div>
              <Button
                type="submit"
                sx={{ bgcolor: green[700], padding: ".5rem 0rem" }}
                className="w-full bg-green-600"
                variant="contained"
              >
                Sign up
              </Button>
            </div>
          </form>
          <div className="flex space-x-3 items-center mt-5">
            <p className="m-0">Already have Account?</p>
            <Button variant="text" onClick={() => navigate("/login")}>
              Login
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
          Create Account success!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Signup;
