import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Table } from 'reactstrap';

const TableStyle = styled(Table)`
  line-height: 1.3;

  tr {
    
  }
  
  thead {
    th {
      padding: 10px 5px;
      vertical-align: middle;
      border-top: none;
    }
  }

  tbody {
    td {
      border: none;
      padding: 1px 5px;
      padding-bottom: 1rem;
      vertical-align: middle;
    }
  }
`;

const IconButton = styled.button`
  border: none;
  color: #5677E8;
  padding: 6px 9px 5px 9px;
  border-radius: 50%;

  :hover {
    cursor: pointer;
    //background-color: #EDEAE9;
    background-color: #e4e8f0;
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