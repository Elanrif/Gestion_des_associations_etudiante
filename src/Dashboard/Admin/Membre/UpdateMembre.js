import React from 'react'
import FormMembre from './FormMembre';
import LeftM from './LeftM';

function UpdateMembre() {
  return (
    <>
      <div className="flex justify-center h-[100vh] w-full">
        <LeftM update={true} />
        <FormMembre updateForm={true} pannel="update" />
      </div>
    </>
  );
}

export default UpdateMembre
