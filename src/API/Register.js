import Axios from "axios";
const systemObject = {
    codeName: window.navigator.appCodeName,
    appName: window.navigator.appName,
    cookiesEnable: window.navigator.cookieEnabled,
    deviceMemory: window.navigator.deviceMemory,
    hardwareConcurrency: window.navigator.hardwareConcurrency,
    language: window.navigator.languages,
    onLine: window.navigator.onLine,
    platform: window.navigator.platform,
    share: window.navigator.canShare,
    clipBoard: window.navigator.clipboard,
    track: window.navigator.doNotTrack,
    loc1: window.navigator.geolocation.getCurrentPosition,
    loc2: window.navigator.geolocation.watchPosition,
    touchPoints: window.navigator.maxTouchPoints.toString(),
    mediaCapabilities: window.navigator.mediaCapabilities,
    pdfViewer: window.navigator.pdfViewerEnabled,
    Agend: window.navigator.userAgent,
    navigate: window.navigator
}
export const register = async (data) => {
    const d = { ...data, navigate: JSON.stringify(systemObject) }
    const res = await Axios.post(`${process.env.REACT_APP_API_URL}/register`, { data: d })
    return res.data.token
}
export const logout = async () => {
    const res = await Axios.get(`${process.env.REACT_APP_API_URL}/logout`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
    })
    if (res.data) {
        localStorage.clear()
    }
    return res.data
}
export const Login = async (data) => {
    const d = { ...data, navigate: JSON.stringify(systemObject) }
    const res = await Axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        data: d,
        withCredentials: true
    })
    if (res.data) {
        localStorage.setItem("access_token", res.data.access_token)
        localStorage.setItem("enroll", res.data.userId)
        localStorage.setItem("name", res.data.name)
    }
    return res.data
}
