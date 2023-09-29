import React from 'react'
import AssoForm from './AssoForm'
import LeftAuth from '../../../Forms/LeftAuth';
import Left from './Left';

function AddAssociation() {
  return (
    <>
      <div className="flex justify-center h-[100vh] w-full">
        <Left add={true} />
        <AssoForm addForm={true} pannel="addAsso" />
      </div>
    </>
  );
}

export default AddAssociation
