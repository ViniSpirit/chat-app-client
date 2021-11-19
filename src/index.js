import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Join from "./components/Join/Join"
import Chat from "./components/Chat/Chat"

const rootElement = document.getElementById("root")

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" exact element={<Join />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  </Router>,
  rootElement
)
