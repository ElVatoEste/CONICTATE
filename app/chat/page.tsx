// app/chat/page.tsx
'use client';

import ChatSidebar from "@/components/ChatSideBar";
export default function ChatOverview() {
  return (
    <div className="flex">
      <ChatSidebar />
      <div className="p-10 text-gray-600">
        <p>Seleccioná un chat para comenzar a conversar.</p>
      </div>
    </div>
  );
}
