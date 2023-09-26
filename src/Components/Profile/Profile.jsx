import React, { useState } from "react";
import { BsArrowLeft, BsCheck2, BsPencil } from "react-icons/bs";
import { updateUser } from "../../Redux/Auth/Action";
import { useDispatch, useSelector } from "react-redux";

const Profile = ({ handleCloseOpenProfile }) => {
  const [flag, setFlag] = useState(false);
  const [username, setUsername] = useState(null);
  const [tempPicture, setTempPicture] = useState(null);
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleFlag = () => {
    setFlag(true);
  };
  const handleCheckClick = () => {
    setFlag(false);
    const data = {
      token: localStorage.getItem("token"),
      data: { fullName: username },
    };
    dispatch(updateUser(data));
  };
  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const uploadToCloudnary = (pics) => {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "whatsapp");
    data.append("cloud_name", "dttlhvsas");
    fetch("https://api.cloudinary.com/v1_1/dttlhvsas/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setTempPicture(data.url.toString());
        // setMessage("profile image updated successfully")
        // setOpen(true);
        console.log("imgUrl ", data.url.toString());
        const dataa = {
          token: localStorage.getItem("token"),
          data: { profilePicture: data.url.toString() },
        };
        dispatch(updateUser(dataa));
      });
  };

  const handleUpdateName = (e) => {
    const data = {
      token: localStorage.getItem("token"),
      data: { fullName: username },
    };
    if (e.target.key === "Enter") {
      dispatch(updateUser(data));
    }
  };
  return (
    <div className="w-full h-full">
      <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
        <BsArrowLeft
          className="cursor-pointer text-2xl font-bold"
          onClick={handleCloseOpenProfile}
        />
        <p className="cursor-pointer font-semibold">Profile</p>
      </div>

      {/* update profile image section */}
      <div className="flex flex-col justify-center items-center my-12">
        <label htmlFor="imgInput">
          <img
            className="rounded-full w-[15vw] h-[15vw] cursor-pointer object-cover"
            src={
              tempPicture ||
              auth.reqUser?.profilePicture ||
              "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg"
            }
            alt=""
          />
        </label>
        <input
          onChange={(e) => uploadToCloudnary(e.target.files[0])}
          type="file"
          id="imgInput"
          className="hidden"
        />
      </div>

      {/* name section */}
      <div className="bg-white px-3">
        <p className="py-3 ">Your Name</p>
        {!flag && (
          <div className="w-full flex items-center justify-between">
            <p className="py-3">{username || auth.reqUser?.fullName}</p>
            <BsPencil onClick={handleFlag} className="cursor-pointer" />
          </div>
        )}

        {flag && (
          <div className="w-full flex items-center justify-between">
            <input
              onKeyPress={handleUpdateName}
              onChange={handleChange}
              className="w-[80%] outline-none border-none border-blue-700 p-2"
              type="text"
              placeholder="Enter your name"
            />
            <BsCheck2
              onClick={handleCheckClick}
              className="text-2xl cursor-pointer"
            />
          </div>
        )}
      </div>

      <div className="px-3 my-5">
        <p className="py-10">
          This is not your username, this name will be visible to whatsapp
          contacts.
        </p>
      </div>
    </div>
  );
};

export default Profile;
