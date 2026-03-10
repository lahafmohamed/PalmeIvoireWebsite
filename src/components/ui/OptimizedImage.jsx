/**
 * Drop-in <img> replacement with standardized performance attributes.
 *
 * Props:
 *   priority  — true for above-the-fold images (sets fetchpriority="high", loading="eager", decoding="sync")
 *   sizes     — responsive sizes attribute, e.g. "(max-width: 768px) 100vw, 50vw"
 *   width / height — intrinsic dimensions (prevents CLS via aspect-ratio reservation)
 *   alt       — required; describe the image in French or English context
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  className = '',
  style,
  ...rest
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding={priority ? 'sync' : 'async'}
      className={className}
      style={style}
      {...rest}
    />
  )
}
