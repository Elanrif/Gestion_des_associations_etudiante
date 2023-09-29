import React from 'react'
import FormMembre from './FormMembre';
import LeftM from './LeftM';

function AddMembre() {
  return (
    <>
      <div className="flex justify-center h-[100vh] w-full">
        <LeftM add={true} />
        <FormMembre addForm={true} pannel="add" />
      </div>
    </>
  );
}

export default AddMembre
