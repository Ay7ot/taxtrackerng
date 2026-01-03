# LIRS App Design System & Style Guide

## 🎨 Brand Identity

**Product Name:** LIRS (Lagos Internal Revenue Service inspired)
**Design Philosophy:** Modern, trustworthy, accessible financial services with a friendly, approachable personality

---

## 📐 Core Design Principles

### Visual Hierarchy
- **Bold, confident headlines** with generous whitespace
- **Clear visual separation** between sections using subtle backgrounds and shadows
- **Progressive disclosure** - show essential info first, details on demand

### Personality
- **Professional but not sterile** - warm illustrations balance serious financial content
- **Confident without being aggressive** - strong colors used purposefully
- **Accessible and inclusive** - high contrast, clear typography

---

## 🎨 Color Palette

### Primary Colors

**Royal Blue (Brand Primary)**
- HEX: `#2B4FE8` or similar vibrant blue
- RGB: `43, 79, 232`
- Usage: Primary CTAs, active states, brand elements, navigation highlights
- This is your hero color - use it for actions you want users to take

**Deep Navy (Background Dark)**
- HEX: `#1A1F3A` or `#1E2139`
- Usage: Header backgrounds, dark mode elements, premium sections
- Creates depth and sophistication

### Secondary Colors

**Sunshine Yellow**
- HEX: `#FFE999` or `#FFF4CC`
- Usage: Illustration backgrounds, highlight zones, approved/positive states
- Very soft, pastel-like saturation

**Mint Green**
- HEX: `#C5E8C5` or similar
- Usage: Success states, approved items, positive feedback

**Lavender/Light Purple**
- HEX: `#E8D5F2` or similar
- Usage: Tertiary highlights, alternative state colors

**Soft Peach/Pink**
- HEX: `#FFD4D4` or similar
- Usage: Accent areas, alternative backgrounds

### Neutral Scale

**Pure White**
- HEX: `#FFFFFF`
- Usage: Card backgrounds, primary text on dark, main content areas

**Light Gray (Background)**
- HEX: `#F5F6FA` or `#F8F9FE`
- Usage: App background, subtle section dividers
- Very slight blue tint, not pure gray

**Medium Gray (Text Secondary)**
- HEX: `#6B7280` or similar
- Usage: Secondary text, timestamps, metadata

**Dark Gray (Text Primary)**
- HEX: `#1F2937` or similar
- Usage: Body text on light backgrounds

---

## 📝 Typography

### Font Family
**Primary Font:** San Francisco (iOS) / Roboto (Android) / Inter or similar (Web)
- Use system fonts for optimal performance and native feel
- Fallback: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', sans-serif`

### Type Scale & Weights

**Display/Hero Text (Onboarding Headlines)**
- Size: 28-34px
- Weight: Bold (700)
- Line Height: 1.2
- Letter Spacing: -0.5px (slightly tighter)
- Usage: "Do Your Taxes With Ease", "Created For All Business Sizes"

**Page Headers**
- Size: 24-28px
- Weight: Bold (700)
- Line Height: 1.3
- Usage: "Calculate Taxes", "Tax Results"

**Section Headers**
- Size: 18-20px
- Weight: SemiBold (600)
- Line Height: 1.4
- Usage: "Report For Last Month's Tax", "Tax History"

**Body Text (Primary)**
- Size: 15-16px
- Weight: Regular (400)
- Line Height: 1.5
- Usage: Main descriptive text, form labels

**Body Text (Secondary)**
- Size: 14-15px
- Weight: Regular (400)
- Color: Medium Gray
- Line Height: 1.5
- Usage: Supporting text, descriptions

**Small Text (Metadata)**
- Size: 12-13px
- Weight: Regular (400)
- Color: Medium Gray
- Usage: Timestamps, "Powered By LIRS", helper text

**Button Text**
- Size: 16-17px
- Weight: SemiBold (600)
- Letter Spacing: 0.2px

---

## 🔘 Buttons & Interactive Elements

### Primary Button (CTA)
```
Background: Royal Blue (#2B4FE8)
Text: White, SemiBold (600), 16-17px
Padding: 16-18px vertical, 32-40px horizontal
Border Radius: 24-28px (very rounded, pill-like)
Shadow: 0px 4px 12px rgba(43, 79, 232, 0.25)
Hover: Slightly darker blue, shadow intensifies
Active: Even darker, shadow reduces, slight scale down (0.98)
```

**Characteristics:**
- Very rounded, pill-shaped
- Generous padding for easy tapping
- Subtle shadow for depth
- Full width on mobile, auto width on desktop

### Circular Navigation Button
```
Background: Royal Blue
Size: 56-64px diameter
Icon: White arrow or chevron
Shadow: 0px 4px 16px rgba(43, 79, 232, 0.3)
Position: Bottom right of screen/section
```

### Text Button / Link
```
Color: Royal Blue
Weight: SemiBold (600)
Text Decoration: None (use color only)
Hover: Slight opacity reduction (0.8)
```

