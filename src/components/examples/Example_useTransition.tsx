import { useState, useTransition } from 'react';

export const Example_useTransition = () => {
    const [isPending, startTransition] = useTransition();
    const [count, setCount] = useState(0);
    
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changed = Number(e.target.value);

        startTransition(() => {
            setCount(changed);
        });
    };
    

    return (
      <div>
        {isPending && <p>Loading...</p>}
        <p>You clicked {count} times</p>
        <input type="number" onChange={handleChangeInput} />
        {
            new Array(count * 1000).fill(0).map((_, i) => (
                <p key={i}>{i}</p>
            ))
        }
      </div>
    )
  }