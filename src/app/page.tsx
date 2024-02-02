import Avatar from "@/components/Avatar";
import ChatUI from "@/components/ChatUI";

export default function Home() {
  return (
    <div className="flex items-center h-screen max-h-screen overflow-hidden bg">
      <div className="flex-1 max-h-screen relative">
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
          <img src="poster1.png" className="w-[680px] h-[650px]" />
        </div>
      </div>

      <div className="max-h-screen w-[700px] overflow-scroll">
        <ChatUI />
      </div>
    </div>
  );
}
