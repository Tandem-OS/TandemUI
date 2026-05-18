import { useEffect, useState } from "react"
import { useParams, useSearchParams, useNavigate } from "react-router-dom"
import CompositionRenderer from "@/pages/Renderer/CompositionRenderer"
import { validateToken } from "@/lib/requests/PreviewTokenRequest"
import { layoutTokens } from "@/design-system/tokens/layout"
import GlobalSpinner from "@/components/ant-design-spinner/Spinner"
import ErrorState from "@/common-components/ErrorState"

const t = layoutTokens.preview

type TokenState = "validating" | "valid" | "invalid" | "expired"

const PreviewComposePage = () => {
  const { id: compositionId } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get("token")

  const [tokenState, setTokenState] = useState<TokenState>("validating")

  const verify = async () => {
    if (!compositionId || !token) {
      setTokenState("invalid")
      return
    }
    setTokenState("validating")
    try {
      await validateToken(compositionId, token)
      setTokenState("valid")
    } catch (err: any) {
      if (err?.response?.status === 401) {
        setTokenState("expired")
      } else {
        setTokenState("invalid")
      }
    }
  }

  useEffect(() => {
    verify()
  }, [compositionId, token])

  if (tokenState === "validating") {
    return (
      <div className={t.loadingWrapper}>
        <GlobalSpinner message="Loading your preview" subMessage="Verifying access…" />
      </div>
    )
  }

  if (tokenState === "expired") {
    return (
      <div className={t.errorWrapper}>
        <ErrorState
          variant="expired"
          onSecondary={() => navigate(-1)}
          secondaryLabel="Go back"
        />
      </div>
    )
  }

  if (tokenState === "invalid") {
    return (
      <div className={t.errorWrapper}>
        <ErrorState
          variant="not_found"
          title="Invalid preview link"
          message="This preview link isn't valid. Ask your designer to share a new one."
          onSecondary={() => navigate(-1)}
          secondaryLabel="Go back"
        />
      </div>
    )
  }

  return <CompositionRenderer compositionId={compositionId} />
}

export default PreviewComposePage
