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

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 7px;
  overflow: auto;
  outline: 0px;
  background: #cbc2c1;
  color: #4c3e3e;
  `,
);

const StyledMenuItem = styled(MenuItemUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  color: #f4b069;
  
  &:hover {
    background: red;
    background-color: red;
    color: #f4b069;
  }

  &:last-of-type {
    border-bottom: none;
  }

  &.${menuItemUnstyledClasses.focusVisible} {
    outline: 1px solid #4c3e3e;
    background-color: #f4b069;
    color: #f4b069;
  }
  
  &.${menuItemUnstyledClasses.disabled} {
    color: #f4b069;
  }

  &:hover:not(.${menuItemUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: #f4b069;
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
    color: #f4b069;
    background: #4c3e3e;
  }

  &:focus {
    border-color: #f4b069;
    outline: 3px solid #4c3e3e};
  }
  `,
);

const Popper = styled(PopperUnstyled)`
  z-index: 190;
`;

export default function UnstyledMenuIntroduction() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isOpen = Boolean(anchorEl);
  const buttonRef = React.useRef(null);
  const menuActions = React.useRef(null);
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
  const dispatch = useDispatch()


  function loggedUserName() {
    if (loggedInUser) {
      return <Link to={`/UserProfile/${loggedInUser._id}`}>
        <h4>
          {loggedInUser.userName.charAt(0).toUpperCase() + loggedInUser.userName.slice(1)}
        </h4 >
      </Link>
    }
  }

  function setLogout(e) {
    if (e) {
      console.log('logingout');
      const actionType = 'logout'
      const blankUser = null
      dispatch(logout(blankUser, actionType))
    }
  }

  function onClickLogout(e) {
    return <Link to="/">
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
    <div>
      <TriggerButton
        type="button"
        onClick={handleButtonClick}
        onKeyDown={handleButtonKeyDown}
        ref={buttonRef}
        aria-controls={isOpen ? 'simple-menu' : undefined}
        aria-expanded={isOpen || undefined}
        aria-haspopup="menu"
      >
        <h4>{loggedUserName()}</h4>
      </TriggerButton>
      <MenuUnstyled
        actions={menuActions}
        open={isOpen}
        onClose={close}
        anchorEl={anchorEl}
        slots={{ root: Popper, listbox: StyledListbox }}
        slotProps={{ listbox: { id: 'simple-menu' } }}
      >
        <StyledMenuItem><Link to={`/UserProfile/${loggedInUser._id}`}>
          <h4>
            {'Profile'}
          </h4 >
        </Link>
        </StyledMenuItem>
        <StyledMenuItem><Link to="/Add-recipe"><div><h4>{'Add recipe'}</h4></div></Link></StyledMenuItem>
        <StyledMenuItem>
          <div>{onClickLogout()}</div>
        </StyledMenuItem>
      </MenuUnstyled>
    </div>
  )
}