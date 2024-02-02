import Avatar from "@/components/Avatar";
import ChatUI from "@/components/ChatUI";

export default function Home() {
  return (
    <div className="w-full flex items-center bg-[#000]">
      <div className="flex-1 h-full flex items-center justify-center">
        {/* <div className="">
          <h2 className='font-bold  text-sm text-cyan-500'><span className='text-green-500 font-medium'>Hello</span> UOVT</h2>
          <p className='text-[10px] text-gray-200 -mt-0.5'>University AI Assistant</p>
        </div> */}
        <Avatar isOnline dot userType='ai' />
        <h1 className="ml-5 text-white text-5xl font-black">UOVT AI ChatBot</h1>
      </div>
      <div className="w-[400px]">
        <ChatUI />
      </div>
    </div>
  );
}
