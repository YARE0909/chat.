'use client';
import React from 'react';
import { Sidebar } from '@/components/Sidebar';

export default function Home() {
  const [micOn, setMicOn] = React.useState(true);
  const [videoOn, setVideoOn] = React.useState(true);

  return (
    <main className="relative flex p-4">
      <Sidebar />
      <div>
        <h1 className='text-white font-bold text-5xl'>WELCOME, John Doe</h1>
      </div>
    </main>
  );
}
