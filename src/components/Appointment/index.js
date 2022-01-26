import React from 'react';
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE="CREATE";


export default function Appointment(props) {
  const {id, time, interview, interviewers, bookInterview, cancelInterview } = props;

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    bookInterview(id, interview)
    transition(EMPTY, SHOW) //NOT SURE HOW TO TRANSITION TO SHOW MODE PROPERLY
  }

  const {mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY)

  return <article className="appointment">
    <Header time={time} /> 
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
  {mode === SHOW && (
  <Show
    student={interview.student}
    interviewer={interview.interviewer}
    bookInterview={bookInterview}
  />
)}
{mode === CREATE && (
  <Form
    interviewers={interviewers}
    onCancel={()=> back()}
    onSave ={() => save()}
  />
)}
</article>;
}


