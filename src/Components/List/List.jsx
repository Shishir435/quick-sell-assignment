import "./List.css";
import Card from "../Card/Card";
import Icons from "../Icons";

export default function List(props) {
  const { groupValue, listTitle, priorityList, ticketDetails } = props;

  const priorityIcons = {
    0: <Icons.NoPriority />,
    4: <Icons.UrgentPriority />,
    3: <Icons.HighPriority />,
    2: <Icons.MediumPriority />,
    1: <Icons.LowPriority />,
  };

  const statusIcons = {
    Backlog: <Icons.Backlog />,
    Todo: <Icons.Todo />,
    "In progress": <Icons.InProgress />,
    Done: <Icons.Done />,
    Cancelled: <Icons.Cancelled />,
  };

  // Determine the correct icon based on groupValue and listTitle
  const getIcon = () => {
    if (groupValue === "status") {
      return statusIcons[listTitle] || null;
    } else if (groupValue === "priority") {
      return priorityIcons[listTitle] || null;
    }
    return null;
  };

  const renderListTitle = () => {
    if (groupValue === "priority") {
      return (
        priorityList?.find((item) => item.priority === listTitle)?.name || null
      );
    } else {
      return listTitle;
    }
  };

  const countMatchingCards = () => {
    return ticketDetails.filter((ticket) => {
      if (groupValue === "status" && ticket.status === listTitle) {
        return true;
      } else if (groupValue === "priority" && ticket.priority === listTitle) {
        return true;
      } else if (groupValue === "user" && ticket.userObj.name === listTitle) {
        return true;
      }
      return false;
    }).length;
  };

  const cardCount = countMatchingCards();

  return (
    <div className="list-container">
      <div className="list-header">
        <div className="list-header-left">
          <div className="list-icon">{getIcon()}</div>
          <div className="list-title">{renderListTitle()}</div>
          <div className="list-sum">{cardCount}</div>
        </div>
        <div className="list-header-right">
          <div className="list-add-item">
            <Icons.Add />
          </div>
          <div className="list-option-item">
            <Icons.ThreeDotMenu />
          </div>
        </div>
      </div>

      <div className="list-card-items">
        {ticketDetails.map((ticket, i) => {
          let matchFound = false;

          // Check if ticket matches group criteria
          if (groupValue === "status" && ticket.status === listTitle) {
            matchFound = true;
          } else if (
            groupValue === "priority" &&
            ticket.priority === listTitle
          ) {
            matchFound = true;
          } else if (
            groupValue === "user" &&
            ticket.userObj.name === listTitle
          ) {
            matchFound = true;
          }

          if (matchFound) {
            return <Card key={i} cardDetails={ticket} />;
          }
          return null;
        })}
      </div>
    </div>
  );
}
