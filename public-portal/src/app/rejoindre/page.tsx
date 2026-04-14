'use client'

import { useState } from 'react'
import { submitMembership } from '@/lib/api'
import { toast } from 'react-toastify'

export default function RejoindrePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    pole: '',
    type: 'ADHESION',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      await submitMembership(formData)
      toast.success('Votre demande a été soumise avec succès!')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        pole: '',
        type: 'ADHESION',
      })
    } catch (error) {
      toast.error('Une erreur est survenue')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="section">
      <div className="container-max max-w-2xl">
        <h1 className="mb-4">Rejoindre le FDS</h1>
        <p className="text-lg text-gray-600 mb-12">
          Devenir membre, volontaire ou supporter du Front Démocratique et Social
        </p>

        <form onSubmit={handleSubmit} className="card">
          <div className="grid grid-cols-2 gap-4 mb-4">
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
            className="w-full border rounded px-4 py-2 mb-4"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Téléphone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 mb-4"
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 mb-4"
          >
            <option value="ADHESION">Adhésion</option>
            <option value="VOLONTAIRE">Volontaire</option>
          </select>

          <select
            name="pole"
            value={formData.pole}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 mb-6"
          >
            <option value="">Sélectionner un pôle</option>
            <option value="Diaspora">Diaspora & Retour</option>
            <option value="Economie">Économie & Entrepreneuriat</option>
            <option value="Social">Social & Solidarité</option>
            <option value="Communication">Communication</option>
            <option value="Citoyennete">Citoyenneté & Droits</option>
            <option value="Institutions">Institutions</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Envoi...' : 'Soumettre mon adhésion'}
          </button>
        </form>
      </div>
    </div>
  )
}