### Navigation Icons (Bottom Tab)
```
Size: 24px
Active: Dark (navy or black), filled style
Inactive: Medium gray, outline style
Active Indicator: None (color change only)
Label: 12px, underneath icon
```

---

## 📦 Cards & Containers

### Primary Card
```
Background: White
Border Radius: 16-20px
Shadow: 0px 2px 12px rgba(0, 0, 0, 0.06)
Padding: 20-24px
Border: None
```

**Usage:** Tax history items, calculation forms, result displays

### Modal/Dialog Card
```
Background: White
Border Radius: 24-28px (top corners especially)
Shadow: 0px 8px 32px rgba(0, 0, 0, 0.12)
Padding: 24-32px
Max Width: 90% viewport or 400px
```

### Dark Header Section
```
Background: Deep Navy (#1A1F3A)
Text: White
Border Radius: 0px (full bleed) or 0 0 24px 24px (bottom rounded)
Padding: 24-32px
```

**Usage:** Page headers, welcome sections

---

## 🎭 Illustrations & Graphics

### Style Characteristics
- **Line art** with solid color fills
- **Minimal detail** - simplified, friendly forms
- **2-3 colors max** per illustration (blue, yellow backgrounds)
- **Human figures** are stylized, not realistic
- **Objects** (phones, plants, chairs) are simple and geometric

