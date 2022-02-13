import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { Logo, CloseIcon, ExitIcon, MenuIcon } from 'components'
import { useAuth } from 'hooks'
import { MENU_ITEMS } from './constants'

import * as S from './styles'

const Header = () => {
  const router = useRouter()
  const { signout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  /**
   *
   */
  const handleItemMenuClick = React.useCallback(
    (href: string, isMobile: boolean) => {
      setTimeout(
        () => {
          router.push(href)
        },
        isMobile ? 300 : 0
      )

      setIsMobileMenuOpen(false)
    },
    [router]
  )

  /**
   *
   */
  const handleSignoutClick = React.useCallback(() => {
    signout()
    router.push('/login')
  }, [router, signout])

  /**
   *
   */
  const renderMenuIcons = React.useCallback(() => {
    return !isMobileMenuOpen ? (
      <MenuIcon
        className="menu_icon"
        onClick={() => setIsMobileMenuOpen(true)}
      />
    ) : (
      <CloseIcon
        className="menu_icon"
        onClick={() => setIsMobileMenuOpen(false)}
      />
    )
  }, [isMobileMenuOpen])

  /**
   *
   */
  const renderMenu = React.useCallback(
    (isMobile = true) => {
      return (
        <S.Menu>
          {MENU_ITEMS.map(({ id, href, label }) => (
            <S.MenuItem key={id}>
              {/* <Link href={href}> */}
              <a onClick={() => handleItemMenuClick(href, isMobile)}>{label}</a>
              {/* </Link> */}
            </S.MenuItem>
          ))}
          <S.MenuItem>
            <ExitIcon className="menu_exit" onClick={handleSignoutClick} />
          </S.MenuItem>
        </S.Menu>
      )
    },
    [handleItemMenuClick, handleSignoutClick]
  )

  return (
    <S.HeaderContainer>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>

      {renderMenuIcons()}
      <S.MobileNav isOpened={isMobileMenuOpen}>{renderMenu()}</S.MobileNav>
      <S.DesktopNav>{renderMenu(false)}</S.DesktopNav>
    </S.HeaderContainer>
  )
}

export { Header }