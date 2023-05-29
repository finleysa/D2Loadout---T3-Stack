import { Inter } from 'next/font/google'
import { useState, useEffect, useRef } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [message, setMessage] = useState('');


  const loaded = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loaded.current) {
          return
        }
        loaded.current = true;
        const response = await fetch('/api/manifest');
        const data = await response.json();
        setMessage(JSON.stringify(data));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <main>
      <div>
        {message}
      </div>
    </main>
  )
}
