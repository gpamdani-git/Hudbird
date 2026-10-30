import React from "react";

export interface ApiPropRow {
  prop: string;
  type?: string;
  defaultVal?: string;
  default?: string;
  required?: boolean;
  description?: React.ReactNode;
  desc?: React.ReactNode;
}

interface ApiTableProps {
  title?: string;
  note?: React.ReactNode;
  rows: ApiPropRow[];
}

export const ApiTable: React.FC<ApiTableProps> = ({ title, note, rows }) => {
  return (
    <div className="my-6">
      {title && (
        <h3 className="mb-3 text-2xl font-medium tracking-[-0.3px] text-zinc-900 dark:text-white">
          {title}
        </h3>
      )}
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-[#2E2F33] dark:bg-[#161618]">
        {note && (
          <div className="border-b border-zinc-200 bg-zinc-50/70 px-4 py-3 font-sans text-xs text-zinc-600 dark:border-[#2E2F33] dark:bg-[#202124]/70 dark:text-[#828282]">
            {note}
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-600 dark:text-[#E5E5E5]">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-[#2E2F33] dark:bg-[#202124] dark:text-white">
              <tr>
                <th className="px-6 py-3.5 text-xs font-semibold tracking-wider uppercase dark:text-zinc-300">
                  Prop
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold tracking-wider uppercase dark:text-zinc-300">
                  Type
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold tracking-wider uppercase dark:text-zinc-300">
                  Default
                </th>
                <th className="px-6 py-3.5 text-xs font-semibold tracking-wider uppercase dark:text-zinc-300">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-[#2E2F33]">
              {rows.map((row, idx) => (
                <tr
                  key={idx}
                  className="transition-colors hover:bg-zinc-50/50 dark:hover:bg-[#202124]/50"
                >
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    {row.prop}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-zinc-600 dark:text-[#828282]">
                    {row.type || "-"}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-zinc-500 dark:text-[#828282]">
                    {(row.defaultVal ?? row.default) && (row.defaultVal ?? row.default) !== "-" ? (
                      <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-zinc-700 dark:border dark:border-[#2E2F33] dark:bg-[#202124] dark:text-[#E5E5E5]">
                        {row.defaultVal ?? row.default}
                      </span>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm leading-[1.65] text-zinc-600 dark:text-[#E5E5E5]">
                    {row.description ?? row.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
