// hooks/useThemeSync.ts
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../Redux/store'

export function useThemeSync() {
    const mode = useSelector((s: RootState) => s.theme.mode) // 单一真相：Redux

    useEffect(() => {
        const dark = mode === 'dark'
        document.documentElement.classList.toggle('dark', dark)
        document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
    }, [mode])

}
