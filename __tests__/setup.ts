import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/',
}))

// Mock the ProjectContext
vi.mock('@/context/project-context', () => ({
  useProjects: () => ({
    projects: [],
    favoriteProjects: [],
    loading: false,
    error: null,
    refreshProjects: vi.fn(),
  }),
}))

