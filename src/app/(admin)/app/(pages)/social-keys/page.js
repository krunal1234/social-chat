'use client'
import Whatsapp from './(components)/Whatsapp/page';
import Twitter from './(components)/Twitter/page';
import LinkedIn from './(components)/LinkedIn/page';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <main>
          <Whatsapp />
          <Twitter />
          <LinkedIn />
      </main>
    </div>
  );
}
