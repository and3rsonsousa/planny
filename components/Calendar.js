import dayjs from "dayjs";
import { useApp } from "../utility/AppContext";
import Flyover from "../components/Flyover";
import { useEffect } from "react";

const Calendar = ({
  thisMonth,
  nextMonth,
  prevMonth,
  legenda,
  showActions,
}) => {
  const App = useApp();
  const { Actions, posts } = App;

  let startOfCalendar = thisMonth.startOf("month").startOf("week");
  let endOfCalendar = thisMonth.endOf("month").endOf("week");
  let weeksInCalendar = endOfCalendar.diff(startOfCalendar, "weeks") + 1;

  let weeks = [];
  let daysToCount = 0;

  for (let a = 0; a < weeksInCalendar; a++) {
    weeks[a] = [];
    for (let i = 0; i < 7; i++) {
      let currentDay = startOfCalendar.add(daysToCount, "day");
      weeks[a][i] = {};
      weeks[a][i].date = currentDay;
      weeks[a][i].posts = posts.filter(
        (item) =>
          dayjs(item.date).format("D/M/YYYY") === currentDay.format("D/M/YYYY")
      );
      daysToCount++;
    }
  }

  return (
    <div className="calendar">
      {/* Legenda de cores */}
      {legenda && (
        <div className="mb-8 flex gap-x-4">
          {Actions.map((i, j) => {
            let bgColor1 = "bg-" + i.slug + "-light";
            let bgColor2 = "bg-" + i.slug + "-dark";

            return (
              <div
                className={`flex items-center py-1 px-2 rounded-full ${bgColor1}`}
                key={j}
              >
                <div className={`h-2 w-2 rounded-full mr-2 ${bgColor2}`}></div>
                <div className="text-xx font-semibold uppercase tracking-wider">
                  {i.name}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* Controles dos Meses */}
      <div className="calendar-grid">
        <div className="col-span-7 flex w-full justify-center items-end p-4">
          <div className="calendar-month-button" onClick={prevMonth}>
            {thisMonth.subtract(1, "M").format("MMMM")}
          </div>
          <div className="font-medium text-gray-700 px-4">
            {thisMonth.format("MMMM")}
          </div>
          <div className="calendar-month-button" onClick={nextMonth}>
            {thisMonth.add(1, "M").format("MMMM")}
          </div>
        </div>
        {/* Dias da Semana */}
        {["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"].map((a, b) => (
          <div className="calendar-day calendar-week" key={a}>
            {a}
          </div>
        ))}
        {/* Calendário */}
        {weeks.map((w, a) =>
          w.map((i, j) => (
            <div
              key={(a + 1) * (j + 1)}
              className={`calendar-day${
                i.date.month() != thisMonth.month() ? " out-of-month" : ""
              }`}
            >
              <div className="calendar-day-date">{dayjs(i.date).date()}</div>
              <div className="calendar-day-content">
                {i.posts.map((item, z) => (
                  <Col item={item} key={z} showActions={showActions} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const Col = (props) => {
  const { id, title, description, action, client, done } = props.item;
  const { showActions } = props;
  const { deletePost, updatePost, useLoading } = useApp();
  const [loading, setLoading] = useLoading;
  const classNames = (action) => {
    switch (action) {
      case 1:
        return "calendar-day-col flyover-parent prose bg-postagem-dark";
      case 2:
        return "calendar-day-col flyover-parent prose bg-stories-dark";
      case 3:
        return "calendar-day-col flyover-parent prose bg-evento-dark";
      case 4:
        return "calendar-day-col flyover-parent prose bg-meeting-dark";
      default:
        return "calendar-day-col flyover-parent prose bg-postagem-dark";
    }
  };

  const doneAction = () => {
    setLoading(true);
    const updatedPost = { ...props.item, done: !props.item.done };
    updatePost(updatedPost);
  };

  return client ? (
    <div
      className={
        showActions
          ? classNames(action)
          : "calendar-day-col flyover-parent prose"
      }
      style={
        showActions
          ? done
            ? { opacity: 0.2 }
            : {}
          : {
              backgroundColor: client.bgColor,
              color: client.fgColor,
              opacity: done ? 0.2 : 1,
            }
      }
    >
      <div className={`hidden lg:block text-xs font-medium leading-4 truncate`}>
        {title}
      </div>

      <Flyover
        item={props.item}
        deleteAction={deletePost}
        updateAction={updatePost}
        doneAction={doneAction}
      />
    </div>
  ) : (
    ""
  );
};

export default Calendar;
