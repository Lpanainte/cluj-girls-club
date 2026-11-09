
import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { events } from '../events'
import './AdminDashboard.css'


type Registration = {
  id: string
  event_id: number
  full_name: string
  email: string
  phone: string
  created_at: string
}

type Props = {
  onLogout: () => void
}

function AdminDashboard({ onLogout }: Props) {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadRegistrations = async () => {
      const { data, error } = await supabase
        .from('registrations')
        .select('id, event_id, full_name, email, phone, created_at')
        .order('created_at', { ascending: false })

      if (error) {
        setError('Could not load registrations.')
      } else {
        setRegistrations(data ?? [])
      }

      setLoading(false)
    }

    void loadRegistrations()
  }, [])

  const eventName = (id: number) =>
    events.find(event => event.id === id)?.title ?? `Event #${id}`

  const filtered = registrations.filter(registration => {
    const query = search.toLowerCase()

    return (
      registration.full_name.toLowerCase().includes(query) ||
      registration.email.toLowerCase().includes(query) ||
      eventName(registration.event_id).toLowerCase().includes(query)
    )
  })

  const exportCSV = () => {
    const headers = [
      'Name',
      'Email',
      'Phone',
      'Event',
      'Registration Date',
    ]

    const rows = filtered.map(registration => [
      registration.full_name,
      registration.email,
      registration.phone,
      eventName(registration.event_id),
      new Date(registration.created_at).toLocaleString('ro-RO'),
    ])

    const escapeCSV = (value: string) => {
      const safe = /^[=+\-@\t\r]/.test(value) ? "'" + value : value
      return `"${safe.replace(/"/g, '""')}"`
    }

    const csv = [headers, ...rows]
      .map(row => row.map(escapeCSV).join(','))
      .join('\r\n')

    const blob = new Blob(['\uFEFF', csv], {
      type: 'text/csv;charset=utf-8;',
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'cgc-registrations.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div>
          <span className="eyebrow">CLUB MANAGEMENT</span>
          <h1>CGC Dashboard 🎀</h1>
          <p>Manage your event registrations.</p>
        </div>

        <button onClick={onLogout} className="logout-button">
          Log out
        </button>
      </header>

      <section className="dashboard-stats">
        <div className="dashboard-stat">
          <span>Total registrations</span>
          <strong>{registrations.length}</strong>
        </div>
        <div className="dashboard-stat">
          <span>Events</span>
          <strong>{events.length}</strong>
        </div>
      </section>

      <section className="dashboard-panel">
        <div className="dashboard-toolbar">
          <div>
            <h2>Event registrations</h2>
            <p>View and export your participants.</p>
          </div>

          <div className="dashboard-actions">
            <input
              type="search"
              placeholder="Search registrations..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            <button
              onClick={exportCSV}
              disabled={loading || !!error || filtered.length === 0}
              className="export-button"
            >
              Export CSV ↓
            </button>
          </div>
        </div>

        {loading && <p>Loading registrations...</p>}
        {error && <p role="alert">{error}</p>}

        {!loading && !error && (
          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Event</th>
                  <th>Registered</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map(registration => (
                  <tr key={registration.id}>
                    <td>{registration.full_name}</td>
                    <td>{registration.email}</td>
                    <td>{registration.phone}</td>
                    <td>{eventName(registration.event_id)}</td>
                    <td>
                      {new Date(registration.created_at)
                        .toLocaleDateString('ro-RO')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <p>No registrations found.</p>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

export default AdminDashboard
