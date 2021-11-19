import React, { useState, useEffect } from "react"
import "./Chat.css"
import queryString from "query-string"
import { formatWindowLocationSearch } from "../../utils/formatWindowLocation"
import io from "socket.io-client"

import InfoBar from "../InfoBar/InfoBar"
import Input from "../Input/Input"
import Messages from "../Messages/Messages"
import TextContainer from "../TextContainer/TextContainer"

let socket

const ENDPOINT = "https://vini-chat-app-backend.herokuapp.com/"

const Chat = () => {
  const [name, setName] = useState("")
  const [room, setRoom] = useState("")
  const [users, setUsers] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search)

    socket = io(ENDPOINT)

    setRoom(room)
    setName(name)

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error)
      }
    })
  }, [ENDPOINT, window.location.search])

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message])
    })

    socket.on("roomData", ({ users }) => {
      setUsers(users)
    })
  }, [])

  const sendMessage = (event) => {
    event.preventDefault()

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""))
    }
  }

  console.log(message, messages)

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  )
}

export default Chat
