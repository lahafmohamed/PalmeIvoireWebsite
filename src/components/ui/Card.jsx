/**
 * Generic card shell.
 *
 * Props:
 *   variant   — 'default' | 'hover' | 'thin'   (default: 'default')
 *   reveal    — 'up' | 'left' | 'right' | false (default: 'up')
 *   isVisible — boolean — triggers the reveal animation
 *   delay     — CSS transition-delay value e.g. '0.2s'
 *   className — extra classes
 *   as        — tag to render ('div' default)
 *   children
 *   ...rest   — forwarded to root element
 */
export function Card({
  variant = 'default',
  reveal = 'up',
  isVisible = false,
  delay,
  className = '',
  as = 'div',
  children,
  ...rest
}) {
  const Tag = as
  const variantClass = variant === 'default' ? 'card' : variant === 'hover' ? 'card card--hover' : 'card--thin'
  const revealClass  = reveal ? `reveal reveal--${reveal}` : ''
  const visibleClass = isVisible && reveal ? 'is-visible' : ''
  const cls = [variantClass, revealClass, visibleClass, className].filter(Boolean).join(' ')

  return (
    <Tag
      className={cls}
      style={delay ? { transitionDelay: delay } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
