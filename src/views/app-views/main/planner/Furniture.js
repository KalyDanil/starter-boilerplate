import React from 'react';
import { nanoid } from 'nanoid/non-secure';

const Furniture = (name, index, moveItem) => {
  return (
    <div className="controller__furnitureList-furniture" key={name+index}>
      <img id={nanoid()} name={name} src={`/img/furniture/${name}.jpg`}  alt="furniture" onMouseDown={(e) => moveItem(e)} />
      <span>{name}</span>
    </div>	
  );
};

export default Furniture;