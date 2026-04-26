"use client";

import { useState, useEffect } from "react";
import {
  X, ChevronLeft, ChevronRight,
  BookOpen, GraduationCap, TreePine, Briefcase, CalendarDays,
} from "lucide-react";

/* ── Types ───────────────────────────────────────────────────────────── */

type EventType = "exam" | "academic" | "holiday" | "placement";

interface CalEvent {
  date:     string;   // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD (range end, inclusive)
  label:    string;
  type:     EventType;
  detail?:  string;
}

const TYPE_CFG: Record<EventType, { color: string; bg: string; border: string; dot: string; label: string; Icon: React.ElementType }> = {
  exam:      { color: "#dc2626", bg: "#fef2f2", border: "#fecaca", dot: "#ef4444", label: "Examination", Icon: BookOpen      },
  academic:  { color: "#007B8A", bg: "#e6f7f9", border: "#a5d8df", dot: "#007B8A", label: "Academic",    Icon: GraduationCap },
  holiday:   { color: "#b45309", bg: "#fffbeb", border: "#fde68a", dot: "#f59e0b", label: "Holiday",     Icon: TreePine      },
  placement: { color: "#4f46e5", bg: "#eef2ff", border: "#c7d2fe", dot: "#6366f1", label: "Placement",   Icon: Briefcase     },
};

const MONTHS = ["January","February","March","April","May","June",
                "July","August","September","October","November","December"];
const DAYS_SHORT = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

/* ── Academic events 2025–26 ─────────────────────────────────────────── */

const EVENTS: CalEvent[] = [
  /* ── July 2025 ── */
  { date: "2025-07-01", label: "Odd Semester Classes Begin",          type: "academic",  detail: "Sem I, III, V & VII commence. New batch induction." },
  { date: "2025-07-07", endDate: "2025-07-08", label: "Freshers' Orientation Programme", type: "academic", detail: "Mandatory for newly admitted students." },
  { date: "2025-07-16", label: "Eid al-Adha",                        type: "holiday"                     },
  /* ── August 2025 ── */
  { date: "2025-08-15", label: "Independence Day",                    type: "holiday",   detail: "National holiday — college closed." },
  { date: "2025-08-25", label: "Enrollment & Smart Card Deadline",    type: "academic",  detail: "Final date to submit enrollment form for Sem I/III/V/VII." },
  /* ── September 2025 ── */
  { date: "2025-09-15", endDate: "2025-09-22", label: "Mid-Term Examinations (Odd Sem)", type: "exam", detail: "Internal assessment — marks reported to HOD by 30 Sep." },
  /* ── October 2025 ── */
  { date: "2025-10-02", label: "Gandhi Jayanti",                      type: "holiday",   detail: "National holiday." },
  { date: "2025-10-02", endDate: "2025-10-20", label: "Exam Form Submission — Nov 2025", type: "academic", detail: "Submit online on BU portal. Late fee applicable after 15 Oct." },
  { date: "2025-10-02", endDate: "2025-10-03", label: "Dussehra Holiday",               type: "holiday"              },
  { date: "2025-10-20", endDate: "2025-10-24", label: "Diwali Vacation",                type: "holiday",   detail: "College closed." },
  /* ── November 2025 ── */
  { date: "2025-11-10", endDate: "2025-11-30", label: "End-Sem Examinations (Odd Sem)", type: "exam",      detail: "University examinations for Sem I / III / V / VII." },
  /* ── December 2025 ── */
  { date: "2025-12-01", endDate: "2025-12-31", label: "Winter Break",                  type: "holiday",   detail: "College closed — winter recess." },
  { date: "2025-12-25", label: "Christmas",                           type: "holiday"                     },
  /* ── January 2026 ── */
  { date: "2026-01-02", label: "Even Semester Classes Begin",         type: "academic",  detail: "Sem II, IV, VI & VIII commence." },
  { date: "2026-01-06", endDate: "2026-01-31", label: "Enrollment & Fee Payment (Even Sem)", type: "academic", detail: "Submit enrollment form; pay fees before 31 Jan to avoid fine." },
  { date: "2026-01-26", label: "Republic Day",                        type: "holiday",   detail: "National holiday — flag hoisting at campus 8:00 AM." },
  /* ── February 2026 ── */
  { date: "2026-02-16", endDate: "2026-02-22", label: "Mid-Term Examinations (Even Sem)", type: "exam", detail: "Internal assessment for Sem II / IV / VI / VIII." },
  { date: "2026-02-19", label: "Campus Recruitment — Microsoft & Google", type: "placement", detail: "Eligible: B.E. / MCA final year, CGPA ≥ 7.0, no active backlog." },
  /* ── March 2026 ── */
  { date: "2026-03-01", label: "Results Declared — Nov 2025 Exams",   type: "academic",  detail: "End-semester results published on BU portal." },
  { date: "2026-03-10", endDate: "2026-03-20", label: "Reval / Retotal Application (Nov 2025)", type: "academic", detail: "Apply online within 20 days of result declaration." },
  { date: "2026-03-15", label: "Campus Recruitment — TCS",            type: "placement", detail: "Register on placement portal by 12 Mar. Off-campus eligible." },
  { date: "2026-03-25", endDate: "2026-03-26", label: "Holi Holiday", type: "holiday"  },
  /* ── April 2026 ── */
  { date: "2026-04-01", endDate: "2026-04-30", label: "Even Sem Exam Form Submission", type: "academic", detail: "Apply online on BU portal. Late fee applicable after 20 Apr." },
  { date: "2026-04-05", label: "Campus Recruitment — Infosys",        type: "placement", detail: "CGPA ≥ 6.5, no active backlog required." },
  { date: "2026-04-14", label: "Dr. Ambedkar Jayanti",                type: "holiday"                     },
  { date: "2026-04-21", label: "Ram Navami",                          type: "holiday"                     },
  { date: "2026-04-30", label: "Even Sem Exam Form Last Date",        type: "academic",  detail: "Hard deadline — no extensions." },
  /* ── May 2026 ── */
  { date: "2026-05-01", label: "May Day",                             type: "holiday"                     },
  { date: "2026-05-04", endDate: "2026-05-30", label: "End-Sem Examinations (Even Sem)", type: "exam", detail: "University examinations for Sem II / IV / VI / VIII." },
  { date: "2026-05-08", label: "Reval / Retotal Last Date (Nov 2025)", type: "academic", detail: "Last date to apply for revaluation of Nov 2025 exams." },
  /* ── June 2026 ── */
  { date: "2026-06-01", endDate: "2026-06-30", label: "Summer Break", type: "holiday",   detail: "Academic session 2025–26 concludes." },
  { date: "2026-06-15", label: "Results Expected — Even Sem 2026",    type: "academic",  detail: "Tentative; subject to BU schedule." },
];

