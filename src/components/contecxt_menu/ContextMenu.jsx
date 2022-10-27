import React from "react";
import ContextCommand from "./ContextCommand";
import PropTypes from "prop-types";
const ContextMenu = ({ book, contextMenu, onChangeShelf }) => {
  // handel the slected menu option
  const changeShelf = (e) => {
    e.preventDefault();
    const shelf = e.target.value;
    onChangeShelf(shelf);
  };

  // ----------------------------------------------------------
  // create a gourp of options as a commands to select element
  const selectList = Array.from(contextMenu).map((shelf) => {
    let disable = 
      book.shelf=== undefined ? false
      : shelfName(shelf.mode) === book.shelf
    
    

    return (
      
      <ContextCommand
        key={Math.random()}
        disable={disable}
        shelf={shelf}
        changeShelf={changeShelf}
      />
    );
  });
  return (
    <select className="context-list">
      <option disabled={true} value="">
        Move To...
      </option>
      {selectList}
    </select>
  );
};
// ----------------------------------------------------------
// return the string value of the option list as it is used in the database
export const shelfName = (name) => {
  return name.charAt(0).toLowerCase() + name.slice(1).replaceAll(" ", "");
};

ContextMenu.propTypes = {
  book: PropTypes.object.isRequired,
  contextMenu: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
};

export default ContextMenu;
