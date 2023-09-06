import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { logout } from '../store/actions/userActions'

import MenuUnstyled from '@mui/base/MenuUnstyled';
import MenuItemUnstyled, {
  menuItemUnstyledClasses,
} from '@mui/base/MenuItemUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';

// const blue = {
//   100: '#DAECFF',
//   200: '#99CCF3',
//   400: '#3399FF',
//   500: '#007FFF',
//   600: '#0072E5',
//   900: '#003A75',
// };

// const grey = {
//   50: '#f6f8fa',
//   100: '#eaeef2',
//   200: '#d0d7de',
//   300: '#afb8c1',
//   400: '#8c959f',
//   500: '#6e7781',
//   600: '#57606a',
//   700: '#424a53',
//   800: '#32383f',
//   900: '#24292f',
// };

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-size: 0.7rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  // min-width: 200px;
  border-radius: 7px;
  overflow: auto;
  outline: 0px;
  background: #f4b069;
  color: #4c3e3e;
  `,
)

const StyledMenuItem = styled(MenuItemUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  // color: #65e311;
  // background: #65e311;
  // background-color: #65e311;
  
  &:hover {
  //   background: #65e311;
  //   background-color: #65e311;
  //   color: #f4b069;
  // }

  // &:last-of-type {
  //   border-bottom: none;
  // }
  &:active{
    // background-color: #65e311;
    // color: #65e311;

  // }

  // &.${menuItemUnstyledClasses.focusVisible} {
  //   outline: 1px solid #4c3e3e;
  //   background-color: #65e311;
  //   color: #65e311;
  // }
  
  // &.${menuItemUnstyledClasses.disabled} {
  //   color: #65e311;
  // }

  &:hover:not(.${menuItemUnstyledClasses.disabled}) {
  //   background-color: #f4b069;
  //   color: #65e311;
  }
  `,
);

const TriggerButton = styled('div')(
  ({ theme }) => `
  cursor: pointer;
  border-radius: 7px;
  border: none;
  color: #4c3e3e;
  
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    // color: $darker-text;
    // border-bottom: 1px solid $light-wood;
  }

  &:focus {
    // border-color: #f4b069;
    // outline: 3px solid #4c3e3e};
  }
  `,
);

const Popper = styled(PopperUnstyled)`
  z-index: 190;
`;

export const Dropdown = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isOpen = Boolean(anchorEl);
  const buttonRef = React.useRef(null);
  const menuActions = React.useRef(null);
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
  const dispatch = useDispatch()

  function loggedUserName() {
      return <>
        {loggedInUser.userName ? loggedInUser.userName.charAt(0).toUpperCase() + loggedInUser.userName.slice(1) : null}
      </ >
  }

  function setLogout(e) {
    if (e) {
      const actionType = 'logout'
      const blankUser = null
      dispatch(logout(blankUser, actionType))
    }
  }

  function onClickLogout(e) {
    return <Link to="/LogIn">
      <h4 onClick={setLogout}>
        Logout
      </h4>
    </Link>
  }

  const handleButtonClick = (event) => {
    if (isOpen) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleButtonKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
      if (event.key === 'ArrowUp') {
        menuActions.current?.highlightLastItem();
      }
    }
  };

  const close = () => {
    setAnchorEl(null);
    buttonRef.current.focus();
  }

  return (
    <div className='dropdown-menu'>
      <TriggerButton
        type="button"
        onClick={handleButtonClick}
        onKeyDown={handleButtonKeyDown}
        ref={buttonRef}
        aria-controls={isOpen ? 'simple-menu' : undefined}
        aria-expanded={isOpen || undefined}
        aria-haspopup="menu"
      >
        <h4 className='cool-link'>{loggedUserName()}</h4>
      </TriggerButton>
      <MenuUnstyled
        actions={menuActions}
        open={isOpen}
        onClose={close}
        onClick={close}
        anchorEl={anchorEl}
        slots={{ root: Popper, listbox: StyledListbox }}
        slotProps={{ listbox: { id: 'simple-menu' } }}
      >
        <StyledMenuItem>
          <Link to={`/UserProfile/${loggedInUser._id}`}>
            <h4>{'Profile'}</h4 >
          </Link>
        </StyledMenuItem>
        <StyledMenuItem>
          <Link to="/Add-recipe">
            <h4>{'Add recipe'}</h4>
          </Link>
        </StyledMenuItem>
        <StyledMenuItem>
          <>{onClickLogout()}</>
        </StyledMenuItem>
      </MenuUnstyled>
    </div>
  )
}