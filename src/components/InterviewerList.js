import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const { interviewers } = props;
  const parsedInterviewer = interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected = {interviewer.id === props.interviewer}
        setInterviewer = {() => props.setInterviewer(interviewer.id)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewer}</ul>
    </section>
  );
}

{/* Potentially is missing something because when interviewer is clicked some props.onChange TypeError is found. Not sure why*/}

// import React from "react";
// import "components/InterviewerList.scss";
// import InterviewerListItem from "components/InterviewerListItem";

// export default function InterviewerList(props) {
//   const { interviewers } = props;
//   const parsedInterviewer = interviewers.map((interviewer) => {
//     return (
//       <InterviewerListItem
//         key={interviewer.id}
//         name={interviewer.name}
//         avatar={interviewer.avatar}
//         selected={interviewer.id === props.value}
//         setInterviewer={() => props.onChange(interviewer.id)}
//       />
//     );
//   });

//   return (
//     <section className="interviewers">
//       <h4 className="interviewers__header text--light">Interviewer</h4>
//       <ul className="interviewers__list">{parsedInterviewer}</ul>
//     </section>
//   );
// }