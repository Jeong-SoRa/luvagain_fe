export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">💝</span>
              <span className="text-white font-black text-xl">LoveAgain</span>
            </div>
            <p className="text-sm text-gray-500">돌싱을 위한 진지한 만남 앱</p>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <a href="mailto:team@loveagain.kr" className="hover:text-white transition-colors">문의하기</a>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-600">
          <span>© 2025 LoveAgain Inc. All rights reserved.</span>
          <span className="bg-gray-800 px-3 py-1 rounded-full font-mono">
            branch: prototype · v0.1.0
          </span>
        </div>
      </div>
    </footer>
  );
}
