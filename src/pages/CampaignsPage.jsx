import { useMemo, useState } from "react";
import Calendar from "react-calendar";
import { festivities } from "../data/festivities";

import "react-calendar/dist/Calendar.css";
import "../styles/campaigns.css";

export default function CampaignsPage() {
  const today = new Date();

  const upcomingFestivities = festivities
    .map((f) => {
      const eventDate = new Date(f.date);
      const diffTime = eventDate - today;

      return {
        ...f,
        daysLeft: Math.ceil(diffTime / (1000 * 60 * 60 * 24)),
      };
    })
    .filter((f) => f.daysLeft >= 0)
    .sort((a, b) => a.daysLeft - b.daysLeft);

  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const nextEvent = useMemo(() => {
    return upcomingFestivities[0];
  }, [upcomingFestivities]);

  const isTodayEvent = nextEvent?.daysLeft === 0;

  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--serif)",
          fontSize: 36,
          fontWeight: 300,
          marginBottom: 32,
        }}
      >
        Campañas y Festividades
      </h2>

      {/* Card principal */}
      <div className="campaign-highlight">
        <div>
          <p className="campaign-label">
            {isTodayEvent
              ? "Celebración de hoy"
              : "Próxima festividad importante"}
          </p>

          <h3>
            {isTodayEvent ? `Hoy es ${nextEvent?.title}` : nextEvent?.title}
          </h3>

          <p className="campaign-date">{nextEvent?.date}</p>

          <p className="campaign-recommendation">{nextEvent?.campaign}</p>
        </div>

        <div className="campaign-countdown">
          <span>{isTodayEvent ? "🎉" : nextEvent?.daysLeft}</span>

          <p>{isTodayEvent ? "Se celebra hoy" : "días restantes"}</p>
        </div>
      </div>

      {/* Calendario */}
      <div className="campaign-calendar-card">
        <Calendar
          onChange={setDate}
          value={date}
          tileClassName={({ date, view }) => {
            if (view === "month") {
              const formattedDate = date.toISOString().split("T")[0];

              const hasEvent = festivities.some(
                (event) => event.date === formattedDate,
              );

              return hasEvent ? "highlight-day" : null;
              
            }
          }}
          onClickDay={(value) => {
            const formattedDate = value.toISOString().split("T")[0];

            const event = festivities.find((e) => e.date === formattedDate);

            if (event) {
              setSelectedEvent(event);
            }
          }}
        />
        {selectedEvent && (
  <div
    className="campaign-modal-overlay"
    onClick={() => setSelectedEvent(null)}
  >
    <div
      className="campaign-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="campaign-modal-label">
        Festividad destacada
      </p>

      <h2>{selectedEvent.title}</h2>

      <p className="campaign-modal-date">
        {selectedEvent.date}
      </p>

      <p className="campaign-modal-text">
        {selectedEvent.campaign}
      </p>

      <button
        className="campaign-modal-btn"
        onClick={() => setSelectedEvent(null)}
      >
        Cerrar
      </button>
    </div>
  </div>
)}
      </div>

      

      <div className="campaigns-upcoming">
        {upcomingFestivities.slice(0, 4).map((event) => (
          <div key={event.id} className="campaign-card">
            <p className="campaign-type">{event.type}</p>

            <h3>{event.title}</h3>

            <p className="campaign-days">Faltan {event.daysLeft} días</p>

            <p className="campaign-desc">{event.campaign}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
