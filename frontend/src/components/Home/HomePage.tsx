'use client'

import { useState } from 'react'
import { useTestData } from '@/hooks/useTestData'
import { useUsers, useCreateUser } from '@/components/Home/hooks/useUsers'
import { User } from '@/types/api.types'
import styles from '@/app/page.module.scss'

export function HomePage() {
  const [showUsers, setShowUsers] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '' })

  const { data: testData, isLoading: testLoading, error: testError } = useTestData();


  const { data: users, isLoading: usersLoading, error: usersError } = useUsers(showUsers)
  const createUserMutation = useCreateUser()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      await createUserMutation.mutateAsync(formData)
      setFormData({ name: '', email: '' })
      setShowForm(false)
    } catch (error) {
      console.error('Failed to create user:', error)
    }
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Mate Fullstack Template</h1>
        <p className={styles.subtitle}>
          Демонстрація роботи Next.js + React Query + Nest.js + PostgreSQL
        </p>
      </header>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Тестовий ендпоінт</h2>
        {testLoading && <p className={styles.loading}>Завантаження...</p>}
        {testError && (
          <p className={styles.error}>
            Помилка: {testError instanceof Error ? testError.message : 'Невідома помилка'}
          </p>
        )}
        {testData && (
          <div className={styles.testData}>
            <p>
              <strong>Повідомлення:</strong> {testData.message}
            </p>
            <p>
              <strong>Час:</strong> {new Date(testData.timestamp).toLocaleString('uk-UA')}
            </p>
            <p>
              <strong>Статус:</strong> <span className={styles.status}>{testData.status}</span>
            </p>
          </div>
        )}
      </section>

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Дані з PostgreSQL</h2>
          <div className={styles.actions}>
            <button
              onClick={() => setShowUsers(!showUsers)}
              className={styles.button}
              type="button"
            >
              {showUsers ? 'Приховати користувачів' : 'Показати користувачів'}
            </button>
            {showUsers && (
              <button
                onClick={() => setShowForm(!showForm)}
                className={`${styles.button} ${styles.buttonSecondary}`}
                type="button"
              >
                {showForm ? 'Скасувати' : 'Додати користувача'}
              </button>
            )}
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Ім'я:
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email:
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={styles.input}
                required
              />
            </div>
            <button
              type="submit"
              className={styles.button}
              disabled={createUserMutation.isPending}
            >
              {createUserMutation.isPending ? 'Створення...' : 'Створити'}
            </button>
            {createUserMutation.isError && (
              <p className={styles.error}>
                Помилка: {createUserMutation.error?.message || 'Не вдалося створити користувача'}
              </p>
            )}
          </form>
        )}

        {showUsers && (
          <div className={styles.usersSection}>
            {usersLoading && <p className={styles.loading}>Завантаження користувачів...</p>}
            {usersError && (
              <p className={styles.error}>
                Помилка: {usersError instanceof Error ? usersError.message : 'Невідома помилка'}
              </p>
            )}
            {users && (
              <div>
                {users.length === 0 ? (
                  <p className={styles.empty}>Користувачів не знайдено</p>
                ) : (
                  <ul className={styles.userList}>
                    {users.map((user: User) => (
                      <li key={user.id} className={styles.userItem}>
                        <div className={styles.userInfo}>
                          <strong className={styles.userName}>{user.name}</strong>
                          <span className={styles.userEmail}>{user.email}</span>
                        </div>
                        <span className={styles.userDate}>
                          {new Date(user.createdAt).toLocaleDateString('uk-UA')}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Інформація</h2>
        <div className={styles.info}>
          <p>
            <strong>API URL:</strong> {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}
          </p>
          <p>
            Це демонстраційний додаток для вивчення інфраструктури фулстек проектів.
          </p>
          <p className={styles.hint}>
            💡 Відкрийте React Query DevTools (іконка внизу екрану) для перегляду стану запитів
          </p>
        </div>
      </section>
    </main>
  )
}
