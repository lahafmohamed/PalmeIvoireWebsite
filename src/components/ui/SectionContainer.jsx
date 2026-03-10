/**
 * Section wrapper with optional label / heading / subtitle.
 *
 * Props:
 *   as          — section tag ('section' default, or 'div', 'article'…)
 *   className   — extra class on the <section>
 *   container   — wrap children in .container div (default: true)
 *   label       — eyebrow label text
 *   heading     — h2 text
 *   subtitle    — paragraph text below heading
 *   isVisible   — boolean for reveal animation
 *   innerRef    — ref forwarded to the section element
 *   children
 */
export function SectionContainer({
  as = 'section',
  className = '',
  container = true,
  label,
  heading,
  subtitle,
  isVisible = false,
  innerRef,
  children,
  ...rest
}) {
  const Tag = as

  const header = (
    <>
      {label    && <p className={`section__label reveal reveal--up${isVisible ? ' is-visible' : ''}`}>{label}</p>}
      {heading  && (
        <h2
          className={`section__heading reveal reveal--up${isVisible ? ' is-visible' : ''}`}
          style={{ transitionDelay: '0.08s' }}
        >
          {heading}
        </h2>
      )}
      {subtitle && (
        <p
          className={`section__subtitle reveal reveal--up${isVisible ? ' is-visible' : ''}`}
          style={{ transitionDelay: '0.12s' }}
        >
          {subtitle}
        </p>
      )}
    </>
  )

  return (
    <Tag ref={innerRef} className={className} {...rest}>
      {container ? (
        <div className="container">
          {header}
          {children}
        </div>
      ) : (
        <>
          {header}
          {children}
        </>
      )}
    </Tag>
  )
}
