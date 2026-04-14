import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Articles
export const getArticles = async (category?: string) => {
  const params = category ? { category } : {}
  const res = await api.get('/articles', { params })
  return res.data
}

export const getArticleBySlug = async (slug: string) => {
  const res = await api.get(`/articles/${slug}`)
  return res.data
}

export const getFeaturedArticles = async () => {
  const res = await api.get('/articles?featured=true')
  return res.data
}

// Publications
export const getPublications = async (type?: string) => {
  const params = type ? { type } : {}
  const res = await api.get('/publications', { params })
  return res.data
}

export const getPublicationBySlug = async (slug: string) => {
  const res = await api.get(`/publications/${slug}`)
  return res.data
}

// Events
export const getPublicEvents = async () => {
  const res = await api.get('/public-events')
  return res.data
}

export const getPublicEventBySlug = async (slug: string) => {
  const res = await api.get(`/public-events/${slug}`)
  return res.data
}

export const registerForEvent = async (eventId: string, data: any) => {
  const res = await api.post(`/public-events/${eventId}/register`, data)
  return res.data
}

// Newsletter
export const subscribeToNewsletter = async (email: string, name?: string) => {
  const res = await api.post('/newsletter/subscribe', { email, name })
  return res.data
}

// Contact
export const submitContact = async (data: any) => {
  const res = await api.post('/contact', data)
  return res.data
}

// Membership
export const submitMembership = async (data: any) => {
  const res = await api.post('/membership', data)
  return res.data
}

export default api
