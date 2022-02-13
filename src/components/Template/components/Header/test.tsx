import { renderWithThemeProvider } from 'utils/test'

import { Header } from '.'

describe('<Header />', () => {
  it('should render the heading', () => {
    const { container } = renderWithThemeProvider(<Header />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
