import { render, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ProductForm from '.'

const brands = [{ id: 'b1', name: 'Brand 1' }]

describe('ProductForm', () => {
  it('calls onCreate with provided values', () => {
    const onCreate = vi.fn()
    const onCancel = vi.fn()
    const { container, getByText } = render(
      <ProductForm brands={brands} onCancel={onCancel} onCreate={onCreate} />,
    )

    const ionName = container.querySelector('ion-input') as HTMLElement
    fireEvent(
      ionName,
      new CustomEvent('ionChange', { detail: { value: 'My Product' } }),
    )

    const ionDesc = container.querySelector('ion-textarea') as HTMLElement
    fireEvent(
      ionDesc,
      new CustomEvent('ionChange', { detail: { value: 'A nice product' } }),
    )

    const createBtn = getByText('Create')
    fireEvent.click(createBtn)

    expect(onCreate).toHaveBeenCalledTimes(1)
    expect(onCreate).toHaveBeenCalledWith('My Product', 'b1', 'A nice product')
  })
})
