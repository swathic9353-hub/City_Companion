# Design Guidelines: City Companion Directory App

## Design Approach
**Selected System:** Material Design with inspiration from Google Maps, Zomato, and Yelp
**Rationale:** This utility-focused, information-dense application prioritizes quick access to city services, efficient navigation, and clear data presentation. Material Design's elevation system, strong component library, and seamless integration with Google Maps make it ideal for this location-based directory.

## Core Design Elements

### Typography
- **Primary Font:** Inter (via Google Fonts CDN)
- **Headings:**
  - H1 (City/Page titles): text-4xl md:text-5xl, font-bold
  - H2 (Category sections): text-3xl md:text-4xl, font-bold
  - H3 (Location names): text-xl md:text-2xl, font-semibold
  - H4 (Subsections): text-lg md:text-xl, font-medium
- **Body Text:**
  - Primary: text-base, font-normal (addresses, descriptions)
  - Secondary: text-sm, font-normal (metadata, hours)
  - Labels: text-sm, font-medium (category tags, status)
- **Buttons/CTAs:** text-sm md:text-base, font-semibold

### Layout System
**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-4 (mobile), p-6 (tablet), p-8 (desktop)
- Section spacing: py-12 md:py-16 lg:py-20
- Card gaps: gap-4 md:gap-6 lg:gap-8
- Element margins: mb-2, mb-4, mb-6, mb-8
- Container max-width: max-w-7xl mx-auto px-4 md:px-6

### Component Library

#### Navigation
- **Top Header:** Sticky navigation with city selector dropdown, search icon, and app branding
- **Category Tabs:** Horizontal scrollable tabs (Shopping, Dining, Events, Hospitals, Bus Timing, Schools) with active state indicators
- **Quick Filters:** Chip-based filters below category tabs for quick refinement

#### Cards & Lists
- **City Selection Cards:** Large interactive cards (2-column grid on desktop) with city imagery, name overlay, and location count badge
- **Location Cards:** Elevated cards with:
  - Location thumbnail image (left side, 120px square on mobile, 160px on desktop)
  - Content area: Name, category badge, address, phone, hours
  - Action buttons: "Navigate" (primary), "Call" (secondary), "Save" (icon)
  - Rating stars and review count
  - Distance indicator (from user location)
- **Compact List View:** Toggle option for list view showing condensed information in rows

#### Maps & Navigation
- **Embedded Map Section:** Full-width map container (h-96) showing all locations in current category with custom markers
- **Traffic Layer Overlay:** Toggle for real-time traffic with legend (Green/Yellow/Red indicators)
- **Directions Panel:** Slide-up drawer with step-by-step navigation when "Navigate" is clicked

#### Search & Filters
- **Search Bar:** Prominent search input (w-full md:max-w-2xl) with autocomplete dropdown
- **Filter Sidebar:** Collapsible left sidebar (desktop) / bottom sheet (mobile) with:
  - City selector
  - Category checkboxes
  - Distance radius slider
  - Open now toggle
  - Rating filter

#### Data Display
- **Information Sections:** Structured info blocks for each location:
  - Header: Name, category, rating
  - Contact: Phone (clickable), website link
  - Hours: Today's hours highlighted, expandable for full week
  - Description: 2-3 line overview with "Read more"
  - Amenities: Icon grid for features (Parking, WiFi, Wheelchair accessible, etc.)

#### Status Indicators
- **Traffic Status Cards:** Grid of route cards showing live traffic conditions with ETA and route options
- **Bus Timing Cards:** Live arrival times with route numbers, direction, and delay indicators
- **Operational Status:** "Open Now" / "Closed" badges with next opening time

#### Interactive Elements
- **Floating Action Button:** Primary CTA (bottom-right, mobile) for "Add to Favorites" or "Get Directions"
- **Bottom Navigation:** (Mobile only) Icons for Home, Search, Saved, Profile
- **Swipeable Cards:** Horizontal card carousels for featured locations per category

### Icons
**Library:** Material Icons (via Google Fonts CDN)
- Navigation: menu, search, location_on, directions, phone, schedule
- Categories: shopping_bag, restaurant, event, local_hospital, directions_bus, school
- Actions: favorite, share, more_vert, filter_list, map, navigation
- Status: check_circle, schedule, traffic, star, wifi, accessible

### Images
**Hero Section:** No traditional hero. Instead, use a **dual-city showcase section** at the top:
- Two large banner images side-by-side (stack on mobile) representing Bangalore and Mangalore
- Images: Iconic landmarks (Vidhana Soudha for Bangalore, Sultan Battery for Mangalore)
- Semi-transparent overlay with city name and tagline
- Dimensions: 600px height on desktop, 400px on mobile
- CTA buttons on images with blur backdrop (backdrop-blur-sm with semi-transparent background)

**Category Images:** Each location card includes a thumbnail (real place photos preferred, landmarks, storefronts, or relevant stock imagery)

**Map Integration:** Google Maps embedded iframe with custom styling to match app theme

### Accessibility
- Minimum touch target: 44x44px for all interactive elements
- ARIA labels on all icon buttons
- Keyboard navigation support for all interactive components
- Focus indicators with 2px outline offset
- Alt text for all images
- Color contrast ratio minimum 4.5:1 for text

### Responsive Breakpoints
- Mobile: < 768px (single column, bottom nav, drawer menus)
- Tablet: 768px - 1024px (2-column grids, sidebar visible)
- Desktop: > 1024px (3-column grids, full sidebar, expanded maps)

### Visual Enhancements
- **Elevation:** Use shadow-sm, shadow-md, shadow-lg for card hierarchy
- **Transitions:** Smooth 200-300ms transitions for hover states, no distracting animations
- **Micro-interactions:** Ripple effect on card taps, gentle scale on button press
- **Loading States:** Skeleton screens for location cards, shimmer effect during data fetch

### Mobile-First Considerations
- Sticky search bar at top for quick access
- Large tap targets for category switching
- One-handed reachable bottom navigation
- Swipe gestures for card navigation
- Pull-to-refresh for updating traffic data
- Progressive disclosure: Show essential info first, expand for details