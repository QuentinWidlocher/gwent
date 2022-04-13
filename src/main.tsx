import React from 'react'
import ReactDOM from 'react-dom/client'
import { BoardPage } from './pages/board'
import './main.css'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
	<React.StrictMode>
		<BoardPage />
	</React.StrictMode>
)
