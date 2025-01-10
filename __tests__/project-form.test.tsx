import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { ProjectForm } from '@/components/project-form'

describe('ProjectForm', () => {
  const mockOnSubmit = vi.fn()
  const defaultProps = {
    onSubmit: mockOnSubmit,
    submitLabel: 'Create',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all form fields', () => {
    render(<ProjectForm {...defaultProps} />)

    expect(screen.getByLabelText(/project id/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/project name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/start date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/end date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/project manager/i)).toBeInTheDocument()
  })

  it('shows validation errors', async () => {
    render(<ProjectForm {...defaultProps} />)

    await fireEvent.click(screen.getByRole('button', { name: /create/i }))

    expect(await screen.findByText(/project id is required/i)).toBeInTheDocument()
    expect(await screen.findByText(/project name is required/i)).toBeInTheDocument()
    expect(await screen.findByText(/description is required/i)).toBeInTheDocument()
  })

  it('submits form with valid data', async () => {
    render(<ProjectForm {...defaultProps} />)

    await fireEvent.change(screen.getByLabelText(/project id/i), {
      target: { value: 'test_project' },
    })
    await fireEvent.change(screen.getByLabelText(/project name/i), {
      target: { value: 'Test Project' },
    })
    await fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'Test Description' },
    })
    await fireEvent.change(screen.getByLabelText(/project manager/i), {
      target: { value: 'John Doe' },
    })

    // Mock date selections
    const startDateButton = screen.getByRole('button', { name: /select start date/i })
    await fireEvent.click(startDateButton)
    const startDate = screen.getByRole('button', { name: /january 1, 2025/i })
    await fireEvent.click(startDate)

    const endDateButton = screen.getByRole('button', { name: /select end date/i })
    await fireEvent.click(endDateButton)
    const endDate = screen.getByRole('button', { name: /december 31, 2025/i })
    await fireEvent.click(endDate)

    await fireEvent.click(screen.getByRole('button', { name: /create/i }))

    expect(mockOnSubmit).toHaveBeenCalledWith({
      id: 'test_project',
      name: 'Test Project',
      description: 'Test Description',
      startDate: expect.any(String),
      endDate: expect.any(String),
      projectManager: 'John Doe',
    })
  })
})

