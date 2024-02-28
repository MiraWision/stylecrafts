import { useState } from 'react';
import { Button } from 'primereact/button';

import { Logo } from '@/components/common/logo';

function Home() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <Logo />
      {/* <Button label="Click" icon="pi pi-plus" onClick={e => setCount(count + 1)}></Button> */}
      {/* <div className="text-2xl text-900 mt-3">{count}</div> */}
    </div>
  );
}

export default Home;
