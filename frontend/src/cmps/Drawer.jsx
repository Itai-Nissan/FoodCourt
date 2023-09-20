import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import { Link } from "react-router-dom"

export const TemporaryDrawer = (props) => {
  const [state, setState] = React.useState({
    right: false,
  })

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {
          <div className="header-routes">
            <Link to="/"
            >
              <h4>Home</h4>
            </Link>
            <Link to="/ExplorRecipes">
              <h4>Recipes</h4>
            </Link>
            {props.loggedInUser ?
              <Link to={`/UserProfile/${props.loggedInUser._id}`}>
                <h4>{props.loggedInUser.userName}</h4>
              </Link> : null
            }
            {
              props.isLoggedIn() ? 
              <>{props.loggedUserName()}</> : null
            }
            <Link to="/Signup">
              <div>{props.isLoggedIn()}</div>
            </Link>
          </div>
        }
      </List>
      <Divider />
    </Box>
  )

  return (
    <div>
      {
        <React.Fragment key={'right'}>
          <Button onClick={toggleDrawer('right', true)}>
            {<img src="https://res.cloudinary.com/counditai/image/upload/v1695207312/Cutting-board/icons/hamburger-svgrepo-com_l03g7b.png" alt="" />}
            </Button>
          <Drawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
          >
            {list('right')}
          </Drawer>
        </React.Fragment>
      }
    </div>
  )
}