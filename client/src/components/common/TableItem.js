import React from 'react';
import PropTypes from 'prop-types';

const TableItem = ({
  items,
  onAddClick,
  onDeleteClick
}) => {
  let itemlist = items.map(item =>
    <tr key={item._id}>
      {onAddClick &&
        <td>
          <button onClick={(e) => onAddClick(item._id, e)}>
            <i className="fas fa-plus" />
          </button>
        </td>
      }
      <td>{item.name}</td>
      <td>{item.calories}</td>
      {onDeleteClick &&
        <td>
          <button onClick={() => onDeleteClick(item._id)}>
            <i className="fas fa-trash" />
          </button>
        </td>
      }
    </tr>
  );
  return itemlist;
}

TableItem.propTypes = {
  items: PropTypes.array.isRequired,
  onAddClick: PropTypes.func,
  onDeleteClick: PropTypes.func
}

export default TableItem;