import { renderWithThemeProvider } from 'utils/test'

import { Logo } from '.'

describe('<Logo />', () => {
  it('should render correctly', () => {
    const { container } = renderWithThemeProvider(<Logo />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
