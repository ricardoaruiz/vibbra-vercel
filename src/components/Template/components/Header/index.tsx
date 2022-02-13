import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Logo, CloseIcon, ExitIcon, MenuIcon } from 'components'
import { useAuth } from 'hooks'
import * as S from './styles'

const Header = () => {
  const router = useRouter()
  const { signout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  /**
   *
   */
  const handleSignoutClick = React.useCallback(() => {
    signout()
    router.push('/login')
  }, [router, signout])

  return (
    <S.HeaderContainer>
      <Logo />

      {!isMobileMenuOpen && (
        <MenuIcon
          className="menu_icon"
          onClick={() => setIsMobileMenuOpen((state) => !state)}
        />
      )}
      {isMobileMenuOpen && (
        <CloseIcon
          className="menu_icon"
          onClick={() => setIsMobileMenuOpen((state) => !state)}
        />
      )}

      <S.MobileNav isOpened={isMobileMenuOpen}>
        <S.Menu>
          <S.MenuItem>
            <Link href="/">
              <a>Criar Negociações</a>
            </Link>
          </S.MenuItem>
          <S.MenuItem>
            <Link href="/">
              <a>Minhas Negociações</a>
            </Link>
          </S.MenuItem>
          <S.MenuItem>
            <Link href="/">
              <a>Meus Convites</a>
            </Link>
          </S.MenuItem>
          <S.MenuItem>
            <ExitIcon className="menu_exit" onClick={handleSignoutClick} />
          </S.MenuItem>
        </S.Menu>
      </S.MobileNav>

      <S.DesktopNav>
        <S.Menu>
          <S.MenuItem>
            <Link href="/">
              <a>Criar Negociações</a>
            </Link>
          </S.MenuItem>
          <S.MenuItem>
            <Link href="/">
              <a>Minhas Negociações</a>
            </Link>
          </S.MenuItem>
          <S.MenuItem>
            <Link href="/">
              <a>Meus Convites</a>
            </Link>
          </S.MenuItem>
          <S.MenuItem>
            <ExitIcon className="menu_exit" onClick={handleSignoutClick} />
          </S.MenuItem>
        </S.Menu>
      </S.DesktopNav>
    </S.HeaderContainer>
  )
}

export { Header }
