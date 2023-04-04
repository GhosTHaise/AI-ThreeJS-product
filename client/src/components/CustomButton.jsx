import React from 'react'

const CustomButton = ({title,type,handleClick}) => {
  return (
    <button
        className={`px-2`}
        type={type}
    >
        {title}
    </button>
  )
}

export default CustomButton