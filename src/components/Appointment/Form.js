import React, {useState} from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form(props) {
    console.log(props)
    {/*EDIT student:String
interviewer:Number
interviewers:Array
onSave:Function
onCancel:Function */}
{/*CREATE interviewers:Array
onSave:Function
onCancel:Function */}

// const [student, setStudent] = useState(props.student || ""); 
const [name, setName] = useState(props.student || "");
const [interviewer, setInterviewer] = useState(props.interviewer || null);

    //NOTE: leave onSave function for now as it involves API interfacing -> NEXT WEEK
    const reset = () =>{
        setName("");
        setInterviewer(null);
    }

    const cancel = () =>{
        reset();
        props.onCancel();
    };

  return (<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name={props.student}
        type="text"
        placeholder="Enter Student Name"
        value={name}
        onChange ={(event) => setName(event.target.value)}
      />
    </form>
    <InterviewerList 
      value={interviewer}
      interviewers={props.interviewers}
      onChange = {setInterviewer}
      onSubmit={event => event.preventDefault()}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={() => cancel()}>Cancel</Button>
      <Button confirm onClick={props.onSave}>Save</Button>
    </section>
  </section>
</main>)
}


