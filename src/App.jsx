import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { appRegistry } from './data/apps'
import './App.css'

function Layout({ children }) {
  return (
    <div className="portal-shell">
      <header className="topbar">
        <div className="brand">WORKDOG PORTAL</div>
        <nav className="topnav" aria-label="주요 메뉴">
          <Link to="/">홈</Link>
          <Link to="/apps">앱 목록</Link>
          <Link to="/login">로그인(예정)</Link>
        </nav>
      </header>
      <main className="content">{children}</main>
    </div>
  )
}

function HomePage() {
  return (
    <section>
      <h1>업무 포탈</h1>
      <p className="muted">팀 업무 앱을 한 곳에서 조회하고 연결합니다.</p>
      <div className="quick-actions">
        <Link className="btn primary" to="/apps">
          앱 목록 보기
        </Link>
        <Link className="btn" to="/login">
          로그인(추후 구현)
        </Link>
      </div>
    </section>
  )
}

function LoginPage() {
  return (
    <section>
      <h1>로그인</h1>
      <p className="muted">인증 기능은 추후 구현 예정입니다.</p>
      <button className="btn" type="button" disabled>
        로그인 준비중
      </button>
    </section>
  )
}

function statusLabel(status) {
  if (status === 'active') return '사용 가능'
  if (status === 'maintenance') return '점검 중'
  return '비활성'
}

function AppListPage() {
  return (
    <section>
      <h1>앱 목록</h1>
      <p className="muted">앱 연결은 현재 새 탭으로 열립니다.</p>

      <div className="app-grid">
        {appRegistry.map((app) => {
          const isEnabled = app.status === 'active' && !!app.url
          return (
            <article className="app-card" key={app.id}>
              <div className="app-header">
                <h2>{app.name}</h2>
                <span className={`badge ${app.status}`}>{statusLabel(app.status)}</span>
              </div>
              <p className="desc">{app.description}</p>
              <div className="meta">Owner: {app.owner}</div>
              <div className="meta">Updated: {app.updatedAt}</div>

              {isEnabled ? (
                <a className="btn primary" href={app.url} target="_blank" rel="noreferrer">
                  앱 열기
                </a>
              ) : (
                <div className="notice">현재 연결할 수 없는 앱입니다. (URL 미설정 또는 점검 중)</div>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/apps" element={<AppListPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default App
