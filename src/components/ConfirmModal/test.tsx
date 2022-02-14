import { renderWithThemeProvider } from 'utils/test'

import { ConfirmModal } from '.'

describe('<ConfirmModal />', () => {
  it('should render the heading', () => {
    const { container } = renderWithThemeProvider(<ConfirmModal />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
