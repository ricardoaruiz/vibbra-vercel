import { renderWithThemeProvider } from 'utils/test'
import { Button } from '.'

describe('<Button />', () => {
  it('should render the heading', () => {
    const { container } = renderWithThemeProvider(<Button />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
