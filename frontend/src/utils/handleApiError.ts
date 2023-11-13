export const handleApiError = (error: any): string => {
  if (error.response) {
    return error.response.data?.detail
  } else if (error.request) {
    return `No response received: ${error.request}`
  } else {
    return `Request error: ${error.message}`
  }
}