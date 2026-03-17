import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import CompositionRenderer from "@/pages/Renderer/CompositionRenderer"
import { validateToken } from "@/lib/requests/PreviewTokenRequest"

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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#fff" }}>
        <span style={{ color: "#999", fontSize: "14px" }}>Loading preview...</span>
      </div>
    )
  }

  if (tokenState === "invalid" || tokenState === "expired") {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#fff" }}>
        <span style={{ color: "#999", fontSize: "14px" }}>
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