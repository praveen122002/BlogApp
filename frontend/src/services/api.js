const API_BASE_URL = "http://127.0.0.1:8000/api"

export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  const data = await response.json()

  return {
    ok: response.ok,
    status: response.status,
    data: data,
  }
} 

export const getBlogs = async () => {
  const accessToken = localStorage.getItem("access_token")

  const response = await fetch(
    `${API_BASE_URL}/blogs/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  const data = await response.json()

  return {
    ok: response.ok,
    status: response.status,
    data: data,
  }
}

export const deleteBlog = async (blogId) => {
  const accessToken = localStorage.getItem("access_token")

  const response = await fetch(
    `${API_BASE_URL}/blogs/${blogId}/`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  return {
    ok: response.ok,
    status: response.status,
  }
}