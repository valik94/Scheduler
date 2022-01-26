// import axios from "axios";
import InterviewerList from "components/InterviewerList";
import react, {useState, useEffect} from "react";
import axios from "axios";


//gets appointments for a given day, returns appointments found for that day
function getAppointmentsForDay(state, day) {
  //console.log(state.days)
  //console.log(`day is:`, day)
  //console.log(`state is: `,state)

  const findDay = state.days.find((value) => value.name === day);
  //console.log(`findDay is: `,findDay) //returns the whole findDay object of that day that matches the condition inside find()
  if (!findDay) {
    return [];
  }
  const mapAppointments = findDay.appointments.map(
    (appointment) => state.appointments[appointment]
  );
  //console.log(`mapAppointments is:`,mapAppointments)
  return mapAppointments;
  //... returns an array of appointments for that day
}

function getInterviewersForDay(state, day) {
  console.log("STATE.DAYS IS:", state.days);
  console.log(`day is:`, day);
  //console.log(`state is: `,state)

  const filterDay = state.days.filter((value) => value.name === day)[0];
  console.log(`filterDAY IS`,filterDay)
  //console.log(`findDay is: `,findDay) //returns the whole findDay object of that day that matches the condition inside find()
  if (!filterDay) {
    return [];
  }
  let result = [];
  if (filterDay.appointments.length > 0) {
    for (let id of filterDay.interviewers) {
      result.push(state.interviewers[id]);
    }
    return result;
  }
  //... returns an array of interviewers for that day
}

//should return an object with interviewer data or returns null if no interview is booked
function getInterview(state, interview) {

  if (!interview) {
    return null;
  }
  console.log(interview);
  const interviewerId = interview.interviewer;
  const interviewer = state.interviewers[interviewerId];
  return {
    student: interview.student,
    interviewer: interviewer,
  };
}

export { getAppointmentsForDay, getInterviewersForDay, getInterview };

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
