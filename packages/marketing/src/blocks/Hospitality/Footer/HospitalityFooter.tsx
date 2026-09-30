import React from "react";
import {
  ChevronRight,
  PlayCircle,
  User,
  Calendar,
  MessageCircle,
  MoreHorizontal,
} from "lucide-react";

const SamsaraLogo = () => (
  <svg width="80" height="60" viewBox="0 0 100 60" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50 0C60 20 80 30 100 30C80 30 60 40 50 60C40 40 20 30 0 30C20 30 40 20 50 0Z"
      opacity="0.9"
    />
    <circle cx="50" cy="30" r="12" fill="#363432" />
    <circle cx="50" cy="30" r="6" fill="white" />
    <path d="M30 30C30 20 40 10 50 10" stroke="white" strokeWidth="2" fill="none" opacity="0.5" />
    <path d="M70 30C70 40 60 50 50 50" stroke="white" strokeWidth="2" fill="none" opacity="0.5" />
  </svg>
);

export function HospitalityFooter() {
  return (
    <footer className="relative w-full bg-[#363432] pt-16 pb-12 font-sans text-[#D8D4CF]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        {/* Top Header */}
        <div className="mb-16 flex flex-col items-start justify-between border-b border-white/10 pb-8 md:flex-row md:items-center">
          {/* Decorative Logo / Pattern Left */}
          <div className="grid grid-cols-4 gap-2 opacity-50">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-white" />
            ))}
          </div>
          <div className="mt-8 flex items-center gap-8 text-xs font-light md:mt-0">
            <a href="#" className="flex items-center gap-2 transition-colors hover:text-white">
              SAMSARA Rewards <User className="h-3.5 w-3.5" />
            </a>
            <div className="h-3 w-px bg-white/20" />
            <a href="#" className="flex items-center gap-2 transition-colors hover:text-white">
              My reservation <Calendar className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Main Grid */}
        <div className="mb-24 grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-24">
          {/* Column 1 */}
          <div className="flex flex-col gap-12">
            <h3 className="font-serif text-3xl tracking-widest text-white uppercase">
              SAMSARA BALI
            </h3>

            <div className="flex flex-col">
              <div className="group mb-4 flex cursor-pointer items-center justify-between border-b border-white/20 pb-4">
                <span className="text-xl text-white">Hotels</span>
                <ChevronRight className="h-5 w-5 text-white/50 transition-colors group-hover:text-white" />
              </div>

              <ul className="ml-2 flex flex-col gap-5 border-l border-white/10 pl-4">
                {["VILLAS", "SEGARA", "RESORT", "RIMBA"].map((hotel) => (
                  <li key={hotel} className="flex flex-col">
                    <div className="group flex cursor-pointer items-center justify-between">
                      <span className="text-xs tracking-widest text-white/60">
                        <span className="opacity-50">SAMSARA BALI</span>{" "}
                        <span className="ml-1 text-white">{hotel}</span>
                      </span>
                      <div className="flex items-center gap-4">
                        <PlayCircle className="h-4 w-4 text-white/40 transition-colors group-hover:text-white" />
                        <span className="flex items-center text-[10px] text-white/40 transition-colors group-hover:text-white">
                          Rooms <PlayCircle className="ml-1 h-3 w-3" />
                        </span>
                      </div>
                    </div>
                    <div className="mt-5 h-px w-full bg-white/10" />
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex flex-col">
              <div className="group mb-4 flex cursor-pointer items-center justify-between border-b border-white/20 pb-4">
                <span className="text-xl text-white">Dining</span>
                <ChevronRight className="h-5 w-5 text-white/50 transition-colors group-hover:text-white" />
              </div>
              <ul className="ml-2 flex flex-col gap-5 border-l border-white/10 pl-4">
                <li className="flex flex-col">
                  <div className="group flex cursor-pointer items-center justify-between">
                    <span className="text-xs tracking-wide text-white/70 transition-colors group-hover:text-white">
                      Restaurant & Café/Bar List
                    </span>
                    <PlayCircle className="h-4 w-4 text-white/40 transition-colors group-hover:text-white" />
                  </div>
                  <div className="mt-5 h-px w-full bg-white/10" />
                </li>
                <li className="flex flex-col">
                  <div className="group flex cursor-pointer items-center justify-between">
                    <span className="text-xs tracking-wide text-white/70 transition-colors group-hover:text-white">
                      Rock Bar
                    </span>
                    <PlayCircle className="h-4 w-4 text-white/40 transition-colors group-hover:text-white" />
                  </div>
                  <div className="mt-5 h-px w-full bg-white/10" />
                </li>
              </ul>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col">
              <div className="group mb-4 flex cursor-pointer items-center justify-between border-b border-white/20 pb-4">
                <span className="text-xl text-white">Spa</span>
                <ChevronRight className="h-5 w-5 text-white/50 transition-colors group-hover:text-white" />
              </div>
              <ul className="ml-2 flex flex-col gap-5 border-l border-white/10 pl-4">
                <li className="flex flex-col">
                  <div className="group flex cursor-pointer items-center justify-between">
                    <span className="text-xs tracking-wide text-white/70 transition-colors group-hover:text-white">
                      Spa Menu
                    </span>
                    <PlayCircle className="h-4 w-4 text-white/40 transition-colors group-hover:text-white" />
                  </div>
                  <div className="mt-5 h-px w-full bg-white/10" />
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <div className="group mb-4 flex cursor-pointer items-center justify-between border-b border-white/20 pb-4">
                <span className="text-xl text-white">Experiences</span>
                <ChevronRight className="h-5 w-5 text-white/50 transition-colors group-hover:text-white" />
              </div>
              <ul className="ml-2 flex flex-col gap-5 border-l border-white/10 pl-4">
                <li className="flex flex-col">
                  <div className="group flex cursor-pointer items-center justify-between">
                    <span className="text-xs tracking-wide text-white/70 transition-colors group-hover:text-white">
                      Pools, Activities & Facilities
                    </span>
                    <PlayCircle className="h-4 w-4 text-white/40 transition-colors group-hover:text-white" />
                  </div>
                  <div className="mt-5 h-px w-full bg-white/10" />
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <div className="group flex cursor-pointer items-center justify-between border-b border-white/20 pb-4">
                <span className="text-xl text-white">Weddings</span>
                <ChevronRight className="h-5 w-5 text-white/50 transition-colors group-hover:text-white" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="group mb-4 flex cursor-pointer items-center justify-between border-b border-white/20 pb-4">
                <span className="text-xl text-white">Meetings</span>
                <ChevronRight className="h-5 w-5 text-white/50 transition-colors group-hover:text-white" />
              </div>
              <ul className="ml-2 flex flex-col gap-5 border-l border-white/10 pl-4">
                <li className="flex flex-col">
                  <div className="group flex cursor-pointer items-center justify-between">
                    <span className="text-xs tracking-wide text-white/70 transition-colors group-hover:text-white">
                      Grand Ballroom
                    </span>
                    <PlayCircle className="h-4 w-4 text-white/40 transition-colors group-hover:text-white" />
                  </div>
                  <div className="mt-5 h-px w-full bg-white/10" />
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-8">
            {["Offers", "Resort Map", "Curated Journeys", "Access", "Support", "Residences"].map(
              (item) => (
                <div
                  key={item}
                  className="group flex cursor-pointer items-center justify-between border-b border-white/20 pb-4"
                >
                  <span className="text-xl text-white transition-opacity group-hover:opacity-80">
                    {item}
                  </span>
                  <PlayCircle className="h-5 w-5 text-white/40 transition-colors group-hover:text-white" />
                </div>
              )
            )}
          </div>
        </div>

        {/* Bottom Social & Language */}
        <div className="mb-20 flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div className="flex flex-col gap-4">
            <span className="text-xs tracking-wider text-white/50">
              Discover the Latest SAMSARA BALI
            </span>
            <div className="flex gap-4 text-xs tracking-widest text-white/60">
              <a href="#" className="transition-colors hover:text-white">
                instagram
              </a>
              <a href="#" className="transition-colors hover:text-white">
                facebook
              </a>
              <a href="#" className="transition-colors hover:text-white">
                youtube
              </a>
              <a href="#" className="transition-colors hover:text-white">
                tiktok
              </a>
              <a href="#" className="transition-colors hover:text-white">
                tripadvisor
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 md:items-end">
            <span className="text-xs tracking-wider text-white/50">Language</span>
            <div className="flex flex-wrap gap-4 text-xs tracking-widest text-white/40">
              <button className="text-white">English</button>
              <button className="transition-colors hover:text-white">简体中文</button>
              <button className="transition-colors hover:text-white">繁體中文</button>
              <button className="transition-colors hover:text-white">日本語</button>
              <button className="transition-colors hover:text-white">한국어</button>
            </div>
          </div>
        </div>

        {/* Footer Base */}
        <div className="flex flex-col items-center justify-between gap-10 border-t border-white/10 pt-10 lg:flex-row">
          <div className="flex gap-6 text-[10px] font-medium tracking-widest text-white/40">
            <span className="text-white/20">BALI</span>
            <a href="#" className="text-white transition-colors hover:text-white">
              SAMSARA
            </a>
            <a href="#" className="transition-colors hover:text-white">
              JAKARTA
            </a>
            <a href="#" className="transition-colors hover:text-white">
              CRUISE
            </a>
          </div>

          {/* Central Logo */}
          <div className="flex flex-col items-center">
            <SamsaraLogo />
            <span className="mt-4 font-serif text-lg tracking-[0.4em] text-white">SAMSARA</span>
          </div>

          <div className="flex gap-6 text-[10px] tracking-wider text-white/50">
            <a href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Careers
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Pressroom
            </a>
            <span className="text-white/20">© SAMSARA</span>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed right-8 bottom-8 z-50 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-[#5A524A] text-white shadow-xl transition-transform hover:scale-105">
        <MoreHorizontal className="h-6 w-6" />
      </button>
    </footer>
  );
}
