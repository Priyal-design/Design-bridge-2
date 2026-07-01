import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { projects, allContributors, allTeams, statusBadge, filterAndSortProjects, isFilterActive } from "../data";
import ProjectFilter from "./ProjectFilter";
import { IconSearch, IconFilter } from "./Icons";

// Search field + detailed filter dropdown, shared by the Knowledge Hub and the global top bar.
// variant="global" also renders a live results dropdown that links straight to a project.
// variant="page" renders a suggestions dropdown with matching project names and contributor names.
export default function SearchBar({ value, onChange, placeholder, variant = "page", showFilter = true }) {
  const [openFilter, setOpenFilter] = useState(false);
  const [focused, setFocused] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!openFilter && !focused) return;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpenFilter(false);
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [openFilter, focused]);

  const active = isFilterActive(value);
  const q = value.query.trim().toLowerCase();

  // Global variant: show filtered project results
  const showGlobalResults =
    variant === "global" && focused && !openFilter && (q || active);
  const globalResults = showGlobalResults ? filterAndSortProjects(projects, value) : [];

  // Page variant: show suggestions (project names + contributor names)
  const showSuggestions = variant === "page" && focused && !openFilter && q.length > 0;
  const suggestions = showSuggestions ? getSuggestions(q) : { projects: [], contributors: [], teams: [] };

  return (
    <div className={"searchbar" + (variant === "global" ? " searchbar-global" : "")} ref={wrapRef}>
      <div className="topbar-search" style={variant === "page" ? { maxWidth: "100%" } : undefined}>
        <span style={{ width: 16, height: 16, color: "var(--text-faint)" }}><IconSearch /></span>
        <input
          value={value.query}
          onChange={(e) => onChange({ ...value, query: e.target.value })}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
        />
        {showFilter && (
          <button
            className={"searchbar-filter" + (active ? " on" : "")}
            onClick={() => { setOpenFilter((o) => !o); setFocused(false); }}
            aria-label="Filter"
            title="Filter"
          >
            <span style={{ width: 16, height: 16, display: "grid" }}><IconFilter /></span>
            {active && <span className="searchbar-filter-dot" />}
          </button>
        )}
      </div>

      {openFilter && (
        <ProjectFilter value={value} onChange={onChange} onClose={() => setOpenFilter(false)} />
      )}

      {/* Page variant: suggestions dropdown */}
      {showSuggestions && (suggestions.projects.length > 0 || suggestions.contributors.length > 0 || suggestions.teams.length > 0) && (
        <div className="searchbar-results">
          {suggestions.projects.length > 0 && (
            <>
              <div className="searchbar-suggestion-heading">Projects</div>
              {suggestions.projects.map((p) => (
                <Link
                  key={p.id}
                  to={`/projects/${p.id}`}
                  className="searchbar-result"
                  onClick={() => setFocused(false)}
                >
                  <div className="searchbar-result-main">
                    <span className="searchbar-result-name">{p.name}</span>
                    <span className="searchbar-result-meta">
                      {p.team} · {p.created}
                    </span>
                  </div>
                  <span className={"badge " + statusBadge[p.status]}>
                    {p.status === "In Development" ? "In Preparation" : p.status}
                  </span>
                </Link>
              ))}
            </>
          )}
          {suggestions.teams.length > 0 && (
            <>
              <div className="searchbar-suggestion-heading">Created by team</div>
              {suggestions.teams.map((t) => (
                <button
                  key={t}
                  className="searchbar-result searchbar-suggestion-contributor"
                  onClick={() => { onChange({ ...value, team: t, query: "" }); setFocused(false); }}
                >
                  <div className="searchbar-result-main">
                    <span className="searchbar-result-name">{t}</span>
                    <span className="searchbar-result-meta">
                      {projects.filter((p) => p.team === t).length} projects
                    </span>
                  </div>
                </button>
              ))}
            </>
          )}
          {suggestions.contributors.length > 0 && (
            <>
              <div className="searchbar-suggestion-heading">Contributors</div>
              {suggestions.contributors.map((name) => (
                <button
                  key={name}
                  className="searchbar-result searchbar-suggestion-contributor"
                  onClick={() => { onChange({ ...value, contributor: name, query: "" }); setFocused(false); }}
                >
                  <div className="searchbar-result-main">
                    <span className="searchbar-result-name">{name}</span>
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      )}

      {/* Global variant: filtered project results */}
      {showGlobalResults && (
        <div className="searchbar-results">
          {globalResults.length === 0 ? (
            <div className="searchbar-empty">No projects match your filters.</div>
          ) : (
            globalResults.map((p) => (
              <Link
                key={p.id}
                to={`/projects/${p.id}`}
                className="searchbar-result"
                onClick={() => setFocused(false)}
              >
                <div className="searchbar-result-main">
                  <span className="searchbar-result-name">{p.name}</span>
                  <span className="searchbar-result-meta">
                    {p.team} · {p.created}
                  </span>
                </div>
                <span className={"badge " + statusBadge[p.status]}>
                  {p.status === "In Development" ? "In Preparation" : p.status}
                </span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function getSuggestions(q) {
  const projectMatches = projects.filter((p) =>
    p.name.toLowerCase().includes(q)
  );
  const contributorMatches = allContributors.filter((name) =>
    name.toLowerCase().includes(q)
  );
  const teamMatches = allTeams.filter((t) =>
    t.toLowerCase().includes(q)
  );
  return { projects: projectMatches, contributors: contributorMatches, teams: teamMatches };
}
