import React from "react";
import { useNavigate } from "react-router-dom";

const StatusUserCard = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/status/{userId}`);
  };
  return (
    <div
      onClick={handleNavigate}
      className="flex items-center p-3 cursor-pointer"
    >
      <div>
        <img
          className="rounded-full w-7 h-7 lg:w-10 lg:h-10 object-cover"
          src="https://vapa.vn/wp-content/uploads/2022/12/hinh-nen-3d-4k-005.jpg"
          alt=""
        />
      </div>
      <div className="ml-2 text-white">
        <p>username</p>
      </div>
    </div>
  );
};

export default StatusUserCard;
