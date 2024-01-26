import { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '..'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


// useDebounse  

export const useDebounce = (value: string, delay: number) => {
    const [debonceValue, setDebonceValue] = useState("")
    
    useEffect(() => {
        setDebonceValue(value)
        const timer = setTimeout(() => {

            setDebonceValue(value)

        }, delay || 500);

        return clearTimeout(timer)
        
    }, [value, delay])

    return debonceValue
}
