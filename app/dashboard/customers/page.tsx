// import { prisma } from '@/lib/pramra'
'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Plus } from 'lucide-react'
import Link from 'next/link'

export default async function CustomersPage() {
  // 从数据库获取客户列表
  // const customers = await prisma.customer.findMany({
  //   orderBy: { createdAt: 'desc' }
  // })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative w-80">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="搜索客户名/公司" className="pl-8" />
          </div>
          <select className="border rounded-md px-3 py-2 text-sm">
            <option>全部类型</option>
            <option>新客户</option>
            <option>老客户</option>
          </select>
          <select className="border rounded-md px-3 py-2 text-sm">
            <option>全部标签</option>
            <option>价格敏感型</option>
            <option>技术导向型</option>
            <option>关系型</option>
          </select>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> 新建客户
        </Button>
      </div>
{/* 
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {customers.map(customer => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div> */}
    </div>
  )
}

function CustomerCard({ customer }: { customer: any }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{customer.name}</h3>
          {customer.pending > 0 && (
            <Badge variant="destructive" className="rounded-full px-2">
              {customer.pending}
            </Badge>
          )}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Badge variant="outline">{customer.type}</Badge>
          {customer.tags.map((tag: string) => (
            <Badge key={tag} className="bg-blue-50 text-blue-700 border-none">{tag}</Badge>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500">最后跟进：{customer.lastFollow || '无'}</span>
          <Link href={`/dashboard/customers/${customer.id}`}>
            <Button size="sm" variant="ghost">查看详情</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}