import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  let interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
//   let interviewerImg = classNames("interviewers__item-image", {
//     "interviewers__item--selected-image": props.selected,
//   });
return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}

// import React from "react";
// import classNames from "classnames";
// import "components/InterviewerListItem.scss";

// export default function InterviewerListItem(props) {
//   {
//     /*link with classes*/
//   }

//   let interviewClass = classNames("interviewers__item", {
//     "interviewers__item--selected": props.selected,
//   });
//   let interviewerImg = classNames("interviewers__item-image", {
//     "interviewers__item--selected-image": props.selected,
//   });

//   {
//     /*Add an event handler; Render the interviewer's name*/
//   }
//   return (
//     <li
//       onClick={props.setInterviewer}
//       className={interviewClass}
//     >
//       <img className={interviewerImg} src={props.avatar} alt={props.name} />
//       {props.selected && props.name}
//     </li>
//   );
// }