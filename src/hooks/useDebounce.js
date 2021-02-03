import { useCallback, useEffect } from 'react'

export const useDebounce = (effect, delay, dependencies) => {
    const callback = useCallback(effect, dependencies)

    useEffect(() => {
        const handler = setTimeout(() => {
            callback()
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [callback, delay])
}