import axios from "axios";

/**
 * API INSTANCE — SINGLE SOURCE OF TRUTH
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // REQUIRED for httpOnly cookies
});

/**
 * IN-MEMORY ACCESS TOKEN
 * (lost on refresh — restored via /auth/refresh)
 */
let accessToken = null;

/**
 * SESSION HELPERS
 */
export function setAccessToken(token) {
  accessToken = token;
}

export function clearSession() {
  accessToken = null;
}

/**
 * REQUEST INTERCEPTOR
 * Attach access token if present
 */
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

/**
 * RESPONSE INTERCEPTOR — AUTO REFRESH (COOKIE-BASED)
 */
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // Only handle 401 once per request
   if (
  error.response?.status === 401 &&
  !originalRequest._retry &&
  !originalRequest.url.includes("/auth/refresh")
) {
      originalRequest._retry = true;

      try {
        // 🔁 Ask backend to refresh using httpOnly cookie
        const refreshRes = await api.post("/auth/refresh");

        const newAccessToken =
          refreshRes.data?.data?.accessToken;

        if (!newAccessToken) {
          throw new Error("No access token returned");
        }

        // 🔑 Store new access token in memory
        setAccessToken(newAccessToken);

        // 🔁 Retry original request with new token
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed → session is invalid
        clearSession();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

/**
 * =========================================================
 * HOMEPAGE API
 * =========================================================
 * Loads entire homepage in one optimized request
 * Safe: never throws fatal error to UI
 */
export async function getHomepage() {
  try {
    const res = await api.get("/homepage");

    return {
      success: true,
      data: res.data?.data || {
        billboards: [],
        stats: {},
        recent_activity: [],
        h2h_challenges: [],
        categories: {},
        winner_ticker: []
      }
    };
  } catch (error) {
    console.error("[HOMEPAGE_API_ERROR]", error);

    // Safe fallback — homepage never crashes
    return {
      success: false,
      data: {
        billboards: [],
        stats: {},
        recent_activity: [],
        h2h_challenges: [],
        categories: {},
        winner_ticker: []
      }
    };
  }
}

export default api;
