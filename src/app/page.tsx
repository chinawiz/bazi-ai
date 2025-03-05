'use client'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './page.module.css'

export default function BaziForm() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const formData = new FormData(e.target)
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData))
      })
      
      const { analysis } = await response.json()
      setResult(analysis)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h1>八字分析</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label>
            性别：
            <input type="radio" name="gender" value="male" required /> 男
            <input type="radio" name="gender" value="female" required /> 女
          </label>
          
          <label>
            出生地点：
            <input type="text" name="birthplace" placeholder="如：北京" required />
          </label>
        </div>

        <div className={styles.row}>
          {['year', 'month', 'day'].map(field => (
            <label key={field}>
              {field === 'year' ? '年' : field === 'month' ? '月' : '日'}：
              <input
                type="number"
                name={field}
                min={field === 'year' ? 1900 : 1}
                max={field === 'year' ? 2100 : field === 'month' ? 12 : 31}
                required
              />
            </label>
          ))}
          
          <label>
            时辰：
            <input type="text" name="time" placeholder="如：子时" required />
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? '解析中...' : '开始解析'}
        </button>
      </form>
      
      {result && !loading && (
        <div className={styles.resultBox}>
          <h3>解析结果：</h3>
          <ReactMarkdown>{result}</ReactMarkdown>
        </div>
      )}
    </div>
  )
}
