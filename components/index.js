import dynamic from 'next/dynamic'

export const DynamicLayout = dynamic(() => import('../../components/layout'))
export const Test = dynamic(() => import('../../components/test'))
export const Mdy = dynamic(() => import('../../components/m'))