// import axios from "axios";
import InterviewerList from "components/InterviewerList";
import react from "react";

// 1. We need to start by finding the object in our state.days array who's name matches the provided day. With this information we can now access that specific days appointment array.

// 2. Once we have access to the appointment array for the given day, we'll need to iterate through it, comparing where it's id matches the id of states.appointments and return that value.

// 3. We should also probably do a bit of validation. If there are no appointments on the given day, our days data will be empty. According to our tests, in a case like this, we should return an empty array.

export function selectUserByName(state, name) { //takes in state and day and return an updated state
  //console.log(state.days)
    const filteredNames = state.users.filter(user => user.name === name);
    return filteredNames;
  }
//gets appointments for a given day, returns appointments found for that day
  export function getAppointmentsForDay(state, day) {
    //console.log(state.days)
    //console.log(`day is:`, day)
    //console.log(`state is: `,state)

    const findDay = state.days.find(value => value.name === day )
    //console.log(`findDay is: `,findDay) //returns the whole findDay object of that day that matches the condition inside find()
    if (!findDay){
      return []
    }
    const mapAppointments = findDay.appointments.map(appointment => state.appointments[appointment])
    //console.log(`mapAppointments is:`,mapAppointments)
    return mapAppointments;
    //... returns an array of appointments for that day
  }

  //should return an object with interviewer data or returns null if no interview is booked
  export function getInterview(state, interview){ //NOT SURE DEBUG
    console.log("STATE PASSED: ", state)
    console.log("interview passed: ", interview)
    console.log(null===null)
    console.log(null===null)
    console.log(typeof(interview))
    console.log(!interview)
    //let interviewObject = state

    if (!interview){
      return null;
    }
    console.log(interview)
    const interviewerId = interview.interviewer
    const interviewer = state.interviewers[interviewerId]
    return {  
      student: interview.student,
      interviewer: interviewer
    }
  }

  /*student interview passed:  
{student: 'Archie Cohen', interviewer: 5}
interviewer: 5
student: "Archie Cohen"*/

/* State has object 
{ interviewers: {
  1: { 
  id: 1, name: 'Bob smith', avatar: 'http....'
  },
  2: {
    id: 2, name: "John Doe", avatar: 'http...'
    }
  } 
} */

/* */

  
  