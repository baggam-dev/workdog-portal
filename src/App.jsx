import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom'
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

function statusGuide(status) {
  if (status === 'maintenance') return '현재 점검 중입니다. 점검 완료 후 다시 시도해 주세요.'
  if (status === 'disabled') return '현재 비활성화된 앱입니다. 관리자에게 문의해 주세요.'
  return '정상 연결 가능합니다.'
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

              <div className="actions-inline">
                <Link className="btn" to={`/apps/${app.id}`}>
                  상세
                </Link>
                {isEnabled ? (
                  <a className="btn primary" href={app.url} target="_blank" rel="noreferrer">
                    앱 열기
                  </a>
                ) : (
                  <Link className="btn" to={`/apps/${app.id}`}>
                    연결 안내
                  </Link>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function AppDetailPage() {
  const { appId } = useParams()
  const app = appRegistry.find((item) => item.id === appId)

  if (!app) {
    return (
      <section>
        <h1>앱 정보를 찾을 수 없습니다</h1>
        <p className="muted">요청하신 앱 ID가 등록되어 있지 않습니다.</p>
        <Link className="btn" to="/apps">
          앱 목록으로
        </Link>
      </section>
    )
  }

  const isEnabled = app.status === 'active' && !!app.url

  return (
    <section>
      <h1>{app.name}</h1>
      <p className="muted">{app.description}</p>
      <div className="detail-panel">
        <div className="detail-row">
          <span>상태</span>
          <span className={`badge ${app.status}`}>{statusLabel(app.status)}</span>
        </div>
        <div className="detail-row">
          <span>Owner</span>
          <span>{app.owner}</span>
        </div>
        <div className="detail-row">
          <span>Updated</span>
          <span>{app.updatedAt}</span>
        </div>
        <div className="detail-row">
          <span>연결 URL</span>
          <span>{app.url || '미설정'}</span>
        </div>
      </div>

      {isEnabled ? (
        <div className="quick-actions">
          <a className="btn primary" href={app.url} target="_blank" rel="noreferrer">
            앱 열기 (새 탭)
          </a>
          <Link className="btn" to="/apps">
            앱 목록으로
          </Link>
        </div>
      ) : (
        <div className="fallback-box">
          <b>연결 불가 안내</b>
          <p>{statusGuide(app.status)}</p>
          <Link className="btn" to="/apps">
            앱 목록으로
          </Link>
        </div>
      )}
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
        <Route path="/apps/:appId" element={<AppDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default App
