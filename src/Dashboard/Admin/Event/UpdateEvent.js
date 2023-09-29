import React from "react";
import LeftE from "./LeftE";
import FormEvent from "./FormEvent";

function UpdateEvent() {
  return (
    <>
      <div className="flex justify-center h-[100vh] w-full">
        <LeftE update={true} />
        <FormEvent updateForm={true} pannel="update" />
      </div>
    </>
  );
}

export default UpdateEvent;
