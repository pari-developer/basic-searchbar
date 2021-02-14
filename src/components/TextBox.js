import React from "react";
import { data } from "../api/mockData.js";
import PropTypes from "prop-types";

export default function TextBox() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [list, showList] = React.useState([]);
  const [error, showError] = React.useState("");

  let cachedSearchText = '';

  const handleList = (val,cacheText) => {
    if(val === cacheText) {
    console.log(val);
    let newData = data.filter(
      el => el.first_name.toLowerCase().indexOf(val.toLowerCase()) > -1
    );
    showList(newData);
    if (newData.length === 0) {
      showError("User not found ");
    } else {
      showError("");
    }
  };
}
  const handleSearchTermChange = e => {
    setSearchTerm(e.target.value);
    cachedSearchText = e.target.value
    handleList(e.target.value,cachedSearchText);
  };

  const handleClick = e => {
    console.log(e);
    setSearchTerm(e.target.innerHTML);
    showList([]);
  };

  return (
    <>
      <div className="autocomplete">
        <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
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
      <div>{error}</div>
    </>
  );
}

TextBox.propTypes = {
  list: PropTypes.instanceOf(Array).isRequired
};
