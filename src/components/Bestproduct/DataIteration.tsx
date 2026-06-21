import React from 'react'

interface DataIterationProps<T> {
  datas?: T[]
  startLength: number
  endLength: number
  children: (props: { datas: T }) => React.ReactNode
}

function DataIteration<T>({ datas = [], startLength, endLength, children }: DataIterationProps<T>) {
  return (
    <>
      {datas.length >= endLength &&
        datas
          .slice(startLength, endLength)
          .map((value, index) => (
            <React.Fragment key={index}>{children({ datas: value })}</React.Fragment>
          ))}
    </>
  )
}

export default DataIteration
