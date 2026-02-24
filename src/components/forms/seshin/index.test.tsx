import { render, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import SeshForm from '.'

const products = [{ id: 'p1', name: 'Product 1' }]

describe('SeshForm', () => {
  it('calls onCreate with provided values', () => {
    const onCreate = vi.fn()
    const onCancel = vi.fn()
    const { container, getByText } = render(
      <SeshForm products={products} onCancel={onCancel} onCreate={onCreate} />,
    )

    const ionRating = container.querySelector(
      'ion-input[type="number"]',
    ) as HTMLElement
    fireEvent(
      ionRating,
      new CustomEvent('ionChange', { detail: { value: '4' } }),
    )

    const ionNotes = container.querySelector('ion-textarea') as HTMLElement
    fireEvent(
      ionNotes,
      new CustomEvent('ionChange', { detail: { value: 'Good effects' } }),
    )

    const createBtn = getByText('Create')
    fireEvent.click(createBtn)

    expect(onCreate).toHaveBeenCalledTimes(1)
    expect(onCreate).toHaveBeenCalledWith('p1', 4, 'Good effects')
  })
})
