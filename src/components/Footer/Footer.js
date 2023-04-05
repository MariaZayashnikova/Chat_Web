import React from 'react'

function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <div>©2021 - {year} Maria_Zaya/Maria Zayashnikova</div>
        </footer>
    )
}

export default Footer