### Color Usage in Illustrations
- **Primary elements:** Royal Blue (#2B4FE8)
- **Accent elements:** White or secondary colors
- **Backgrounds:** Soft yellow or pastel circles behind figures
- **Shadows:** None or very minimal

### Composition
- **Characters face toward content/center**
- **Diagonal elements** for movement and energy
- **Circular background blobs** for depth and interest
- **Phone mockups** shown in illustrations to reinforce app context

---

## 📏 Spacing System

Use an 8px base unit system:

**Micro Spacing (Within Components)**
- 4px: Icon to text gaps, tight elements
- 8px: Standard gaps within cards
- 12px: Related element groups

**Component Spacing**
- 16px: Space between form fields, list items
- 24px: Space between sections within a view
- 32px: Space between major sections
- 48px: Large section breaks

**Screen Margins**
- Mobile: 16-20px horizontal margin
- Tablet: 24-32px
- Desktop: 40-60px or centered max-width container

---

## 🎯 Specific Component Styles

### Status Indicators
```
Display: Inline circle (8-10px) + text
Colors:
  - Submitted: Yellow/amber (#FFA500)
  - Reviewed: Purple/lavender (#9333EA)
  - Approved: Green (#10B981)
Spacing: 8px between dot and text
Font: 14-15px, Regular
```

### List Items (History/Records)
```
Background: Subtle color tints (yellow, green, lavender)
Border Radius: 12-16px
Padding: 16px
Margin Bottom: 12px
Icon: Circular, 40-48px, with brand icon inside
Shadow: Very subtle or none
```

### Input Fields
```
Background: White
Border: 1px solid #E5E7EB (light gray)
Border Radius: 12px
Padding: 14-16px
Font Size: 15-16px
Placeholder Color: #9CA3AF
Focus State:
  - Border: Royal Blue
  - Shadow: 0px 0px 0px 3px rgba(43, 79, 232, 0.1)
```

### Dividers
```
Style: Very subtle or none
If used: 1px solid #F3F4F6
Margin: 16-24px vertical
```

---

## 🌊 Animations & Interactions

### General Principles
- **Smooth and purposeful** - no animation for animation's sake
- **Duration:** 200-300ms for most transitions
- **Easing:** Ease-out for entrances, ease-in for exits, ease-in-out for state changes

### Specific Animations
**Button Press**
- Scale: 0.98
- Duration: 100ms
- Easing: Ease-out

**Card Appear**
- Transform: TranslateY(20px) → TranslateY(0)
- Opacity: 0 → 1
- Duration: 300ms
- Easing: Ease-out

**Page Transitions**
- Slide animations (horizontal)
- Duration: 350ms
- Easing: Cubic-bezier(0.4, 0.0, 0.2, 1)

**Loading States**
- Skeleton screens in light gray
- Subtle pulse animation
- No spinners unless necessary

---

## 📱 Responsive Behavior

### Mobile First
- Design for 375px width minimum
- Full-width buttons and cards
- Single column layouts
- Bottom navigation

### Tablet (768px+)
- 2-column grids where appropriate
- Wider cards with more horizontal breathing room
- Side navigation options

### Desktop (1024px+)
- Max-width containers (1200-1400px)
- Multi-column layouts
- Sidebar navigation options
- Hover states become more prominent

---

## ✨ Special Effects

### Glassmorphism (Subtle)
Not heavily used, but when needed:
```
Background: rgba(255, 255, 255, 0.8)
Backdrop Filter: blur(10px)
Border: 1px solid rgba(255, 255, 255, 0.3)
```

### Shadows
**Elevation Levels:**
- Level 1: `0px 2px 8px rgba(0, 0, 0, 0.04)`
- Level 2: `0px 4px 12px rgba(0, 0, 0, 0.06)`
- Level 3: `0px 8px 24px rgba(0, 0, 0, 0.08)`
- Level 4: `0px 12px 32px rgba(0, 0, 0, 0.12)`

**Blue Shadows (for primary buttons):**
- `0px 4px 16px rgba(43, 79, 232, 0.25)`

### Overlays
**Dark overlay for modals:**
```
Background: rgba(0, 0, 0, 0.4)
Backdrop Filter: blur(2px) (optional)
```

---

## 🎪 Onboarding Screens

### Layout Pattern
- **Illustration at top** (40% of screen height)
- **Headline below** (bold, large)
- **Description text** (lighter weight, gray)
- **Progress dots** at bottom (8-10px, royal blue for active)
- **Next button** bottom right (circular, blue, floating)
- **Skip button** top right (text, medium gray)
- **Attribution** at very bottom ("Powered By LIRS", 12px, gray)

### Illustration Background
- Circular blob behind main figure
- Soft pastel colors (yellow, mint, peach)
- No hard edges or geometric shapes

---

## 🏷️ Branding Elements

### Logo/Wordmark Treatment
- "Powered By LIRS" appears at bottom of screens
- Small (12px), medium gray color
- Can also appear in nav header at small size

### Brand Voice in UI
- **Confident:** "Do Your Taxes With Ease"
- **Inclusive:** "Created For All Business Sizes"
- **Secure:** "Secure Tax Filing at Your Fingertips"
- **Friendly:** "Hi, Ruth. Welcome Back"

---

## 🚨 States & Feedback

### Success State
- Background: Soft green tint or green dot indicator
- Icon: Checkmark in circle
- Text: Positive confirmation

### Error State
- Border: Red (#EF4444)
- Icon: Warning triangle or X
- Text: Clear error description
- Background: Light red tint (#FEF2F2)

### Loading State
- Skeleton screens matching layout
- Light gray (#F3F4F6) animated placeholders
- No text, just structural hints

### Empty State
- Simple illustration
- Gray text explaining why empty
- Clear CTA to add first item

---

## 📋 Accessibility Notes

### Contrast Ratios
- Body text on white: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- Interactive elements: 4.5:1 minimum

### Touch Targets
- Minimum: 44x44px
- Preferred: 48x48px or larger
- Extra spacing around adjacent touchable elements

### Focus States
- 3px blue outline on keyboard focus
- Clear visual indicator for all interactive elements

---

## 🎬 Animation Timing Reference

```css
/* Quick actions */
--duration-fast: 150ms;

/* Standard transitions */
--duration-normal: 250ms;

/* Complex animations */
--duration-slow: 350ms;

/* Easing functions */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 💡 Implementation Tips

1. **Start with the color system** - define CSS variables for all brand colors
2. **Create button component variants** - primary, secondary, text
3. **Build card component** - reusable with consistent shadow and radius
4. **Establish spacing scale** - use consistent multipliers of 8px
5. **Create icon library** - outline and filled variants
6. **Use system fonts** - don't load custom fonts unless necessary
7. **Implement dark mode carefully** - navy backgrounds, adjusted shadows
8. **Test on actual devices** - shadows and colors look different on screens

---

## 🎨 Color Variable Names (CSS)

```css
:root {
  /* Brand Colors */
  --color-primary: #2B4FE8;
  --color-primary-dark: #1E3AB8;
  --color-primary-light: #5B7AFF;
  
  /* Backgrounds */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F5F6FA;
  --color-bg-dark: #1A1F3A;
  
  /* Text */
  --color-text-primary: #1F2937;
  --color-text-secondary: #6B7280;
  --color-text-tertiary: #9CA3AF;
  --color-text-inverse: #FFFFFF;
  
  /* Status Colors */
  --color-success: #10B981;
  --color-warning: #FFA500;
  --color-error: #EF4444;
  --color-info: #9333EA;
  
  /* Accent Pastels */
  --color-accent-yellow: #FFF4CC;
  --color-accent-green: #C5E8C5;
  --color-accent-purple: #E8D5F2;
  --color-accent-peach: #FFD4D4;
  
  /* Borders */
  --color-border-light: #E5E7EB;
  --color-border-medium: #D1D5DB;
  
  /* Shadows */
  --shadow-sm: 0px 2px 8px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 4px 12px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0px 8px 24px rgba(0, 0, 0, 0.08);
  --shadow-xl: 0px 12px 32px rgba(0, 0, 0, 0.12);
  --shadow-primary: 0px 4px 16px rgba(43, 79, 232, 0.25);
  
  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
}
```

---

This design system creates a **trustworthy yet approachable** financial app experience with strong visual hierarchy, clear interactions, and a cohesive brand identity throughout.