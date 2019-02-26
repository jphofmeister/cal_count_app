import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Table } from 'reactstrap';

const TableStyle = styled(Table)`
  thead {
    th {
      padding: 5px 1px;
      vertical-align: middle;
      border-top: none;
    }
  }

  tbody {
    td {
      border: none;
      padding: 1px;
      vertical-align: middle;
    }
  }
`;

const IconButton = styled.button`
  border: none;
  color: #5677E8;
  padding: 7px 12px;
  border-radius: 50%;

  :hover {
    cursor: pointer;
    background-color: #EDEAE9;
  }
`;

const FoodIngredientTable = ({
  items,
  headings,
  onAddClick,
  onDeleteClick
}) => {
  let headinglist = headings.map(heading =>
    <th key={heading}>{heading}</th>
  );

  let itemlist = items.map(item =>
    <tr key={item._id}>
      {onAddClick &&
        <td>
          <IconButton onClick={(e) => onAddClick(item._id, item.calories, e)}>
            <i className="fas fa-plus" />
          </IconButton>
        </td>
      }

      <td>{item.name}</td>

      {item.quantity &&
        <td>{item.quantity}</td>
      }

      <td>{item.calories}</td>

      {onDeleteClick &&
        <td>
          <IconButton onClick={() => onDeleteClick(item._id, item.calories)}>
            <i className="far fa-trash-alt" />
          </IconButton>
        </td>
      }
    </tr>
  );

  return (
    <TableStyle>
      <thead>
        <tr>
          {headinglist}
        </tr>
      </thead>
      <tbody>
        {itemlist}
      </tbody>
    </TableStyle>
  );
}

FoodIngredientTable.propTypes = {
  items: PropTypes.array.isRequired,
  onAddClick: PropTypes.func,
  onDeleteClick: PropTypes.func
}

export default FoodIngredientTable;