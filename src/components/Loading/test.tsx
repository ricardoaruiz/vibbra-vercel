import { renderWithThemeProvider } from 'utils/test'

import { Loading } from '.'

describe('<Loading />', () => {
  it('should render the heading', () => {
    const { container } = renderWithThemeProvider(<Loading />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
