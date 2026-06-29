import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { projects, statusBadge, filterAndSortProjects, isFilterActive } from "../data";
import ProjectFilter from "./ProjectFilter";
import { IconSearch, IconFilter } from "./Icons";

// Search field + detailed filter dropdown, shared by the Knowledge Hub and the global top bar.
// variant="global" also renders a live results dropdown that links straight to a project.
export default function SearchBar({ value, onChange, placeholder, variant = "page" }) {
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
  const showResults =
    variant === "global" && focused && !openFilter && (value.query.trim() || active);
  const results = showResults ? filterAndSortProjects(projects, value) : [];

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
        <button
          className={"searchbar-filter" + (active ? " on" : "")}
          onClick={() => { setOpenFilter((o) => !o); setFocused(false); }}
          aria-label="Filter"
          title="Filter"
        >
          <span style={{ width: 16, height: 16, display: "grid" }}><IconFilter /></span>
          {active && <span className="searchbar-filter-dot" />}
        </button>
      </div>

      {openFilter && (
        <ProjectFilter value={value} onChange={onChange} onClose={() => setOpenFilter(false)} />
      )}

      {showResults && (
        <div className="searchbar-results">
          {results.length === 0 ? (
            <div className="searchbar-empty">No projects match your filters.</div>
          ) : (
            results.map((p) => (
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
