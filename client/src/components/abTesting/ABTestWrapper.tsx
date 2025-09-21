import { ReactNode } from 'react'
import { useABTesting } from '@services/abTesting'

interface ABTestWrapperProps {
  testId: string
  children: (variantId: string | null, config: Record<string, any> | null) => ReactNode
  fallback?: ReactNode
}

const ABTestWrapper = ({ testId, children, fallback }: ABTestWrapperProps) => {
  const { getVariant, getVariantConfig } = useABTesting()
  
  const variantId = getVariant(testId)
  const config = variantId ? getVariantConfig(testId, variantId) : null

  if (!variantId || !config) {
    return <>{fallback}</>
  }

  return <>{children(variantId, config)}</>
}

export default ABTestWrapper
