import { renderWithThemeProvider } from 'utils/test'

import { Input } from '.'

describe('<Input />', () => {
  it('should render the heading', () => {
    const { container } = renderWithThemeProvider(<Input />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
