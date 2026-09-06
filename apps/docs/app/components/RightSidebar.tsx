export function RightSidebar() {
  return (
    <aside className="hidden xl:block w-52 shrink-0 sticky top-16 h-fit pt-8 pl-6">
      <div className="flex flex-col space-y-3">
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">On this page</span>
        <ul className="flex flex-col space-y-2.5 text-sm text-zinc-500 dark:text-zinc-400">
          <li>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Usage
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Variants
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Sizes
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              States
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
