import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import CompositionRenderer from "@/pages/Renderer/CompositionRenderer"
import { validateToken } from "@/lib/requests/PreviewTokenRequest"
import { layoutTokens } from "@/design-system/tokens/layout"

const t = layoutTokens.preview

type TokenState = "validating" | "valid" | "invalid" | "expired"

const PreviewComposePage = () => {
  const { id: compositionId } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")

  const [tokenState, setTokenState] = useState<TokenState>("validating")

  useEffect(() => {
    if (!compositionId || !token) {
      setTokenState("invalid")
      return
    }

    const verify = async () => {
      try {
        await validateToken(compositionId, token)
        setTokenState("valid")
      } catch (err: any) {
        // 401 = expired token, anything else = invalid
        if (err?.response?.status === 401) {
          setTokenState("expired")
        } else {
          setTokenState("invalid")
        }
      }
    }

    verify()
  }, [compositionId, token])

  if (tokenState === "validating") {
    return (
      <div className={t.loadingWrapper}>
        <span className={t.loadingText}>Loading preview...</span>
      </div>
    )
  }

  if (tokenState === "invalid" || tokenState === "expired") {
    return (
      <div className={t.errorWrapper}>
        <span className={t.errorText}>
          {tokenState === "expired" ? "Preview token expired." : "Invalid preview token."}
        </span>
      </div>
    )
  }

  return (
    <CompositionRenderer />
  )
}

export default PreviewComposePage