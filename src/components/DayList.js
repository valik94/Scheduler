import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) { //3 props: 1. Array of days 2. name of currently selected day 3. function used to set current day (setDay)
  const { days } = props;
  const parsedDay = days.map((day) => { //creates an array of DayListItems
      return(
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
    />
      )
  });
  return <ul>{parsedDay}</ul>;
}

// import React from "react";
// import DayListItem from "components/DayListItem";

// {/*create the list of <DayListItem> components */}
// export default function DayList(props) {
//   const { days } = props;
//   const parsedDay = days.map((day) => (
//     <DayListItem
//       key={day.id}
//       name={day.name}
//       spots={day.spots}
//       selected={day.name === props.value}
//       setDay={props.onChange}
//     />
//   ));
//   return <ul>{parsedDay}</ul>;
// }