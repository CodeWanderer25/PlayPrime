import React from 'react'

const Dropdown = ({title , options , func}) => {
  return (
    <div className='select flex items-center '>
      <select defaultValue="0" name="format" id="format" onChange={func}>
        <option value="0" disabled>
            {title}
        </option>

        {
            options.map((o, index) => (
              <option key={index} value={o}>
                {o.toUpperCase()}
              </option>
            ))

  
        }
      </select>
    </div>
  )
}

export default Dropdown
