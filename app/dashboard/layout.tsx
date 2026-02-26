
import { ReactNode } from 'react'
import Link from 'next/link'
import { Home, Users, MessageSquare, Bell, BarChart3 } from 'lucide-react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
        <div className="text-xl font-bold text-blue-600 mb-8">销售助手</div>
        <nav className="space-y-1 flex-1">
          <NavItem href="/dashboard" icon={<Home className="h-4 w-4" />}>首页</NavItem>
          <NavItem href="/dashboard/customers" icon={<Users className="h-4 w-4" />}>客户管理</NavItem>
          <NavItem href="/dashboard/phrases" icon={<MessageSquare className="h-4 w-4" />}>话术库</NavItem>
          <NavItem href="/dashboard/reminders" icon={<Bell className="h-4 w-4" />}>今日提醒</NavItem>
        </nav>
        {/* <div className="pt-4 border-t text-sm text-gray-500">
          👤 
        </div> */}
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6">
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <button className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">TA</div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6">{children}</div>
      </main>
    </div>
  )
}

function NavItem({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
      {icon}
      <span>{children}</span>
    </Link>
  )
}