/* ── Helpers ─────────────────────────────────────────────────────────── */

const TODAY_YEAR  = 2026;
const TODAY_MONTH = 3;   // 0-indexed → April
const TODAY_DATE  = 26;

function pad(n: number) { return String(n).padStart(2, "0"); }

function dateStr(y: number, m: number, d: number) {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}

function getEventsForDay(y: number, m: number, d: number): CalEvent[] {
  const target = dateStr(y, m, d);
  return EVENTS.filter((ev) => {
    const end = ev.endDate ?? ev.date;
    return ev.date <= target && end >= target;
  });
}

function formatDateRange(ev: CalEvent): string {
  const fmt = (s: string) => {
    const [, mm, dd] = s.split("-").map(Number);
    return `${dd} ${MONTHS[mm - 1].slice(0, 3)}`;
  };
  if (ev.endDate && ev.endDate !== ev.date) return `${fmt(ev.date)} – ${fmt(ev.endDate)}`;
  const [y, mm, dd] = ev.date.split("-").map(Number);
  return `${dd} ${MONTHS[mm - 1].slice(0, 3)} ${y}`;
}

/* ── Component ───────────────────────────────────────────────────────── */

interface Props { onClose: () => void; }

export default function AcademicCalendarModal({ onClose }: Props) {
  const [year,        setYear]        = useState(TODAY_YEAR);
  const [month,       setMonth]       = useState(TODAY_MONTH);
  const [selectedDay, setSelectedDay] = useState<number | null>(TODAY_DATE);

  /* scroll lock + ESC */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [onClose]);

  /* navigation bounds: Jul 2025 → Jun 2026 */
  const canPrev = !(year === 2025 && month === 6);
  const canNext = !(year === 2026 && month === 5);

  function prevMonth() {
    if (!canPrev) return;
    setSelectedDay(null);
    if (month === 0) { setYear((y) => y - 1); setMonth(11); } else setMonth((m) => m - 1);
  }
  function nextMonth() {
    if (!canNext) return;
    setSelectedDay(null);
    if (month === 11) { setYear((y) => y + 1); setMonth(0); } else setMonth((m) => m + 1);
  }

  /* build grid cells */
  const firstDow    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array<null>(firstDow).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  /* right-panel events */
  const panelEvents: CalEvent[] = (() => {
    if (selectedDay !== null) return getEventsForDay(year, month, selectedDay);
    const seen = new Set<string>();
    const out: CalEvent[] = [];
    for (let d = 1; d <= daysInMonth; d++) {
      getEventsForDay(year, month, d).forEach((ev) => {
        const key = ev.date + ev.label;
        if (!seen.has(key)) { seen.add(key); out.push(ev); }
      });
    }
    return out.sort((a, b) => a.date.localeCompare(b.date));
  })();

  const isToday = (d: number) =>
    d === TODAY_DATE && month === TODAY_MONTH && year === TODAY_YEAR;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        backgroundColor: "rgba(0,0,0,0.55)",
        zIndex: 9200,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(900px, 96vw)",
          maxHeight: "92vh",
          backgroundColor: "#ffffff",
          borderRadius: 14,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 28px 90px rgba(0,0,0,0.3)",
        }}
      >

        {/* ── Header ─────────────────────────────────────────────── */}
        <div style={{
          backgroundColor: "#007B8A",
          padding: "0 20px",
          height: 54,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <CalendarDays size={17} color="rgba(255,255,255,0.9)" />
            <span style={{ color: "#ffffff", fontSize: "0.9375rem", fontWeight: 700 }}>
              Academic Calendar
            </span>
            <span style={{
              fontSize: "0.7rem", fontWeight: 600, padding: "2px 10px",
              backgroundColor: "rgba(255,255,255,0.18)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 20, color: "rgba(255,255,255,0.9)",
            }}>
              Session 2025–26 · Barkatullah Vishwavidyalaya
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 6, width: 30, height: 30,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#ffffff",
            }}
          >
            <X size={14} />
          </button>
        </div>

        {/* ── Body ───────────────────────────────────────────────── */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>

          {/* ── Left: Calendar grid ─────────────────────────────── */}
          <div style={{ flex: "0 0 56%", padding: "20px 24px", borderRight: "1px solid #f0f0f0", overflowY: "auto" }}>

            {/* Month navigator */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <button onClick={prevMonth} disabled={!canPrev} style={navBtnStyle(!canPrev)}>
                <ChevronLeft size={16} />
              </button>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.1875rem", fontWeight: 700, color: "#1a1a2e", lineHeight: 1.2 }}>
                  {MONTHS[month]} {year}
                </div>
                <div style={{ fontSize: "0.72rem", color: "#9ca3af", marginTop: 3, fontWeight: 500 }}>
                  {month >= 6 ? "Odd Semester" : "Even Semester"} · 2025–26
                </div>
              </div>
              <button onClick={nextMonth} disabled={!canNext} style={navBtnStyle(!canNext)}>
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Weekday labels */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 6 }}>
              {DAYS_SHORT.map((d, i) => (
                <div key={d} style={{
                  textAlign: "center",
                  fontSize: "0.68rem", fontWeight: 700,
                  color: i === 0 || i === 6 ? "#d1d5db" : "#9ca3af",
                  padding: "4px 0",
                  letterSpacing: "0.04em",
                }}>
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3 }}>
              {cells.map((cell, idx) => {
                if (cell === null) return <div key={`e-${idx}`} />;

                const events    = getEventsForDay(year, month, cell);
                const isSelected = cell === selectedDay;
                const isTod     = isToday(cell);
                const isWeekend = idx % 7 === 0 || idx % 7 === 6;

                /* pick up to 4 unique event types for dots */
                const dotTypes = [...new Set(events.map((e) => e.type))].slice(0, 4);

                return (
                  <button
                    key={`d-${cell}`}
                    onClick={() => setSelectedDay(cell === selectedDay ? null : cell)}
                    style={{
                      borderRadius: 9,
                      padding: "7px 3px 6px",
                      cursor: "pointer",
                      backgroundColor:
                        isSelected ? "#007B8A"
                        : isTod    ? "#e6f7f9"
                        : "transparent",
                      border:
                        isSelected ? "2px solid #007B8A"
                        : isTod    ? "2px solid #007B8A"
                        : "2px solid transparent",
                      transition: "background 0.12s, border 0.12s",
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                      minHeight: 56,
                    }}
                  >
                    <span style={{
                      fontSize: "0.875rem",
                      fontWeight: isTod || isSelected ? 700 : 400,
                      color:
                        isSelected ? "#ffffff"
                        : isTod    ? "#007B8A"
                        : isWeekend ? "#d1d5db"
                        : "#1a1a2e",
                      lineHeight: 1,
                    }}>
                      {cell}
                    </span>
                    {/* event type dots */}
                    {dotTypes.length > 0 && (
                      <div style={{ display: "flex", gap: 2.5, alignItems: "center" }}>
                        {dotTypes.map((t) => (
                          <span key={t} style={{
                            width: 5, height: 5, borderRadius: "50%",
                            backgroundColor: isSelected
                              ? "rgba(255,255,255,0.7)"
                              : TYPE_CFG[t].dot,
                            flexShrink: 0,
                          }} />
                        ))}
                        {events.length > 4 && (
                          <span style={{
                            fontSize: "0.5rem",
                            color: isSelected ? "rgba(255,255,255,0.6)" : "#9ca3af",
                          }}>+{events.length - 4}</span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Today chip */}
            {month === TODAY_MONTH && year === TODAY_YEAR && (
              <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{
                  width: 8, height: 8, borderRadius: "50%",
                  backgroundColor: "#007B8A", flexShrink: 0,
                }} />
                <span style={{ fontSize: "0.72rem", color: "#6b7280" }}>
                  Today: {TODAY_DATE} {MONTHS[TODAY_MONTH]} {TODAY_YEAR}
                </span>
              </div>
            )}
          </div>

          {/* ── Right: Events panel ──────────────────────────────── */}
          <div style={{ flex: "0 0 44%", display: "flex", flexDirection: "column", overflow: "hidden" }}>

            {/* Panel header */}
            <div style={{
              padding: "16px 20px 14px",
              borderBottom: "1px solid #f0f0f0",
              flexShrink: 0,
              backgroundColor: "#fafafa",
            }}>
              <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {selectedDay !== null
                  ? `${selectedDay} ${MONTHS[month]} ${year}`
                  : `All events · ${MONTHS[month]} ${year}`
                }
              </div>
              <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#374151", marginTop: 4 }}>
                {panelEvents.length === 0
                  ? "No events scheduled"
                  : `${panelEvents.length} event${panelEvents.length > 1 ? "s" : ""}`
                }
              </div>
            </div>

            {/* Event list */}
            <div style={{ flex: 1, overflowY: "auto" }}>
              {panelEvents.length === 0 ? (
                <div style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  justifyContent: "center", height: "100%", gap: 10,
                  color: "#d1d5db", padding: 24,
                }}>
                  <CalendarDays size={32} strokeWidth={1} />
                  <span style={{ fontSize: "0.8125rem", textAlign: "center" }}>No scheduled events for this day.</span>
                </div>
              ) : (
                panelEvents.map((ev, i) => {
                  const cfg  = TYPE_CFG[ev.type];
                  const Icon = cfg.Icon;
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex", gap: 12,
                        padding: "12px 20px",
                        borderBottom: i < panelEvents.length - 1 ? "1px solid #f5f5f5" : "none",
                        backgroundColor: i % 2 === 0 ? "#ffffff" : "#fafafa",
                      }}
                    >
                      <div style={{
                        width: 32, height: 32, borderRadius: 8, flexShrink: 0, marginTop: 1,
                        backgroundColor: cfg.bg, border: `1px solid ${cfg.border}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Icon size={13} color={cfg.color} strokeWidth={2.25} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#1a1a2e", lineHeight: 1.3 }}>
                          {ev.label}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                          <span style={{
                            fontSize: "0.68rem", fontWeight: 700, padding: "1px 7px", borderRadius: 20,
                            backgroundColor: cfg.bg, border: `1px solid ${cfg.border}`,
                            color: cfg.color, whiteSpace: "nowrap",
                          }}>
                            {cfg.label}
                          </span>
                          <span style={{ fontSize: "0.72rem", color: "#9ca3af" }}>
                            {formatDateRange(ev)}
                          </span>
                        </div>
                        {ev.detail && (
                          <div style={{ fontSize: "0.72rem", color: "#6b7280", marginTop: 4, lineHeight: 1.5 }}>
                            {ev.detail}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* ── Footer: legend + close ─────────────────────────────── */}
        <div style={{
          borderTop: "1px solid #e0e0e0",
          padding: "10px 24px",
          display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
          backgroundColor: "#f9fafa",
          flexShrink: 0,
        }}>
          <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.07em" }}>
            Legend
          </span>
          {(Object.entries(TYPE_CFG) as [EventType, typeof TYPE_CFG[EventType]][]).map(([key, cfg]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: cfg.dot, display: "inline-block", flexShrink: 0 }} />
              <span style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: 500 }}>{cfg.label}</span>
            </div>
          ))}
          <button
            onClick={onClose}
            style={{
              marginLeft: "auto",
              fontSize: "0.8rem", color: "#007B8A", fontWeight: 600,
              background: "none", border: "1.5px solid #007B8A",
              borderRadius: 7, padding: "5px 18px", cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Styles ──────────────────────────────────────────────────────────── */

function navBtnStyle(disabled: boolean): React.CSSProperties {
  return {
    background: disabled ? "#f9fafb" : "#f3f4f6",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    width: 34, height: 34,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: disabled ? "not-allowed" : "pointer",
    color: disabled ? "#d1d5db" : "#374151",
    flexShrink: 0,
  };
}
