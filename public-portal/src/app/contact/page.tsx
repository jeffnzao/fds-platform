'use client'

import { useState } from 'react'
import { submitContact } from '@/lib/api'
import { toast } from 'react-toastify'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      await submitContact(formData)
      toast.success('Message envoyé avec succès!')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      toast.error('Une erreur est survenue')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Hero */}
      <div className="bg-gray-50 section">
        <div className="container-max">
          <h1>Nous contacter</h1>
        </div>
      </div>

      <div className="section">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Infos */}
            <div>
              <h2 className="mb-8">Nos Coordonnées</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <FiMail className="text-4xl text-fds-green flex-shrink-0" />
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-gray-600">contact@fds-france.org</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <FiPhone className="text-4xl text-fds-green flex-shrink-0" />
                  <div>
                    <h3 className="font-bold">Téléphone</h3>
                    <p className="text-gray-600">+33 (0)1 23 45 67 89</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <FiMapPin className="text-4xl text-fds-green flex-shrink-0" />
                  <div>
                    <h3 className="font-bold">Siège</h3>
                    <p className="text-gray-600">Paris, France</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Prénom"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="border rounded px-4 py-2"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Nom"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="border rounded px-4 py-2"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border rounded px-4 py-2"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Téléphone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
              />

              <input
                type="text"
                name="subject"
                placeholder="Sujet"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full border rounded px-4 py-2"
              />

              <textarea
                name="message"
                placeholder="Votre message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full border rounded px-4 py-2"
              />

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? 'Envoi...' : 'Envoyer'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
