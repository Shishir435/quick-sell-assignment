import { useState } from "react";
import filterIcon from "../../assets/Images/Tuning.svg";
import downIcon from "../../assets/Images/Down.svg";
import "./Navbar.css";

export default function Navbar(props) {
  const [toggleFilter, setToggleFilter] = useState(false);
  function handleDisplayToggle(e) {
    setToggleFilter(!toggleFilter);
    if (e.target.value !== undefined) {
      props.handleGroupValue(e.target.value);
    }
  }
  function handleOrderingValue(e) {
    setToggleFilter(!toggleFilter);
    if (e.target.value !== undefined) {
      props.handleOrderValue(e.target.value);
    }
  }

  return (
    <>
      <section className="nav">
        <div className="nav-container">
          <div>
            <div className="nav-display-btn" onClick={handleDisplayToggle}>
              <div className="nav-display-icon nav-display-filter">
                <img src={filterIcon} alt="icon" />
              </div>
              <div className="nav-display-heading">Display</div>
              <div className="nav-display-icon nav-display-drop">
                <img src={downIcon} alt="icon" />
              </div>
            </div>
            <div
              className={
                toggleFilter
                  ? "nav-display-dropdown nav-display-dropdown-show"
                  : "nav-display-dropdown"
              }
            >
              <div className="nav-display-filters">
                <div className="nav-dropdown-category">Grouping</div>
                <div className="nav-dropdown-selector">
                  <select
                    value={props.groupValue}
                    onChange={handleDisplayToggle}
                    className="nav-selector"
                    name="grouping"
                    id=""
                  >
                    <option value="status">Status</option>
                    <option value="user">User</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>
              </div>
              <div className="nav-display-filters">
                <div className="nav-dropdown-category">Ordering</div>
                <div className="nav-dropdown-selector">
                  <select
                    value={props.orderValue}
                    onChange={handleOrderingValue}
                    className="nav-selector"
                    name="grouping"
                    id=""
                  >
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
