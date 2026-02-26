'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, TrendingUp, Clock } from 'lucide-react'

export default async function DashboardPage() {
  // 模拟数据，实际应从数据库获取
  const todayCount = 3
  const overdueCount = 2
  const totalCustomers = 28
  const newCustomers = 12
  const conversionRate = 65

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">今日待办</CardTitle>
            <Clock className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayCount}条</div>
            <p className="text-xs text-gray-500 mt-1">{overdueCount}条逾期</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">总客户数</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}个</div>
            <p className="text-xs text-gray-500 mt-1">新客户{newCustomers}个</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">成交率</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-gray-500 mt-1">环比+5%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>📌 今日需跟进</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium">张三 · 报价后3天未回复</p>
                  <p className="text-sm text-gray-500">报价金额：¥12,000</p>
                </div>
              </div>
              <Button size="sm">去跟进</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div>
                  <p className="font-medium">李四 · 寄样预计今日送达</p>
                  <p className="text-sm text-gray-500">物流单号：SF123456789</p>
                </div>
              </div>
              <Button size="sm">查看物流</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>📊 成交原因分布</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-20 text-sm">快速响应</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: '45%' }}></div>
              </div>
              <span className="text-sm text-gray-600">45%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-20 text-sm">价格优势</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: '30%' }}></div>
              </div>
              <span className="text-sm text-gray-600">30%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-20 text-sm">关系维护</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500" style={{ width: '25%' }}></div>
              </div>
              <span className="text-sm text-gray-600">25%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}