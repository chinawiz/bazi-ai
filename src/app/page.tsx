'use client'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './page.module.css'

export default function BaziForm() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.target)
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        year: formData.get('year'),
        month: formData.get('month'),
        day: formData.get('day'),
        time: formData.get('time'),
        gender: formData.get('gender'),
        birthplace: formData.get('birthplace')
      })
    })
    
    const data = await response.json()
    setResult(data.analysis)
    setLoading(false)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>八字分析</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>性别：</label>
            <div className={styles.radioGroup}>
              <label><input type="radio" name="gender" value="male" required /> 男</label>
              <label><input type="radio" name="gender" value="female" required /> 女</label>
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>出生地点：</label>
            <input type="text" name="birthplace" placeholder="如：北京" required className={styles.input} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>出生年份：</label>
            <input type="number" name="year" min="1900" max="2100" required className={styles.input} />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>月份：</label>
            <input type="number" name="month" min="1" max="12" required className={styles.input} />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>日期：</label>
            <input type="number" name="day" min="1" max="31" required className={styles.input} />
          </div>
          <div className={styles.field}>
            <label className={styles.fieldLabel}>时辰：</label>
            <input type="text" name="time" placeholder="如：子时" required className={styles.input} />
          </div>
        </div>

        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? (
            <span className={styles.loadingText}>
              解析中
              <span className={styles.dotOne}>.</span>
              <span className={styles.dotTwo}>.</span>
              <span className={styles.dotThree}>.</span>
            </span>
          ) : '开始解析'}
        </button>
      </form>
      
      {loading && (
        <div className={styles.loadingBox}>
          <div className={styles.spinner}></div>
          <p>正在分析命理，请稍候...</p>
        </div>
      )}
      
      {result && !loading && (
        <div className={styles.resultBox}>
          <h3>解析结果：</h3>
          <div className={styles.markdownContent}>
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  )
}
