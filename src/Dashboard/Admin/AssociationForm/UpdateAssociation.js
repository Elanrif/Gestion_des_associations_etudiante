import React from 'react'
import AssoForm from './AssoForm'
import Left from './Left';

function UpdateAssociation() {
  return (
    <>
      <div className="flex justify-center min-h-[100vh] w-full">
        <Left update={true}/>
        <AssoForm updateForm={true} pannel="updateAsso"/>   
      </div>
    </>
  );
}

export default UpdateAssociation
