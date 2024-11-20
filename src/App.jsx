import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import "./App.css";
import List from "./Components/List/List";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  const statusList = ["In progress", "Backlog", "Todo", "Done", "Cancelled"];
  const userList = [
    "Yogesh",
    "Shankar Kumar",
    "Ramesh",
    "Suresh",
    "Anoop Sharma",
  ];
  const priorityList = [
    { name: "No priority", priority: 0 },
    { name: "Low", priority: 1 },
    { name: "Medium", priority: 2 },
    { name: "High", priority: 3 },
    { name: "Urgent", priority: 4 },
  ];

  const [groupValue, setGroupValue] = useState(
    getStateFromLocalStorage() || "status"
  );
  const [orderValue, setOrderValue] = useState("title");
  const [ticketDetails, setTicketDetails] = useState([]);

  const orderDataByValue = useCallback(
    async (cardsArray) => {
      if (orderValue === "priority") {
        cardsArray.sort((a, b) => b.priority - a.priority);
      } else if (orderValue === "title") {
        cardsArray.sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();
          return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
        });
      }
      setTicketDetails(cardsArray);
    },
    [orderValue]
  );

  function saveStateToLocalStorage(state) {
    localStorage.setItem("groupValue", JSON.stringify(state));
  }

  function getStateFromLocalStorage() {
    const storedState = localStorage.getItem("groupValue");
    return storedState ? JSON.parse(storedState) : null;
  }

  useEffect(() => {
    saveStateToLocalStorage(groupValue);
    async function fetchData() {
      const response = await axios.get(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      await refactorData(response);
    }
    fetchData();

    async function refactorData(response) {
      let ticketArray = [];
      if (response.status === 200) {
        ticketArray = response.data.tickets.map((ticket) => {
          const user = response.data.users.find(
            (user) => user.id === ticket.userId
          );
          return { ...ticket, userObj: user };
        });
      }
      setTicketDetails(ticketArray);
      orderDataByValue(ticketArray);
    }
  }, [groupValue, orderDataByValue]);

  function handleGroupValue(value) {
    setGroupValue(value);
  }

  function handleOrderValue(value) {
    setOrderValue(value);
  }

  const renderListGroup = (listType, dataList, additionalProps = {}) => {
    return dataList.map((listItem, i) => {
      return (
        <List
          key={`${i}-${listType}`}
          groupValue={listType}
          orderValue={orderValue}
          listTitle={listType === "priority" ? listItem.priority : listItem}
          listIcon=""
          ticketDetails={ticketDetails}
          {...additionalProps}
        />
      );
    });
  };

  return (
    <>
      <Navbar
        groupValue={groupValue}
        orderValue={orderValue}
        handleGroupValue={handleGroupValue}
        handleOrderValue={handleOrderValue}
      />
      <section className="board-details">
        <div className="board-details-list">
          {
            {
              status: renderListGroup("status", statusList),
              user: renderListGroup("user", userList),
              priority: renderListGroup("priority", priorityList, {
                priorityList,
              }),
            }[groupValue]
          }
        </div>
      </section>
    </>
  );
}

export default App;
