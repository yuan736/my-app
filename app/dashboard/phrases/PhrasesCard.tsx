'use client'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState, useRef, useEffect } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { Category, db, Phrase } from '@/lib/db'
import { copyToClipboard as copyToClip } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Copy, Plus } from 'lucide-react'
import { log } from "console"
import { Tooltip as TooltipPrimitive } from "radix-ui"

export function PhrasesCard({ phrase }: { phrase: Phrase }) {
    // 复制到剪贴板
    const copyToClipboard = (phrase: Phrase) => {
         console.log('copy'+":   sadasdas")
        copyToClip(phrase.content, true, () => {
         console.log('copy'+":   end")

            db.phrases.update(phrase.id!, {
                usageCount: phrase.usageCount += 1
            })
        })
    }

    const textRef = useRef<HTMLParagraphElement>(null)
    const [isOverflowing, setIsOverflowing] = useState(false)

    useEffect(() => {
        const el = textRef.current
        if (el) {
            // 判断是否溢出：scrollHeight > clientHeight
            setIsOverflowing(el.scrollHeight > el.clientHeight)
            console.log(el.scrollHeight, el.clientHeight)
        }
    }, [phrase.content]) // 当内容变化时重新判断
    return (
        <Card key={phrase.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {phrase.category}
                    </span>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(phrase)}
                    >
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {isOverflowing ? (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <p
                                    ref={textRef}
                                    className="text-sm text-gray-700 line-clamp-3 cursor-help"
                                >
                                    {phrase.content}
                                </p>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-h-100 overflow-y-auto max-w-md bg-green-200 text-gray-900">
                                <p className="text-sm whitespace-pre-wrap">{phrase.content}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ) : (
                    <p
                        ref={textRef}
                        className="text-sm text-gray-700 line-clamp-3 cursor-help"
                    >
                        {phrase.content}
                    </p>
                )}
                <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
                    <span>使用次数：{phrase.usageCount}</span>
                    {phrase.lastUsed && (
                        <span>最后使用：{new Date(phrase.lastUsed).toLocaleDateString()}</span>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}