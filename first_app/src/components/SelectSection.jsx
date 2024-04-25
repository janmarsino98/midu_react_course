import React from 'react'

const SelectSection = () => {
    const[forYouSelected, setForYouSelected] = useState(true)
  return (
    <div className='selectionSection'>
        <div className="selectionOption">
            <span>
                Para ti
            </span>
            <span>
                Siguiendo
            </span>
        </div>
        <div className="selectionOption"></div>
    </div>
  )
}

export default SelectSection