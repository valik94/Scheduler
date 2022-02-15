import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  
    /*EDIT student:String
interviewer:Number
interviewers:Array
onSave:Function
onCancel:Function */
  
  
    /*CREATE interviewers:Array
onSave:Function
onCancel:Function */
  

  const [name, setName] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState((props.interviewer && props.interviewer.id) || null);
  const [error, setError] = useState("");

  
  const reset = () => {
    setName("");
    setError("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };


  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if(!interviewer){
      setError("Interviewer must be selected")
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name={props.student}
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          value={interviewer}
          interviewers={props.interviewers}
          onChange={setInterviewer}
          onSubmit={(event) => event.preventDefault()}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
