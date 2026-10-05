// Year-built distribution as a labelled bar list. Real table markup so the numbers are readable without CSS.
export function HousingBars({ title, rows, note }: { title: string; rows: { label: string; share: number }[]; note?: string }) {
  const max = Math.max(...rows.map((r) => r.share), 1);
  return (
    <figure className="card p-5">
      <figcaption className="font-sans text-lg font-semibold">{title}</figcaption>
      <table className="mt-4 w-full text-sm">
        <thead className="sr-only">
          <tr>
            <th scope="col">Year built</th>
            <th scope="col">Share of homes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row" className="w-32 py-1.5 pr-3 text-left font-medium whitespace-nowrap">
                {r.label}
              </th>
              <td className="py-1.5">
                <div className="flex items-center gap-2">
                  <span className="flex-1" aria-hidden="true">
                    <span className="block h-3 rounded-sm bg-teal" style={{ width: `${(r.share / max) * 100}%`, minWidth: 2 }} />
                  </span>
                  <span className="w-10 text-right tabular-nums">{Math.round(r.share)}%</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {note && <p className="mt-3 text-xs text-muted">{note}</p>}
    </figure>
  );
}
