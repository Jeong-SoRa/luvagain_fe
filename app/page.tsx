"use client";
import { useState } from "react";
import SplashScreen from "@/components/screens/SplashScreen";
import BottomNav from "@/components/BottomNav";
import DiscoverScreen from "@/components/screens/DiscoverScreen";
import ProfileDetailScreen from "@/components/screens/ProfileDetailScreen";
import InboxScreen from "@/components/screens/InboxScreen";
import ChatScreen from "@/components/screens/ChatScreen";
import MyProfileScreen from "@/components/screens/MyProfileScreen";
import MatchModal from "@/components/screens/MatchModal";
import type { Profile } from "@/components/data/profiles";

type MainScreen = "discover" | "inbox" | "myprofile";
type SubScreen = "profile-detail" | "chat" | null;

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [mainScreen, setMainScreen] = useState<MainScreen>("discover");
  const [subScreen, setSubScreen] = useState<SubScreen>(null);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);

  function goToProfileDetail(p: Profile) {
    setSelectedProfile(p);
    setSubScreen("profile-detail");
  }

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

  function handlePass() {
    setSubScreen(null);
    setSelectedProfile(null);
  }

  function handleMainNav(s: MainScreen) {
    setMainScreen(s);
    setSubScreen(null);
    setSelectedProfile(null);
  }

  return (
    <div className="min-h-screen bg-[#EBEBEB] flex items-center justify-center">
      <div
        className="relative bg-white overflow-hidden flex flex-col"
        style={{
          width: "min(390px, 100vw)",
          height: "min(844px, 100dvh)",
          borderRadius: "clamp(0px, 3vw, 44px)",
          boxShadow: "0 32px 64px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.06)",
        }}
      >
        {/* Splash */}
        {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}

        {/* App screens */}
        <div className="flex-1 overflow-hidden relative">
          {subScreen === "profile-detail" && selectedProfile ? (
            <ProfileDetailScreen
              profile={selectedProfile}
              onBack={() => { setSubScreen(null); setSelectedProfile(null); }}
              onLike={handleLike}
              onPass={handlePass}
            />
          ) : subScreen === "chat" && selectedProfile ? (
            <ChatScreen
              profile={selectedProfile}
              onBack={() => { setSubScreen(null); setSelectedProfile(null); }}
            />
          ) : mainScreen === "discover" ? (
            <DiscoverScreen onViewProfile={goToProfileDetail} onMatch={setMatchedProfile} />
          ) : mainScreen === "inbox" ? (
            <InboxScreen onOpenChat={goToChat} />
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

        {/* Bottom nav — hide on sub-screens */}
        {subScreen === null && (
          <BottomNav current={mainScreen} onChange={handleMainNav} unread={1} />
        )}
      </div>
    </div>
  );
}
