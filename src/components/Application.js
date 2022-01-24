import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from "axios";
import { getInterview, getAppointmentsForDay } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: [],
    interviewers: {},
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  

  const setDay = (day) => setState((prev) => ({ ...prev, day }));
  //const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    // const testDaysURL = `/api/days`;
    // axios.get(testDaysURL).then((response) => {
    //setDays(response.data); //setDays is an array

    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const [first, second, third] = all;
      //console.log(first.data, second.data, third.data);

      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
      console.log("SECOND IS:", second.data);

    });
  }, []);

  const schedule = dailyAppointments.map((appointment) =>{
    const interview = getInterview(state, appointment.interview);
 
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => (
          <Appointment key={appointment.id} {...appointment} />
        ))}
        <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={interview} />
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
})
}
