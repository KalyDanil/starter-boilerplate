import React from 'react';

const AddedFurniture = (dataItem, index, moveItem) => {
  return (
    <img 
      id={dataItem.id} 
      name={dataItem.name} 
      src={`/img/furniture/${dataItem.name}.jpg`}  
      alt="furniture" 
      onMouseDown={(e) => moveItem(e)}
      style={{
        position: 'absolute',
        zIndex: '1000',
        width: '80px',
        height: '80px',
        left: `${dataItem.left}%`,
        top: `${dataItem.top}%`,
      }}
      key={index+dataItem.id} 
    />
  )
}

export default AddedFurniture;