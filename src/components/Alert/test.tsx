import { renderWithThemeProvider } from 'utils/test'

import { Alert } from '.'

describe('<Alert />', () => {
  it('should render the heading', () => {
    const { container } = renderWithThemeProvider(
      <Alert message="Altert message" />
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
