'use client'

import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { Category, db, Phrase } from '@/lib/db'
import { copyToClipboard as copyToClip } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Search, Copy, Plus } from 'lucide-react'
import { PhrasesCard } from './PhrasesCard'

// 预定义分类（可以从数据库动态获取，这里先写死）

export default function PhrasesPage() {
    const categories = useLiveQuery(() => {
        return db.category.toArray()
    }) || []
    // 实时获取所有话术
    const phrases = useLiveQuery(() => db.phrases.orderBy('usageCount').reverse().toArray()) || []

    // 筛选状态
    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('全部')

    // 新建话术表单状态
    const [newPhrase, setNewPhrase] = useState<Partial<Phrase>>({
        category: categories[0]?.name,
        content: '',
        usageCount: 0,
    })

    const [newCategory, setNewCategory] = useState<Partial<Category>>({
        name: '',
        sortOrder: 0,
    })
    const [dialogOpen, setDialogOpen] = useState(false)
    const [catorydialogOpen, setcatoryDialogOpen] = useState(false)

    // 过滤话术
    const filteredPhrases = phrases.filter(p => {
        const matchesCategory = categoryFilter === '全部' || p.category === categoryFilter
        const matchesSearch = p.content.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
    })

   

    // 提交新建话术
    const handleSubmit = async () => {
        if (!newPhrase.content?.trim()) return
        await db.phrases.add({
            category: newPhrase.category!,
            content: newPhrase.content,
            usageCount: 0,
            lastUsed: undefined,
        })
        // 重置表单并关闭弹窗
        setNewPhrase({ category: categories[0].name, content: '', usageCount: 0 })
        setDialogOpen(false)
    }

    const catoryHandleSubmit = async () => {
        if (!newCategory.name?.trim()) return
        debugger
        await db.category.add({
            name: newCategory.name,
            sortOrder: 0,
            createdAt: new Date()
        })
        // 重置表单并关闭弹窗
        setNewCategory({ name: '' })
        setcatoryDialogOpen(false)
    }

    // 获取所有可用分类（从现有数据中提取，加上“全部”）
    const allCategories = ['全部', ...new Set(phrases.map(p => p.category))]

    return (
        <div className="space-y-6">
            {/* 头部：标题 + 新建按钮 */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">话术库</h1>
                <div className='flex justify-between space-x-4' >
                    <Dialog open={catorydialogOpen} onOpenChange={setcatoryDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" /> 新建分类
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>新建分类</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2 space-x-4">
                                    <label className="text-sm font-medium">分类名</label>
                                    <input
                                        className='px-2'
                                        placeholder="输入分类"
                                        value={newCategory.name}
                                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                    />
                                </div>
                                <Button onClick={catoryHandleSubmit} className="w-full">保存</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" /> 新建话术
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>新建话术</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">分类</label>
                                    <Select
                                        value={newPhrase.category}
                                        onValueChange={(val) => setNewPhrase({ ...newPhrase, category: val })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="选择分类" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map(cat => (
                                                <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">内容</label>
                                    <Textarea
                                    className='h-64'
                                        placeholder="输入话术内容..."
                                        value={newPhrase.content}
                                        onChange={(e) => setNewPhrase({ ...newPhrase, content: e.target.value })}
                                        rows={4}
                                    />
                                </div>
                                <Button onClick={handleSubmit} className="w-full">保存</Button>
                            </div>
                        </DialogContent>
                    </Dialog></div>
            </div>

            {/* 搜索和分类筛选 */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="搜索话术..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="全部" />
                    </SelectTrigger>
                    <SelectContent>
                        {allCategories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* 话术卡片列表 */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredPhrases.map(phrase => (
                    <PhrasesCard key={phrase.id} phrase={phrase} ></PhrasesCard>
                ))}
            </div>

            {filteredPhrases.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                    暂无话术，点击右上角“新建话术”添加
                </div>
            )}
        </div>
    )
}