'use client'
import Whatsapp from './(components)/Whatsapp/page';
import Instagram from './(components)/Instagram/page';
import Messanger from './(components)/Messenger/page';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <main>
          <Whatsapp />
          <Instagram />
          <Messanger />
      </main>
    </div>
  );
}
