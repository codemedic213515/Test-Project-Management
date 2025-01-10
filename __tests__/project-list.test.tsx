import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import ProjectList from '@/app/page'
import { useProjects } from '@/context/project-context'
import { toggleFavorite } from '@/lib/api'

// Mock the modules
vi.mock('@/context/project-context')
vi.mock('@/lib/api')

const mockProjects = [
  {
    id: 'project_1',
    name: 'Test Project 1',
    description: 'Test Description 1',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    projectManager: 'John Doe',
    isFavorite: false,
  },
]

describe('ProjectList', () => {
  beforeEach(() => {
    vi.mocked(useProjects).mockReturnValue({
      projects: mockProjects,
      favoriteProjects: [],
      loading: false,
      error: null,
      refreshProjects: vi.fn(),
    })
  })

  it('renders loading state', () => {
    vi.mocked(useProjects).mockReturnValue({
      projects: [],
      favoriteProjects: [],
      loading: true,
      error: null,
      refreshProjects: vi.fn(),
    })

    render(<ProjectList />)
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Create Project' })).toBeInTheDocument()
  })

  it('renders error state', () => {
    vi.mocked(useProjects).mockReturnValue({
      projects: [],
      favoriteProjects: [],
      loading: false,
      error: 'Failed to load projects',
      refreshProjects: vi.fn(),
    })

    render(<ProjectList />)
    expect(screen.getByText('Error loading projects')).toBeInTheDocument()
    expect(screen.getByText('Failed to load projects')).toBeInTheDocument()
  })

  it('renders project list', () => {
    render(<ProjectList />)
    expect(screen.getByText('Test Project 1')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('handles favorite toggle', async () => {
    const mockToggleFavorite = vi.mocked(toggleFavorite)
    const mockRefreshProjects = vi.fn()
    
    vi.mocked(useProjects).mockReturnValue({
      projects: mockProjects,
      favoriteProjects: [],
      loading: false,
      error: null,
      refreshProjects: mockRefreshProjects,
    })

    render(<ProjectList />)
    
    const favoriteButton = screen.getByRole('button', { name: /toggle favorite/i })
    await fireEvent.click(favoriteButton)

    expect(mockToggleFavorite).toHaveBeenCalledWith('project_1')
    expect(mockRefreshProjects).toHaveBeenCalled()
  })
})

