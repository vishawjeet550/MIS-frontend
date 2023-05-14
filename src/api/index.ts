const APP_URL = process.env.REACT_APP_URL

export const fetchReports = async () => {
    const res = await fetch(`${APP_URL}mis/reports`)
    const response = await res.json()
    return response || []
}