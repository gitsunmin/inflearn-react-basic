import { useEffect, useRef, useState } from 'react';

export const Example_useRef = () => {
    const [placeholder, setPlaceholder] = useState('이곳에 입력해주세요.')
    const inputRef = useRef<HTMLInputElement>(null)
  
    useEffect(() => {
      setTimeout(() => {
        inputRef.current?.focus();
        setPlaceholder('빨리좀... 입력해주세요.')
      }, 1000);
    })
  
    return (
      <div>
        <input type="text" placeholder={placeholder} ref={inputRef}/>
      </div>
    )
  }
  