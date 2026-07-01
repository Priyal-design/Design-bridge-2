import { useRef, useState, useEffect } from "react";
import { projects, allContributors, allTags, allTeams, emptyProjectFilter } from "../data";
import { IconSearch, IconClose } from "./Icons";

const sortOptions = [
  { key: "name", label: "Project Name" },
  { key: "created", label: "Date Created" },
  { key: "team", label: "Created By Team" },
];

export default function ProjectFilter({ value, onChange, onClose }) {
  const set = (patch) => onChange({ ...value, ...patch });

  const toggleTag = (t) =>
    set({ tags: value.tags.includes(t) ? value.tags.filter((x) => x !== t) : [...value.tags, t] });

  const toggleDir = () => set({ sortDir: value.sortDir === "asc" ? "desc" : "asc" });

  const [focusedField, setFocusedField] = useState(null);
  const filterRef = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setFocusedField(null);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const projectQuery = value.query.trim().toLowerCase();
  const projectSuggestions = focusedField === "query" && projectQuery
    ? projects.filter((p) => p.name.toLowerCase().includes(projectQuery))
    : [];

  const contributorQuery = value.contributor.trim().toLowerCase();
  const contributorSuggestions = focusedField === "contributor" && contributorQuery
    ? allContributors.filter((n) => n.toLowerCase().includes(contributorQuery))
    : [];

  const teamQuery = (value._teamQuery || "").trim().toLowerCase();
  const teamSuggestions = focusedField === "team" && teamQuery
    ? allTeams.filter((t) => t.toLowerCase().includes(teamQuery))
    : allTeams;

  return (
    <div className="pfilter" onMouseDown={(e) => e.stopPropagation()} ref={filterRef}>
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

          <div className="pfilter-field-wrap">
            <label className="pfilter-search">
              <span style={{ width: 15, height: 15, color: "var(--text-faint)" }}><IconSearch /></span>
              <input
                value={value.query}
                onChange={(e) => set({ query: e.target.value })}
                onFocus={() => setFocusedField("query")}
                placeholder="Search in projects"
              />
            </label>
            {projectSuggestions.length > 0 && (
              <div className="pfilter-suggestions">
                {projectSuggestions.map((p) => (
                  <button
                    key={p.id}
                    className="pfilter-suggestion-item"
                    onClick={() => { set({ query: p.name }); setFocusedField(null); }}
                  >
                    <span className="pfilter-suggestion-name">{p.name}</span>
                    <span className="pfilter-suggestion-meta">{p.team}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

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
          <div className="pfilter-field-wrap">
            <label className="pfilter-search">
              <span style={{ width: 15, height: 15, color: "var(--text-faint)" }}><IconSearch /></span>
              <input
                value={value.team || (value._teamQuery || "")}
                onChange={(e) => {
                  const v = e.target.value;
                  set({ team: "", _teamQuery: v });
                }}
                onFocus={() => setFocusedField("team")}
                placeholder="Search by team"
              />
            </label>
            {focusedField === "team" && teamSuggestions.length > 0 && (
              <div className="pfilter-suggestions">
                <button
                  className={"pfilter-suggestion-item" + (!value.team ? " active" : "")}
                  onClick={() => { set({ team: "", _teamQuery: "" }); setFocusedField(null); }}
                >
                  <span className="pfilter-suggestion-name">All teams</span>
                </button>
                {teamSuggestions.map((t) => (
                  <button
                    key={t}
                    className={"pfilter-suggestion-item" + (value.team === t ? " active" : "")}
                    onClick={() => { set({ team: t, _teamQuery: t }); setFocusedField(null); }}
                  >
                    <span className="pfilter-suggestion-name">{t}</span>
                    <span className="pfilter-suggestion-meta">
                      {projects.filter((p) => p.team === t).length} projects
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pfilter-label">Status</div>
          <div className="pfilter-chips">
            {[
              { key: "Ongoing", label: "Ongoing" },
              { key: "In Development", label: "In Preparation" },
              { key: "Released", label: "Completed" },
            ].map((s) => (
              <button
                key={s.key}
                className={"pfilter-chip" + (value.status === s.key ? " on" : "")}
                onClick={() => set({ status: value.status === s.key ? "" : s.key })}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="pfilter-label">Contributor</div>
          <div className="pfilter-field-wrap">
            <label className="pfilter-search">
              <span style={{ width: 15, height: 15, color: "var(--text-faint)" }}><IconSearch /></span>
              <input
                value={value.contributor}
                onChange={(e) => set({ contributor: e.target.value })}
                onFocus={() => setFocusedField("contributor")}
                placeholder="Search by contributor name"
              />
            </label>
            {contributorSuggestions.length > 0 && (
              <div className="pfilter-suggestions">
                {contributorSuggestions.map((name) => (
                  <button
                    key={name}
                    className={"pfilter-suggestion-item" + (value.contributor === name ? " active" : "")}
                    onClick={() => { set({ contributor: name }); setFocusedField(null); }}
                  >
                    <span className="pfilter-suggestion-name">{name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

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
