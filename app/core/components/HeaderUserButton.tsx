import { useMutation } from "next/data-client"
import { Link } from "next/link"
import { Avatar, Button, Menu, MenuItem } from "@mui/material"
import logout from "app/auth/mutations/logout"
import React, { useState } from "react"
import { useCurrentUser } from "../hooks/useCurrentUser"
import GoogleButton from "./GoogleButton"

export const HeaderUserButton = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleLogout = async () => {
    await logoutMutation()
    handleClose()
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      {currentUser ? (
        <Button id="user-avatar" className="focus:outline-none" onClick={handleClick}>
          {currentUser.icon ? (
            <Avatar alt={currentUser.handle} src={currentUser.icon!} />
          ) : (
            <Avatar>{currentUser?.handle?.[0]}</Avatar>
          )}
        </Button>
      ) : (
        <Button
          id="login-button"
          variant="contained"
          className="focus:outline-none"
          onClick={handleClick}
        >
          Login / Signup
        </Button>
      )}
      {currentUser ? (
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose}>
            <Link href="/profile">Profile</Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      ) : (
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem>
            <GoogleButton />
          </MenuItem>
        </Menu>
      )}
    </div>
  )
}
