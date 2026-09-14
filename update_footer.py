import re

with open('packages/marketing/src/components/Footer/FooterMega.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'links: { label: string; href: string }[];',
    'links: { label: string; href?: string; badge?: React.ReactNode }[];'
)

# And how does it render links?
render_old = """                  <ul className="mt-6 space-y-4">
                    {group.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <a
                          href={link.href}
                          className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>"""

render_new = """                  <ul className="mt-6 space-y-4">
                    {group.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        {link.href ? (
                          <a
                            href={link.href}
                            className="flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                          >
                            {link.label}
                            {link.badge && link.badge}
                          </a>
                        ) : (
                          <div className="flex items-center gap-2 text-sm text-zinc-400 dark:text-zinc-500 cursor-not-allowed">
                            {link.label}
                            {link.badge && link.badge}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>"""

content = content.replace(render_old, render_new)

with open('packages/marketing/src/components/Footer/FooterMega.tsx', 'w') as f:
    f.write(content)
