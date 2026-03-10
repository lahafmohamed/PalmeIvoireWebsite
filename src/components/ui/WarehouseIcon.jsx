export function WarehouseIcon({ 
  size = 24, 
  className = '', 
  color = 'currentColor',
  ...props 
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`warehouse-icon ${className}`}
      {...props}
    >
      <path strokeDasharray="0" d="M0 0h24v24H0z" fill="none"/>
      <path d="M3 21v-13l9 -4l9 4v13" />
      <path d="M13 13h4v8h-10v-6h6" />
      <path d="M13 21v-9a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v3" />
    </svg>
  )
}

export default WarehouseIcon
