"use client";
import { useState } from "react";
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

  function handleMatch(p: Profile) {
    setMatchedProfile(p);
  }

  function handleLike(p: Profile) {
    setSubScreen(null);
    setSelectedProfile(null);
    handleMatch(p);
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

  const showBottomNav = subScreen === null;

  return (
    /* Desktop: center a phone frame. Mobile: full screen */
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div
        className="relative bg-white overflow-hidden flex flex-col"
        style={{
          width: "min(390px, 100vw)",
          height: "min(844px, 100dvh)",
          borderRadius: "clamp(0px, 2vw, 40px)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.25)",
        }}
      >
        {/* Screen router */}
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
            <DiscoverScreen
              onViewProfile={goToProfileDetail}
              onMatch={handleMatch}
            />
          ) : mainScreen === "inbox" ? (
            <InboxScreen onOpenChat={goToChat} />
          ) : (
            <MyProfileScreen />
          )}

          {/* Match modal */}
          {matchedProfile && (
            <MatchModal
              profile={matchedProfile}
              onMessage={goToChat}
              onClose={() => setMatchedProfile(null)}
            />
          )}
        </div>

        {/* Bottom nav */}
        {showBottomNav && (
          <BottomNav
            current={mainScreen}
            onChange={handleMainNav}
            unread={1}
          />
        )}
      </div>
    </div>
  );
}
