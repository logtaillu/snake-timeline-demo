import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import SnakeTimeline from '../src/index';
const mockData = new Array(4).fill(0)
  .map((s, idx) => ({
    content: idx ===0?"fdasgasdg": `test aaaa bbbb ccccccc ${idx + 1}`
  }));
const App = () => {
  const [position, setPosition] = useState<"righttop" | "leftbottom" | "alternate">("righttop");
  const [wrap, setWrap] = useState(false);
  const [hoz, setHoz] = useState(false);
  const click = (p: any) => setPosition(p);
  return (
    <div>
      <button onClick={() => setWrap(!wrap)}>{wrap ? "wrap" : "nowrap"}</button>
      <button onClick={() => setHoz(!hoz)}>{hoz ? "horizontal" : "vertical"}</button>
      {["righttop", "leftbottom", "alternate"].map(pos => <button key={pos} onClick={()=>click(pos)}>{pos}</button>)}
      <div style={{ padding: 10, height: 500 }}>
        <SnakeTimeline wrap={wrap} data={mockData} direction={hoz ? "horizontal" : 'vertical'} position={position} />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
