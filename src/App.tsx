import './App.css'
import { Example_useEffect } from './components/examples/Example_useEffect'
import { Example_useRef } from './components/examples/Example_useRef'
import { Example_useState } from './components/examples/Example_useState'

function App() {

  return (
    <>
      <h1>안녕하세요. Gitsunmin 입니다.</h1>
      <hr />
      <section>
        <h2>useState</h2>
        <Example_useState />
      </section>
      <hr />
      <section>
        <h2>useEffect</h2>
        <p>아래 예제는 useEffect 함수를 사용하여 데이터를 가져오는 예제입니다.</p>
        <p>데이터를 가져오는 동안 아래 예제에서 화면이 변하지 않습니다.</p>
        <p>아래 예제에서 데이터를 가져오는 동안 화면이 업데이트 됩니다.</p>
        <Example_useEffect />
      </section>
      <hr />
      <section>
        <h2>useRef</h2>
        <p>아래 예제는 useRef 함수를 사용하여 input 필드에 포커싱을 주는 예제입니다.</p>
        <Example_useRef />
      </section>

      <section>
      </section>
    </>
  )
}

export default App
