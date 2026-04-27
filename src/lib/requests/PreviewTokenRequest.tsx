export const validateToken = async (compositionId: string, token: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/preview/validate?composition_id=${compositionId}&token=${token}`
  )
  if (res.status === 401) throw Object.assign(new Error("Expired"), { response: { status: 401 } })
  if (!res.ok) throw new Error("Invalid token")
  return res.json()
}
