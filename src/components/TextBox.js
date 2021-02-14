import React from "react";
import { data } from "../api/mockData.js";
import PropTypes from "prop-types";

export default function TextBox() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [list, showList] = React.useState([]);
  const [error, showError] =  React.useState("");

  const handleList = val => {
    console.log(val);
    let newData = data.filter(
      el => el.first_name.toLowerCase().indexOf(val.toLowerCase()) > -1
    );
    showList(newData);
    if(newData.length === 0) {
      showError("Not able to track user")
    }
  };

  const handleChange = e => {
    setSearchTerm(e.target.value);
    handleList(e.target.value);
  };

  const handleClick = e => {
    console.log(e);
    setSearchTerm(e.target.innerHTML);
    showList([]);
  };

  return (
    <>
      <div className="autocomplete">
        <input type="text" value={searchTerm} onChange={handleChange} />
      </div>
      <div>
        <ul className="autocomplete-items">
          {list.map(el => {
            return (
              <li onClick={handleClick} key={el.id}>
                {el.first_name}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

TextBox.propTypes = {
  list: PropTypes.instanceOf(Array).isRequired
};
