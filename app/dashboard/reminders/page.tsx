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

// 预定义分类（可以从数据库动态获取，这里先写死）

export default function PhrasesPage() {
    return (
        <div className="space-y-6">
           123
        </div>
    )
}