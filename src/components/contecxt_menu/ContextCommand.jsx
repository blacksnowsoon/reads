import React from 'react';
import { shelfName } from './ContextMenu';
import PropTypes from "prop-types";
const ContextCommand = ({ disable, shelf, changeShelf }) => {
  return (
    <option
      disabled={disable}
      key={shelf.id}
      className="context-btn"
      onClick={changeShelf}
      value={shelfName(shelf.mode.replaceAll(" ", ""))}
    >
      {shelf.mode}
    </option>
  );
};
ContextCommand.propTypes = {
  disable: PropTypes.bool.isRequired,
  shelf: PropTypes.object.isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default ContextCommand