import * as React from 'react'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

export default function SimpleColorPicker({
  colorList,
  labelOne,
  labelTwo,
  defaultColor,
  setColor,
  noCustomColor,
  inputClasses,
  boxClasses,
}: {
  labelOne?: string
  labelTwo?: string
  setColor?: Dispatch<SetStateAction<string>>
  colorList?: string[]
  defaultColor?: string
  noCustomColor?: boolean
  inputClasses?: string
  boxClasses?: string
}) {
  const [selectedColor, setSelectedColor] = useState(defaultColor || '#77dd77')
  const [pickerOpen, setPickerOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(1)
  const [colorsList] = useState(
    colorList || [
      '#77dd77',
      '#836953',
      '#89cff0',
      '#99c5c4',
      '#9adedb',
      '#aa9499',
      '#aaf0d1',
      '#b2fba5',
      '#b39eb5',
      '#bdb0d0',
      '#bee7a5',
      '#befd73',
      '#c1c6fc',
      '#c6a4a4',
      '#cb99c9',
      '#fdfd96',
      '#ff6961',
      '#ff694f',
      '#ff9899',
      '#ffb7ce',
      '#ca9bf7',
    ],
  )

  useEffect(() => {
    if (setColor != undefined) {
      setColor(selectedColor)
    }
  }, [selectedColor])

  const useOutsideClick = (callback: { (): void; (): void }) => {
    const ref = useRef(null)

    useEffect(() => {
      const handleClick = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback()
        }
      }

      document.addEventListener('click', handleClick)

      return () => {
        document.removeEventListener('click', handleClick)
      }
    }, [ref])

    return ref
  }

  const condClass = (cond: string, classes: string) => {
    return `${classes} ${cond}`
  }

  const ref = useOutsideClick(() => {
    setPickerOpen(false)
  })
  return (
    <div ref={ref} className='color-picker-ct w-full max-w-xs'>
      <button
        onClick={() => {
          return setPickerOpen(!pickerOpen)
        }}
        className={`input input-bordered input-primary w-full max-w-xs flex items-center cursor-pointer justify-between ${inputClasses}`}
      >
        <label className='text-gray-500'>{labelOne || 'Select color'}</label>
        <div style={{ backgroundColor: selectedColor }} className='h-6 w-12'></div>
      </button>
      {pickerOpen && (
        <div
          className={`absolute z-50 rounded-box w-full max-w-xs flex flex-col items-center shadow-md bg-base-100 overflow-hidden p-2 ${boxClasses}`}
        >
          <div className='flex flex-wrap overflow-y-auto justify-center scrollbar h-20'>
            {colorsList.map((color) => (
              <button
                className={condClass(
                  color == selectedColor ? 'border-primary' : '',
                  'h-8 w-8 rounded-full m-1 shadow-sm border border-base-content cursor-pointer hover:border-primary',
                )}
                key={color}
                onClick={() => {
                  setSelectedColor(color)
                  setRefreshKey((old) => old + 1)
                }}
                style={{ backgroundColor: color }}
              ></button>
            ))}
          </div>
          {!noCustomColor && (
            <div className='relative w-full bg-base-300 h-10 overflow-hidden'>
              <label
                htmlFor='color-picker'
                className='text-gray-500 z-30 absolute h-full w-full flex items-center pl-2'
              >
                {labelTwo || 'Select custom color'}
              </label>
              <input
                className='w-full h-full border-none absolute z-20'
                id='color-picker'
                type='color'
                key={refreshKey}
                defaultValue={selectedColor}
                onChange={({ target }) => setSelectedColor(target.value)}
              ></input>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
