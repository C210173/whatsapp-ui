import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const SelectedMember = ({ handleRemoveMember, member }) => {
  return (
    <div className="flex items-center bg-slate-300 rounded-full">
      <img
        className="w-7 h-7 rounded-full"
        src="https://vapa.vn/wp-content/uploads/2022/12/hinh-nen-3d-4k-005.jpg"
        alt=""
      />
      <p className="px-2">username</p>
      <AiOutlineClose
        onClick={handleRemoveMember}
        className="pr-1 cursor-pointer"
      />
    </div>
  );
};

export default SelectedMember;
