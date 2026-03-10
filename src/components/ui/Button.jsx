import { Link } from 'react-router-dom'

/**
 * Button / CTA component.
 *
 * Props:
 *   variant  — 'primary' | 'ghost' | 'outline'   (default: 'primary')
 *   to       — internal route (renders a <Link>)
 *   href     — external URL (renders an <a>)
 *   size     — 'sm' | 'md' | 'lg'                (default: 'md')
 *   className — extra classes
 *   children  — button label
 *   ...rest   — forwarded to the underlying element
 */
export function Button({
  variant = 'primary',
  to,
  href,
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  const cls = `btn btn--${variant} btn--${size} ${className}`.trim()

  if (to) {
    return <Link to={to} className={cls} {...rest}>{children}</Link>
  }

  if (href) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    )
  }

  return <button type="button" className={cls} {...rest}>{children}</button>
}
