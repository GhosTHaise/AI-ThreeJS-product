import React from 'react'

import CustomButton from "./CustomButton";

const AiPicker = ({
  prompt,
  setPrompt,
  generatingImg,
  handleSubmit
}) => {
  return (
    <div className='aipicker-container'>
      <textarea
        placeholder='ask ai ...'
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className='aipicker-textarea'
      />
      <div className='flex flex-wrap gap-3'>
          {generatingImg ? (
              <CustomButton
                type="outline"
                title="Asking AI..."
                customStyles="text-xs"
              />
          ) : (
            <>
              <CustomButton
                type="outline"
                title="AI Full"
                handleSubmit={()=> handleSubmit("full")}
                customStyles="text-xs"
              />
            </>
          )}
      </div>
    </div>
  )
}

export default AiPicker