import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from 'sonner'; // 如果你用了 sonner，否则换成你自己的 toast 或 alert


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// utils/copy.ts 或直接在组件里定义

/**
 * 复制文本到剪贴板，自动降级兼容
 * @param text 要复制的文本
 * @param showToast 是否显示提示（默认 true）
 */
export async function copyToClipboard(text: string, showToast = true,callback:Function=()=>{}) {
  // 方法1：使用 Clipboard API（需要安全上下文：HTTPS 或 localhost）
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      if (showToast) toast.success('已复制到粘贴板');
      callback()
      return;
    } catch (err) {
      console.warn('Clipboard API 失败，尝试降级方案', err);
    }
  }

  // 方法2：document.execCommand('copy') 降级方案
  let success = false;
  const textarea = document.createElement('textarea');
  textarea.value = text;
  // 让 textarea 不可见但仍在 DOM 中
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  textarea.style.pointerEvents = 'none';
  textarea.style.left = '0';
  textarea.style.top = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length); // 兼容移动端

  try {
    success = document.execCommand('copy');
  } catch (err) {
    console.error('execCommand 复制失败', err);
    success = false;
  } finally {
    document.body.removeChild(textarea);
  }

  if (showToast) {
    if (success) {
      toast.success('已复制到粘贴板');
      callback()
    } else {
      toast.error('复制失败，请手动复制');
    }
  }
}
