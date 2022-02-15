import { LoadIcon } from 'components'
import { LoadingProps } from './types'

import * as S from './styles'

const Loading: React.VFC<LoadingProps> = ({ isShow = false }) => (
  <S.LoadingWrapper isShow={isShow}>
    <LoadIcon />
  </S.LoadingWrapper>
)

export { Loading }
