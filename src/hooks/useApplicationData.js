import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  //booking interview function takes in day, id and interview, requests api and updates spots data
  function bookInterview(day, id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        const newState = spotsUpdater({ ...state, appointments }); //pass in stateObject where the appointments is overwritten by new appointments inside the state object
        setState(newState); //update the state with newState
      });
  }
  //logic for canceling interview
  function cancelInterview(day, id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      const newState = spotsUpdater({ ...state, appointments }); //pass in stateObject where the appointments is overwritten by new appointments inside the state object
      setState(newState); //update the state with newState
    });
  }

  function spotsUpdater(stateObject) {
    //1. pass in stateObject where the appointments is overwritten by new appointments inside the state object
    const objectOfAppointmentsIndex = stateObject.days.findIndex((element) => element.name === stateObject.day); //2. find the index of stateObject passed in inside of days key and match it with the stateObject.day is the selection by the user. The return is the index that matches that day of stateObject.
    const objectOfAppointments = stateObject.days[objectOfAppointmentsIndex]; //3. Using that index found in step 2 we find the object of appointments for that particular day
    const daysAppointments = objectOfAppointments.appointments; //4. access the objectAppointments.appointments key to get back object of days of appointments
    let spotCounts = 0; 
    //5. then initialize counter
    daysAppointments.forEach((appointmentID) => { //6. loop through the object of appointments of that day
      if (stateObject.appointments[appointmentID]) { //7. check if each element (id) exists within the appointment
        //each element is an id
        if (stateObject.appointments[appointmentID].interview === null) {  //8. second check if the object of appointments of that day at the id matched within the interview has a value of null, if so increase spotCount, else continue.
          spotCounts += 1; 
        }
      }
    }); //return for every element in the appointments
    stateObject.days[objectOfAppointmentsIndex].spots = spotCounts;   //9. update the internal stateObject of appointments of that day's spots.
    return stateObject;  //10. return the new stateObject
  }


  //useEffect to reach outside for api requests on days, appointments and interviews from database
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((all) => {
        //update state using newly fetched objects from database
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((error) => {});
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
