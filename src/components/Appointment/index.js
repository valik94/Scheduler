import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const {
    id,
    time,
    interview,
    interviewers,
    bookInterview,
    cancelInterview,
    day,
  } = props;
  console.log(`INTERVIEWWWW IN APPOINTMENT`, interview);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    //Saving interview workflow logic
    transition(SAVING);
    bookInterview(day, id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }
  //deleting appointment based on interview id
  function deleteAppointment() {
    console.log("Delete Appointment ID IS:", id);
    transition(DELETING, true);
    cancelInterview(day, id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          bookInterview={bookInterview}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === EDIT && (
        <Form
          student={interview.student}
          interviewer={interview.interviewer}
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving, please wait" />}
      {mode === DELETING && <Status message="Deleting, please wait" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete?"
          onCancel={() => back()}
          onConfirm={() => deleteAppointment()}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error onClose={() => back()} message="Saving Error Occured" />
      )}
      {mode === ERROR_DELETE && (
        <Error
          // message="Are you sure you want to delete?"
          // onCancel={() => back()}
          // onConfirm={() => deleteAppointment()}
          onClose={() => back()}
          message="Deleting Error Occured"
        />
      )}
    </article>
  );
}
