import { allTags, allTeams, emptyProjectFilter } from "../data";
import { IconSearch, IconClose } from "./Icons";

const sortOptions = [
  { key: "name", label: "Project Name" },
  { key: "created", label: "Date Created" },
  { key: "team", label: "Created By Team" },
];

// Detailed filter panel — modelled on the reference "Filter example" (Filter by / Sort by columns).
// Filters projects by name, tags, created-by team, and date-created range, plus sorting.
export default function ProjectFilter({ value, onChange, onClose }) {
  const set = (patch) => onChange({ ...value, ...patch });

  const toggleTag = (t) =>
    set({ tags: value.tags.includes(t) ? value.tags.filter((x) => x !== t) : [...value.tags, t] });

  const toggleDir = () => set({ sortDir: value.sortDir === "asc" ? "desc" : "asc" });

  return (
    <div className="pfilter" onMouseDown={(e) => e.stopPropagation()}>
      <div className="pfilter-head">
        <span>
          sorted by:{" "}
          <b>
            {sortOptions.find((s) => s.key === value.sortBy)?.label}{" "}
            {value.sortDir === "asc" ? "↑" : "↓"}
          </b>
        </span>
        <button className="pfilter-x" onClick={onClose} aria-label="Close filter">
          <span style={{ width: 14, height: 14 }}><IconClose /></span>
        </button>
      </div>

      <div className="pfilter-cols">
        {/* ---- Filter by ---- */}
        <div className="pfilter-col">
          <div className="pfilter-col-title">Filter by:</div>

          <label className="pfilter-search">
            <span style={{ width: 15, height: 15, color: "var(--text-faint)" }}><IconSearch /></span>
            <input
              value={value.query}
              onChange={(e) => set({ query: e.target.value })}
              placeholder="Search in projects"
            />
          </label>

          <div className="pfilter-label">Tags</div>
          <div className="pfilter-chips">
            {allTags.map((t) => (
              <button
                key={t}
                className={"pfilter-chip" + (value.tags.includes(t) ? " on" : "")}
                onClick={() => toggleTag(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="pfilter-label">Created by which team</div>
          <select value={value.team} onChange={(e) => set({ team: e.target.value })} className="pfilter-select">
            <option value="">All teams</option>
            {allTeams.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <div className="pfilter-label">Date created</div>
          <div className="pfilter-dates">
            <input type="date" value={value.createdFrom} onChange={(e) => set({ createdFrom: e.target.value })} />
            <span className="pfilter-dash">–</span>
            <input type="date" value={value.createdTo} onChange={(e) => set({ createdTo: e.target.value })} />
          </div>
        </div>

        {/* ---- Sort by ---- */}
        <div className="pfilter-col pfilter-col-sort">
          <div className="pfilter-col-title">Sort by:</div>
          {sortOptions.map((s) => (
            <button
              key={s.key}
              className={"pfilter-sort" + (value.sortBy === s.key ? " on" : "")}
              onClick={() => set({ sortBy: s.key })}
            >
              {s.label}
              {value.sortBy === s.key && (
                <span className="pfilter-dir" onClick={(e) => { e.stopPropagation(); toggleDir(); }}>
                  {value.sortDir === "asc" ? "↑" : "↓"}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="pfilter-foot">
        <button className="pfilter-clear" onClick={() => onChange({ ...emptyProjectFilter })}>
          Clear filter
        </button>
        <button className="btn btn-primary btn-sm" onClick={onClose}>Done</button>
      </div>
    </div>
  );
}
