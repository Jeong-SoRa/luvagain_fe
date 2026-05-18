"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ThemeProvider } from "@/components/ThemeContext";
import SplashScreen from "@/components/screens/SplashScreen";
import BottomNav from "@/components/BottomNav";
import DiscoverScreen from "@/components/screens/DiscoverScreen";
import ProfileDetailScreen from "@/components/screens/ProfileDetailScreen";
import InboxScreen from "@/components/screens/InboxScreen";
import ChatScreen from "@/components/screens/ChatScreen";
import MyProfileScreen from "@/components/screens/MyProfileScreen";
import MatchModal from "@/components/screens/MatchModal";
import ThemeSelector from "@/components/ThemeSelector";
import type { Profile } from "@/components/data/profiles";

type MainScreen = "discover" | "inbox" | "myprofile";
type SubScreen = "profile-detail" | "chat" | null;

function AppInner() {
  const [splashDone, setSplashDone] = useState(false);
  const [mainScreen, setMainScreen] = useState<MainScreen>("discover");
  const [subScreen, setSubScreen] = useState<SubScreen>(null);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);

  // 보류된 프로필 목록
  const [heldProfiles, setHeldProfiles] = useState<Profile[]>([]);
  // Throw된 채팅 ID (해당 ID는 채팅 입장 시 throw 상태로 보여줌)
  const [thrownIds, setThrownIds] = useState<number[]>([]);

  function goToChat(p: Profile) {
    setSelectedProfile(p);
    setSubScreen("chat");
    setMatchedProfile(null);
  }

  function handleLike(p: Profile) {
    setSubScreen(null);
    setSelectedProfile(null);
    setMatchedProfile(p);
  }

  function handleHold(p: Profile) {
    setHeldProfiles((prev) => prev.find((h) => h.id === p.id) ? prev : [...prev, p]);
  }

  function handleLikeHeld(p: Profile) {
    setHeldProfiles((prev) => prev.filter((h) => h.id !== p.id));
    setMatchedProfile(p);
  }

  function handlePassHeld(p: Profile) {
    setHeldProfiles((prev) => prev.filter((h) => h.id !== p.id));
  }

  function handleThrow(id: number) {
    setThrownIds((prev) => [...prev, id]);
  }

  function handleMainNav(s: MainScreen) {
    setMainScreen(s);
    setSubScreen(null);
    setSelectedProfile(null);
  }

  return (
    <div
      className="relative bg-white overflow-hidden flex flex-col"
      style={{
        width: "min(390px, 100vw)",
        height: "min(844px, 100dvh)",
        borderRadius: "clamp(0px, 3vw, 44px)",
        boxShadow: "0 32px 64px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.06)",
      }}
    >
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}

      <div className="flex-1 overflow-hidden relative">
        {subScreen === "profile-detail" && selectedProfile ? (
          <ProfileDetailScreen
            profile={selectedProfile}
            onBack={() => { setSubScreen(null); setSelectedProfile(null); }}
            onLike={handleLike}
            onPass={() => { setSubScreen(null); setSelectedProfile(null); }}
          />
        ) : subScreen === "chat" && selectedProfile ? (
          <ChatScreen
            profile={selectedProfile}
            onBack={() => { setSubScreen(null); setSelectedProfile(null); }}
            onThrow={handleThrow}
            isSaved={false}
          />
        ) : mainScreen === "discover" ? (
          <DiscoverScreen
            onViewProfile={(p) => { setSelectedProfile(p); setSubScreen("profile-detail"); }}
            onMatch={setMatchedProfile}
            onHold={handleHold}
            heldCount={heldProfiles.length}
          />
        ) : mainScreen === "inbox" ? (
          <InboxScreen
            onOpenChat={goToChat}
            heldProfiles={heldProfiles}
            onLikeHeld={handleLikeHeld}
            onPassHeld={handlePassHeld}
          />
        ) : (
          <MyProfileScreen />
        )}

        {matchedProfile && (
          <MatchModal
            profile={matchedProfile}
            onMessage={goToChat}
            onClose={() => setMatchedProfile(null)}
          />
        )}
      </div>

      {subScreen === null && (
        <BottomNav
          current={mainScreen}
          onChange={handleMainNav}
          unread={1}
        />
      )}

      <ThemeSelector />
    </div>
  );
}

function AppContent() {
  const searchParams = useSearchParams();
  const appName = searchParams.get("v") === "3days" ? "다시, 3일" : "LoveAgain";
  return (
    <ThemeProvider appName={appName}>
      <AppInner />
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#EBEBEB] flex items-center justify-center">
      <Suspense>
        <AppContent />
      </Suspense>
    </div>
  );
}
