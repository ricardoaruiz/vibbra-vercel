import { renderWithThemeProvider } from 'utils/test'

import { Template } from '.'

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn()
  })
}))

describe('<Template />', () => {
  it('should render the heading', () => {
    const { container } = renderWithThemeProvider(<Template />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
