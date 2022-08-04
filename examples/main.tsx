import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import SnakeTimeline from '../src/index';
const mockData = new Array(5).fill(0)
  .map((s, idx) => ({
    content: `test aaaa bbbb ccccccc ${idx + 1}`
  }));
const App = () => {
  const [position, setPosition] = useState<"righttop" | "leftbottom" | "alternate">("alternate");
  const [wrap, setWrap] = useState(false);
  const [hoz, setHoz] = useState(true);
  const click = (p: any) => setPosition(p);
  return (
    <div>
      <button onClick={() => setWrap(!wrap)}>{wrap ? "wrap" : "nowrap"}</button>
      <button onClick={() => setHoz(!hoz)}>{hoz?"horizontal":"vertical"}</button>
      {["righttop", "leftbottom", "alternate"].map(pos => <button key={pos} onClick={()=>click(pos)}>{pos}</button>)}
      <div style={{ padding: 10, height: 600 }}>
        <SnakeTimeline wrap={wrap} data={mockData} direction={hoz ? "horizontal":'vertical' } position={position} />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
