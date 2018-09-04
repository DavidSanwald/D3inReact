import React from 'react'

const Item = ({ name, handleClick }) => <li onClick={handleClick(name)}>{name}</li>

export default Item
