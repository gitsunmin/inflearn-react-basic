import { useEffect, useState } from 'react';


export const Example_useEffect = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('count 값이 변경되었습니다.', count);
  }, [count])

  useEffect(() => {
    console.log('처음 시작했네?');
  }, [])

  const handleLazyCountUp = () => {
    setTimeout(() => {
      setCount(count + 1)
    }, 1000)
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleLazyCountUp}>
        Click me
      </button>
    </div>
  )
}