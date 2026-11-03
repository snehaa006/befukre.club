import { createContext, useContext } from 'react'

/** Flips true the moment the preloader's curtains start to part. */
export const ReadyContext = createContext(false)

export const useReady = (): boolean => useContext(ReadyContext)
