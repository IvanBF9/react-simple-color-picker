/* eslint-disable no-inner-declarations */
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
  nativePicker = false,
}: {
  labelOne?: string
  labelTwo?: string
  setColor?: Dispatch<SetStateAction<string>>
  colorList?: string[]
  defaultColor?: string
  noCustomColor?: boolean
  inputClasses?: string
  boxClasses?: string
  nativePicker?: boolean
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

    useEffect(() => {
      if (pickerOpen) {
        createPicker()
      }
    }, [pickerOpen])

    return ref
  }

  const condClass = (cond: string, classes: string) => {
    return `${classes} ${cond}`
  }

  const ref = useOutsideClick(() => {
    setPickerOpen(false)
  })

  function getColorFun(r: number, g: number, b: number) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  function createPicker() {
    const colorBlock = document.getElementById('color-block') as HTMLCanvasElement
    const colorStrip = document.getElementById('color-strip') as HTMLCanvasElement

    if (colorBlock && colorStrip) {
      const ctx1 = colorBlock.getContext('2d')
      const width1 = colorBlock.width
      const height1 = colorBlock.height

      const ctx2 = colorStrip.getContext('2d')
      const width2 = colorStrip.width
      const height2 = colorStrip.height

      let x = 0
      let y = 0
      let drag = false
      let rgbaColor = 'rgba(255,0,0,1)'
      if (ctx1 != null && ctx2 != null) {
        ctx1.rect(0, 0, width1, height1)

        ctx2.rect(0, 0, width2, height2)
        const grd1 = ctx2.createLinearGradient(0, 0, 0, height1)
        grd1.addColorStop(0, 'rgba(255, 0, 0, 1)')
        grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)')
        grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)')
        grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)')
        grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)')
        grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)')
        grd1.addColorStop(1, 'rgba(255, 0, 0, 1)')
        ctx2.fillStyle = grd1
        ctx2.fill()

        const click = (e: { offsetX: number; offsetY: number }) => {
          x = e.offsetX
          y = e.offsetY
          const imageData = ctx2.getImageData(x, y, 1, 1).data
          rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)'
          fillGradient()
        }

        const fillGradient = () => {
          ctx1.fillStyle = rgbaColor
          ctx1.fillRect(0, 0, width1, height1)

          const grdWhite = ctx2.createLinearGradient(0, 0, width1, 0)
          grdWhite.addColorStop(0, 'rgba(255,255,255,1)')
          grdWhite.addColorStop(1, 'rgba(255,255,255,0)')
          ctx1.fillStyle = grdWhite
          ctx1.fillRect(0, 0, width1, height1)

          const grdBlack = ctx2.createLinearGradient(0, 0, 0, height1)
          grdBlack.addColorStop(0, 'rgba(0,0,0,0)')
          grdBlack.addColorStop(1, 'rgba(0,0,0,1)')
          ctx1.fillStyle = grdBlack
          ctx1.fillRect(0, 0, width1, height1)
        }

        fillGradient()

        const mousedown = (e: any) => {
          drag = true
          changeColor(e)
        }

        const mousemove = (e: any) => {
          if (drag) {
            changeColor(e)
          }
        }

        const mouseup = (e: any) => {
          drag = false
        }

        const changeColor = (e: { offsetX: number; offsetY: number }) => {
          x = e.offsetX
          y = e.offsetY
          const imageData = ctx1.getImageData(x, y, 1, 1).data
          rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)'

          setSelectedColor(getColorFun(imageData[0], imageData[1], imageData[2]))
        }

        colorStrip.addEventListener('click', click, false)

        colorBlock.addEventListener('mousedown', mousedown, false)
        colorBlock.addEventListener('mouseup', mouseup, false)
        colorBlock.addEventListener('mousemove', mousemove, false)
      }
    }
  }

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
          {!noCustomColor &&
            (nativePicker ? (
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
            ) : (
              <div className='flex relative w-full' style={{ marginTop: '0.5rem' }}>
                <canvas id='color-strip' style={{ marginRight: '0.5rem' }} height='150' width='30'></canvas>
                <canvas id='color-block' className='w-full' height='150'></canvas>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
