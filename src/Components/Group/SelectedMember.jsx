import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const SelectedMember = ({ handleRemoveMember, member }) => {
  return (
    <div className="flex items-center bg-slate-300 rounded-full">
      <img
        className="w-7 h-7 rounded-full"
        src={
          member.profilePicture ||
          "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg"
        }
        alt=""
      />
      <p className="px-2">{member.fullName}</p>
      <AiOutlineClose
        onClick={handleRemoveMember}
        className="pr-1 cursor-pointer"
      />
    </div>
  );
};

export default SelectedMember;
