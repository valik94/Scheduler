import { useState, useEffect } from "react";
import axios from "axios";
// import { indexOf } from "lodash";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {},
  });

//spots remaining feature
  const updateSpots = (day, increment) => { 
    const copyArr= [...state.days]
    const findDay = state.days.find((value) => value.name === day);
    const selectedDayIndex = copyArr.indexOf(findDay)
    copyArr[selectedDayIndex].spots += increment
    // 4, 5, 6
    setState((prev) =>({...prev, ...state.days}))
    // days = [mon, tues, wed...]
    
  }


  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  function bookInterview(day, id, interview) {
    console.log(`ID AND INTERVIEW IS HERE:`, id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    console.log(`2222`, state)
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => setState({ ...state, appointments }))
      .then((result) => updateSpots(day, -1))//counter to update spots +1
    // .catch(error => )
  }

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
    // setState({...state, appointments })

    return axios
      .delete(`/api/appointments/${id}`)
      .then((response) => setState({ ...state, appointments }))
      .then((result) => updateSpots(day, 1)) //counter to update spots -1
  }

  useEffect(() => {

    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const [first, second, third] = all;
      //console.log(first.data, second.data, third.data);
      console.log(`this is for ALL`,all)   
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
      
      //console.log("SECOND IS:", second.data);
      console.log({days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data} )
    }).catch(error => {
      console.log(error)
    });
  }, [])
  console.log("days: ", state.days.spots)

  return { state, setDay, bookInterview, cancelInterview };
}
