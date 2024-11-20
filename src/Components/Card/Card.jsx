import Icons from "../Icons";
import "./Card.css";

export default function Card(props) {
  const priorityIcons = {
    0: <Icons.NoPriority />,
    1: <Icons.LowPriority />,
    2: <Icons.MediumPriority />,
    3: <Icons.HighPriority />,
    4: <Icons.UrgentPriority />,
  };

  return (
    <>
      <div className="card-container">
        <div className="card-id-wrapper">
          <div className="card-id">{props.cardDetails.id}</div>
          <div className="card-profile">
            <div className="card-profile-initial">
              {props.cardDetails.userObj.name[0]}
              {props.cardDetails.userObj.name[1]}
            </div>
            <div
              className={
                props.cardDetails.userObj.available
                  ? "card-profile-initial-available card-profile-initial-available-true"
                  : "card-profile-initial-available"
              }
            ></div>
          </div>
        </div>
        <div className="card-title">{props.cardDetails.title}</div>
        <div className="card-tag">
          <div className="card-tag-icon">
            {priorityIcons[props.cardDetails.priority]}
          </div>

          {props.cardDetails.tag.map((tag, i) => (
            <div key={i} className="card-tag-box">
              <div className="card-tag-title">{tag}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
