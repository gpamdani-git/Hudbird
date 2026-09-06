import React from "react";

export interface ApiPropRow {
  prop: string;
  defaultVal: string;
  description: React.ReactNode;
}

interface ApiTableProps {
  note?: React.ReactNode;
  rows: ApiPropRow[];
}

export const ApiTable: React.FC<ApiTableProps> = ({ note, rows }) => {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40">
      {note && (
        <div className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 px-4 py-3 text-xs text-zinc-600 dark:text-zinc-400 font-sans">
          {note}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/80 text-xs font-semibold text-zinc-900 dark:text-zinc-200">
            <tr>
              <th className="px-4 py-3 w-1/4">Prop</th>
              <th className="px-4 py-3 w-1/4">Default</th>
              <th className="px-4 py-3 w-1/2">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200/70 dark:divide-zinc-800/70 text-zinc-700 dark:text-zinc-300">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                <td className="px-4 py-3 font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  <span className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-zinc-800 dark:text-zinc-200">
                    '{row.prop}'
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  {row.defaultVal !== "-" ? (
                    <span className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-zinc-700 dark:text-zinc-300">
                      '{row.defaultVal}'
                    </span>
                  ) : (
                    <span>-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 leading-normal">
                  {row.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
