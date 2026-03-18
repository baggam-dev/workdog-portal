export const appRegistry = [
  {
    id: 'workdog',
    name: 'Workdog Archive',
    description: '문서 관리 및 AI 요약',
    status: 'active',
    url: import.meta.env.VITE_WORKDOG_URL || 'http://168.107.14.124:3030',
    owner: 'Ops Team',
    updatedAt: '2026-03-18',
  },
  {
    id: 'hr-board',
    name: 'HR Board',
    description: '준비 중인 인사 관리 앱',
    status: 'maintenance',
    url: '',
    owner: 'HR Team',
    updatedAt: '2026-03-18',
  },
]
