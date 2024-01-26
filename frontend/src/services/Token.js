export const setToken = (token) => {
    localStorage.setItem('sanctum_token', token)
  }
  
  export const hasToken = () => {
    return localStorage.getItem('sanctum_token')
  }
  
  export const removeToken = () => {
    localStorage.removeItem('sanctum_token')
  }
  
  export const getToken = () => {
    return localStorage.getItem('sanctum_token')
  }
  