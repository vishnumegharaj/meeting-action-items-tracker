# User Interface & Flow Guide

This document explains the user interface and user flow of the Meeting Action Items Tracker.

## 🎨 Design Philosophy

- **Clean & Modern**: Minimal clutter, focus on functionality
- **Gradient Backgrounds**: Soft blue-to-indigo gradient for visual appeal
- **Card-Based Layout**: Information organized in clean white cards
- **Consistent Colors**: 
  - Primary: Indigo (#4F46E5)
  - Success: Green (#10B981)
  - Error: Red (#EF4444)
  - Info: Blue (#3B82F6)

## 📱 Pages Overview

### 1. Home Page (`/`)

**Purpose**: Landing page showing recent meetings and app overview

**Layout**:
```
┌─────────────────────────────────────────────┐
│  Header: Logo | Title | [New Meeting Btn]   │
├─────────────────────────────────────────────┤
│  How It Works Section                       │
│  ┌──────┐  ┌──────┐  ┌──────┐              │
│  │ Step │  │ Step │  │ Step │              │
│  │  1   │  │  2   │  │  3   │              │
│  └──────┘  └──────┘  └──────┘              │
├─────────────────────────────────────────────┤
│  Recent Meetings (Last 5)                   │
│  ┌─────────────────────────────────────┐   │
│  │ Meeting Title                       │   │
│  │ Date • X action items              →│   │
│  └─────────────────────────────────────┘   │
│  ┌─────────────────────────────────────┐   │
│  │ Meeting Title                       │   │
│  │ Date • X action items              →│   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

**Key Elements**:
- **New Meeting Button**: Primary call-to-action (top right)
- **How It Works**: 3-step visual guide
- **Recent Meetings**: Clickable list of last 5 meetings
- **Empty State**: When no meetings, shows message + CTA

**User Actions**:
- Click "New Meeting" → Go to New Meeting page
- Click any meeting → Go to Transcript Detail page
- Click Status icon (floating button bottom-right) → Go to Status page

---

### 2. New Meeting Page (`/new`)

**Purpose**: Form to paste meeting transcript and process it

**Layout**:
```
┌─────────────────────────────────────────────┐
│  [← Back] Process New Meeting               │
├─────────────────────────────────────────────┤
│                                             │
│  Meeting Title (optional)                   │
│  [_________________________________]        │
│                                             │
│  Meeting Transcript *    [Load Example]     │
│  ┌─────────────────────────────────────┐   │
│  │                                     │   │
│  │  Paste transcript here...          │   │
│  │                                     │   │
│  │                                     │   │
│  │                                     │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  💡 Tips for best results:                  │
│  • Include who said what                    │
│  • Mention due dates                        │
│  • AI identifies tasks automatically        │
│                                             │
│  [    Process Meeting Transcript    ]       │
└─────────────────────────────────────────────┘
```

**Key Elements**:
- **Title Input**: Optional meeting name
- **Transcript Textarea**: Large text area for pasting
- **Load Example Button**: Loads sample transcript
- **Tips Box**: Blue info box with helpful tips
- **Submit Button**: Processes transcript with AI

**User Actions**:
1. (Optional) Enter meeting title
2. Paste transcript OR click "Load Example"
3. Click "Process Meeting Transcript"
4. Wait for AI processing (loading spinner shows)
5. Redirect to Transcript Detail page with results

**States**:
- **Default**: Empty form ready for input
- **Loading**: "Processing transcript..." with spinner
- **Error**: Red error message if something fails

---

### 3. Transcript Detail Page (`/transcript/:id`)

**Purpose**: View transcript and manage action items

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  [← Back] Meeting Title          [X Open] [X Done]          │
├──────────────────────┬──────────────────────────────────────┤
│  Original Transcript │  Action Items      [+ Add Item]      │
│  ┌────────────────┐  │  [All] [Open] [Done]                │
│  │                │  │  ┌────────────────────────────────┐ │
│  │  Full meeting  │  │  │ ○ Task description             │ │
│  │  transcript    │  │  │   👤 Owner • 📅 Due date       │ │
│  │  text appears  │  │  │                    [✏️] [🗑️]  │ │
│  │  here in       │  │  └────────────────────────────────┘ │
│  │  monospace     │  │  ┌────────────────────────────────┐ │
│  │  font          │  │  │ ✓ Completed task               │ │
│  │                │  │  │   👤 Owner • 📅 Due date       │ │
│  │                │  │  │                    [✏️] [🗑️]  │ │
│  └────────────────┘  │  └────────────────────────────────┘ │
└──────────────────────┴──────────────────────────────────────┘
```

**Left Side - Transcript**:
- Shows original meeting transcript
- Scrollable if long
- Monospace font for readability
- Sticky position (stays visible while scrolling)

**Right Side - Action Items**:
- **Header**: Item counts (X Open, X Done)
- **Add Button**: Create new manual item
- **Filter Tabs**: All / Open / Done
- **Item List**: Each item shows:
  - Checkbox (click to toggle done/undone)
  - Task description
  - Owner icon + name
  - Calendar icon + due date
  - Edit button (pencil icon)
  - Delete button (trash icon)

**User Actions**:

**View Items**:
- Click filter tabs to show All/Open/Done items
- Scroll through list

**Mark Complete**:
- Click circle icon → Item marked done (green checkmark)
- Click checkmark → Item marked open (gray circle)

**Edit Item**:
1. Click edit (pencil) icon
2. Inline edit form appears
3. Modify task, owner, or due date
4. Click "Save" or "Cancel"

**Delete Item**:
1. Click delete (trash) icon
2. Confirm deletion prompt
3. Item removed

**Add Item**:
1. Click "+ Add Item" button
2. Form appears at top
3. Enter task, owner, due date
4. Click "Add"

**States**:
- **Loading**: Spinner while fetching data
- **Empty**: "No action items" message
- **Edit Mode**: Inline form for editing
- **Add Mode**: Form at top for adding

---

### 4. Status Page (`/status`)

**Purpose**: Monitor system health

**Layout**:
```
┌─────────────────────────────────────────────┐
│  [← Back] System Status                     │
├─────────────────────────────────────────────┤
│  ✓ System Operational        [Refresh]      │
│  Last checked: 2:30 PM                      │
├─────────────────────────────────────────────┤
│  ┌───────────────────────────────────────┐ │
│  │ 🖥️  Backend Server              ✓    │ │
│  │     Status: healthy                   │ │
│  │     Uptime: 45 minutes                │ │
│  └───────────────────────────────────────┘ │
│  ┌───────────────────────────────────────┐ │
│  │ 💾  Database                    ✓    │ │
│  │     Status: healthy                   │ │
│  └───────────────────────────────────────┘ │
│  ┌───────────────────────────────────────┐ │
│  │ 🤖  LLM Service                 ✓    │ │
│  │     Status: healthy                   │ │
│  │     Provider: Anthropic               │ │
│  │     Model: claude-sonnet-4            │ │
│  └───────────────────────────────────────┘ │
│                                             │
│  ℹ️ About System Health                     │
│  • Backend handles API requests             │
│  • Database stores meetings locally         │
│  • LLM extracts action items with AI       │
└─────────────────────────────────────────────┘
```

**Key Elements**:
- **Overall Status**: Green "Operational" or Red "Issues Detected"
- **Refresh Button**: Manually trigger health check
- **Service Cards**: 3 cards showing:
  - Backend Server status + uptime
  - Database status
  - LLM Service status + model info
- **Info Box**: Explains what each service does

**States**:
- **Healthy**: Green checkmarks, all systems go
- **Unhealthy**: Red X marks, error details
- **Loading**: Spinner while checking

---

## 🔄 User Flow

### Primary Flow: Process Meeting

```
Home Page
    ↓ [Click "New Meeting"]
New Meeting Page
    ↓ [Paste transcript + Submit]
    ↓ [AI Processing - 2-5 seconds]
Transcript Detail Page
    ↓ [View extracted items]
    ↓ [Edit/Delete/Complete items]
    ↓ [Click "Back"]
Home Page (updated with new meeting)
```

### Secondary Flow: View History

```
Home Page
    ↓ [Click any meeting]
Transcript Detail Page
    ↓ [Manage items]
    ↓ [Click "Back"]
Home Page
```

### Tertiary Flow: Check Health

```
Any Page
    ↓ [Click floating status icon]
Status Page
    ↓ [View system health]
    ↓ [Click "Back" or close]
Previous Page
```

---

## 🎯 Interactive Elements

### Buttons
- **Primary Actions**: Indigo background (`bg-indigo-600`)
- **Secondary Actions**: Gray background (`bg-gray-200`)
- **Danger Actions**: Red on hover (delete buttons)

### Icons
- **lucide-react** icons throughout
- Consistent sizing (w-5 h-5 for buttons, w-6 h-6 for headers)
- Hover states for interactivity

### Forms
- Border on focus: Indigo ring (`focus:ring-indigo-600`)
- Validation: Red error messages
- Required fields marked with *

### Feedback
- **Loading**: Spinning circle + text
- **Success**: Green indicators
- **Error**: Red backgrounds + messages
- **Empty States**: Friendly messages + suggestions

---

## 📱 Responsive Design

All pages are responsive:

- **Desktop (1024px+)**: 2-column layouts
- **Tablet (768px-1023px)**: Adapted 2-column
- **Mobile (<768px)**: Stacked single column

**Key responsive features**:
- Navigation collapses on mobile
- Cards stack vertically
- Touch-friendly button sizes
- Readable text at all sizes

---

## 🎨 Color Scheme

```
Primary:     #4F46E5 (Indigo 600)
Success:     #10B981 (Green 600)
Warning:     #F59E0B (Amber 500)
Error:       #EF4444 (Red 500)
Background:  #F9FAFB (Gray 50)
Text:        #111827 (Gray 900)
Muted Text:  #6B7280 (Gray 600)
```

---

## ⚡ Performance

- **Fast Page Loads**: React optimized builds
- **Smooth Transitions**: Tailwind transitions
- **Instant Feedback**: Optimistic UI updates
- **Minimal Re-renders**: Efficient state management

---

## ♿ Accessibility

- Semantic HTML elements
- Keyboard navigation support
- Color contrast ratios meet WCAG AA
- Clear focus states
- Descriptive button labels
