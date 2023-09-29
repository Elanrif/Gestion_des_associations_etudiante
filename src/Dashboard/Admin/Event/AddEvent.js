import React from "react";
import LeftE from "./LeftE";
import FormEvent from "./FormEvent";

function AddEvent() {
  return (
    <>
      <div className="flex justify-center h-[100vh] w-full">
        <LeftE add={true} />
        <FormEvent addForm={true} pannel="add" />
      </div>
    </>
  );
}

export default AddEvent;
