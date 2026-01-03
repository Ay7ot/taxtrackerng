'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

const slides = [
  {
    id: 1,
    title: 'Do Your Taxes With Ease',
    description: 'Track your income and calculate your taxes accurately under the new Nigerian Tax Act 2026.',
    bgColor: '#FEF3C7',
    accentColor: '#F59E0B',
  },
  {
    id: 2,
    title: 'Track All Income Sources',
    description: 'Log income from salary, freelance, business, and gigs all in one place.',
    bgColor: '#D1FAE5',
    accentColor: '#10B981',
  },
  {
    id: 3,
    title: 'Built For Everyone',
    description: 'Whether you\'re a salaried employee or a business owner, we\'ve got you covered.',
    bgColor: '#E0E7FF',
    accentColor: '#6366F1',
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.push('/login');
    }
  };

  const handleSkip = () => {
    router.push('/login');
  };

  const slide = slides[currentSlide];

  return (
    <div 
      className="min-h-screen min-h-dvh flex flex-col transition-colors duration-500 pt-safe pb-safe"
      style={{ backgroundColor: slide.bgColor }}
    >
      {/* Container for centering on desktop */}
      <div className="flex-1 flex flex-col w-full max-w-lg mx-auto">
        {/* Header with Skip */}
        <header className="flex justify-end px-6 pt-2">
          <button 
            onClick={handleSkip}
            className="py-3 px-4 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Skip
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-8 py-8">
          {/* Illustration Container */}
          <div className="relative mb-12">
            {/* Background Circle */}
            <div 
              className="w-56 h-56 sm:w-64 sm:h-64 rounded-full flex items-center justify-center transition-all duration-500"
              style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
            >
              {/* Icon Card */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center">
                <OnboardingIcon index={currentSlide} color={slide.accentColor} />
              </div>
            </div>
            
            {/* Decorative dots */}
            <div 
              className="absolute -top-4 -right-4 w-6 h-6 rounded-full opacity-60"
              style={{ backgroundColor: slide.accentColor }}
            />
            <div 
              className="absolute -bottom-2 -left-6 w-4 h-4 rounded-full opacity-40"
              style={{ backgroundColor: slide.accentColor }}
            />
          </div>

          {/* Text Content */}
          <div className="text-center max-w-sm">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              {slide.title}
            </h1>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              {slide.description}
            </p>
          </div>
        </main>

        {/* Bottom Navigation */}
        <footer className="px-8 pb-8">
          {/* Progress & Next Button */}
          <div className="flex items-center justify-between">
            {/* Progress Dots */}
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`
                    h-2.5 rounded-full transition-all duration-300
                    ${index === currentSlide 
                      ? 'w-8' 
                      : 'w-2.5 hover:opacity-70'
                    }
                  `}
                  style={{ 
                    backgroundColor: index === currentSlide 
                      ? slide.accentColor 
                      : 'rgba(0,0,0,0.15)' 
                  }}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ 
                backgroundColor: slide.accentColor,
                boxShadow: `0 8px 24px ${slide.accentColor}40`
              }}
              aria-label={currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            >
              <svg 
                width="22" 
                height="22" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Footer Text */}
          <p className="text-center text-xs text-slate-500 mt-6">
            Powered by IncomeTracker NG
          </p>
        </footer>
      </div>
    </div>
  );
}

function OnboardingIcon({ index, color }: { index: number; color: string }) {
  const icons = [
    // Calculator/Tax icon
    <svg key="0" width="56" height="56" viewBox="0 0 56 56" fill="none">
      <rect x="10" y="6" width="36" height="44" rx="4" fill={`${color}20`} stroke={color} strokeWidth="2"/>
      <rect x="16" y="14" width="24" height="8" rx="2" fill={color} opacity="0.3"/>
      <rect x="16" y="26" width="16" height="3" rx="1.5" fill={`${color}60`}/>
      <rect x="16" y="32" width="20" height="3" rx="1.5" fill={`${color}60`}/>
      <rect x="16" y="38" width="12" height="3" rx="1.5" fill={`${color}60`}/>
      <circle cx="38" cy="42" r="8" fill={color}/>
      <path d="M35 42l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    // Wallet icon
    <svg key="1" width="56" height="56" viewBox="0 0 56 56" fill="none">
      <rect x="6" y="14" width="44" height="32" rx="4" fill={`${color}20`} stroke={color} strokeWidth="2"/>
      <path d="M6 22h44" stroke={color} strokeWidth="2"/>
      <rect x="32" y="28" width="12" height="10" rx="2" fill={color} opacity="0.3"/>
      <circle cx="38" cy="33" r="2" fill={color}/>
      <rect x="12" y="28" width="14" height="3" rx="1.5" fill={`${color}60`}/>
      <rect x="12" y="34" width="10" height="3" rx="1.5" fill={`${color}60`}/>
    </svg>,
    // Growth chart icon
    <svg key="2" width="56" height="56" viewBox="0 0 56 56" fill="none">
      <rect x="6" y="10" width="44" height="36" rx="4" fill={`${color}20`} stroke={color} strokeWidth="2"/>
      <path d="M14 38L22 28L32 34L42 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="42" cy="20" r="4" fill={color}/>
      <circle cx="32" cy="34" r="3" fill={`${color}80`}/>
      <circle cx="22" cy="28" r="3" fill={`${color}80`}/>
      <circle cx="14" cy="38" r="3" fill={`${color}80`}/>
    </svg>,
  ];

  return icons[index];
}
