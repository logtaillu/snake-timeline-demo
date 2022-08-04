import React from 'react'
import ReactDOM from 'react-dom/client'
import SnakeTimeline from '../src/index';
const mockData = new Array(20).fill(0)
  .map((s, idx) => ({
    content: `test aaaa bbbb ccccccc ${idx + 1}`
}));
const App = () => {
  return (
    <div style={{padding: 10, height: 400}}>
      <SnakeTimeline wrap={true} data={mockData} direction="vertical" itemWidth={150} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
