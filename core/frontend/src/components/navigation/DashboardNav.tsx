import { Link, useLocation } from 'react-router-dom'
import { Calendar, User, CreditCard, Settings } from 'react-feather'

const menuItems = [
  {
    title: 'Reservations',
    icon: <Calendar size={20} />,
    href: '/dashboard'
  },
  {
    title: 'Profile',
    icon: <User size={20} />,
    href: '/profile'
  },
  {
    title: 'Payments',
    icon: <CreditCard size={20} />,
    href: '/payments'
  },
  {
    title: 'Settings',
    icon: <Settings size={20} />,
    href: '/settings'
  }
]

const DashboardNav = () => {
  const location = useLocation()

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 mb-8">
      {menuItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary ${
            location.pathname === item.href
              ? 'text-primary'
              : 'text-muted-foreground'
          }`}
        >
          {item.icon}
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  )
}

export default DashboardNav
