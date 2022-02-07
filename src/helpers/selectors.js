
//gets appointments for a given day, returns appointments found for that day
function getAppointmentsForDay(state, day) {

  const findDay = state.days.find((value) => value.name === day);
  if (!findDay) {
    return [];
  }
  const mapAppointments = findDay.appointments.map(
    (appointment) => state.appointments[appointment]
  );
  return mapAppointments;
  //... returns an array of appointments for that day
}


function getInterviewersForDay(state, day) {
  const filterDay = state.days.filter((value) => value.name === day)[0];

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
  const interviewerId = interview.interviewer;
  const interviewer = state.interviewers[interviewerId];
  return {
    student: interview.student,
    interviewer: interviewer,
  };
}

export { getAppointmentsForDay, getInterviewersForDay, getInterview };

