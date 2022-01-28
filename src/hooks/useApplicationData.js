import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {},
  });

  //spots remaining feature by finding day, the state array at that day index and updating the spots for that day
  const updateSpots = (day, increment) => {
    const copyArr = [...state.days];
    const findDay = state.days.find((value) => value.name === day);
    const selectedDayIndex = copyArr.indexOf(findDay);
    copyArr[selectedDayIndex].spots += increment;
    setState((prev) => ({ ...prev, ...copyArr }));
  };

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
    console.log(`2222`, state);
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => setState({ ...state, appointments }))
      .then((result) => updateSpots(day, -1)); //counter to update spots +1/-1
  }
  //logic for canceling interview
  function cancelInterview(day, id) {
    console.log(`CANCELInterview got passed ID: `, id);
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`/api/appointments/${id}`)
      .then((response) => setState({ ...state, appointments }))
      .then((result) => updateSpots(day, 1)); //counter to update spots -1
  }
  //useEffect to reach outside for api requests on days, appointments and interviews from database
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((all) => {
        const [first, second, third] = all;
        
        //update state using newly fetched objects from database
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));

      })
      .catch((error) => {
      });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
