import ChatUI from "@/components/ChatUI";

export default function MobileView() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3 h-screen bg-white rounded shadow-md">
        <ChatUI />
      </div>
    </div>
  )
}