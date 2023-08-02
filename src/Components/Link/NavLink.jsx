/* eslint-disable jsx-a11y/anchor-is-valid */

const NavLink = ({ icon, name, active = false, ...props }) => {
  return (
    <a
      {...props}
      className={`text-xl ${active ? 'text-inherit' : 'text-gray-400'}`}
    >
      <i className={`bi bi-${icon} mr-3`}></i> {name}
    </a>
  )
}

export default NavLink