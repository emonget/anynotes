# UI
## Install banner
* position: top middle 

## Search + filter bar
Filtering/search items from the list
* position: top middle
* elements: [search-field](#search-field) + [search-filters](#search-filters)

### Search field
auto filter items from the list behavior

### Search filters

## Items list
Showing visible items as a list
* position: middle

## Toolbar
- **Position**: top right (horizontal layout)
- **Elements**:
  - `[copy-button](#copy-button)`
  - `[paste-button](#paste-button)`
  - `[settings-button](#settings-button)`

### Copy button
- **Icon**: ⎘
- **Action**: Shows [copy-modal](#copy-modal)

### Paste button
- **Icon**: ⎙
- **Action**: Imports from clipboard

### Settings button
- **Icon**: ⚙
- **Action**: Triggers [settings-dropdown](#settings-dropdown)

## Settings dropdown
**Contents**:
1. `Import`
2. `Export`
3. `[Admin Panel](#adminpanel)`
4. `[Preferences](#preferences)`

## Copy modal

will propose various options for copying data:
- `Notion/`: CSV data that can be imported within notion as table
- `Github`: JSON data that can be backuped in `Gist`
- `AI`: JSON + prompt instruction to perform processing on input data

## AdminPanel
**Purpose**: Configure category values in [SortingCategoriesDef](model.md#fields)

**Behavior**:
- Access: Via Settings dropdown → "Admin Panel"
- Type: Modal overlay (blocks main UI)
- Actions: Requires explicit save/discard

**suggested layout**

╔══════════════════════════════════════════╗
║ AnyDrop - Categories              [x]    ║
╠══════════════════════════════════════════╣
║                                          ║
║  ╭────────────────────────────────────╮  ║
║  │ • Topics                           │  ║
║  │   - Electronics         [✎] [🗑️]   │  ║
║  │   - Cooking             [✎] [🗑️]   │  ║
║  │                                    │  ║
║  │   [+ Add New Topic ]               │  ║
║  ╰────────────────────────────────────╯  ║
║                                          ║
║  ╭────────────────────────────────────╮  ║
║  │ • Source Type                      │  ║
║  │   - Blog ▾                         │  ║
║  │   - Tutorial ▾                     │  ║
║  ╰────────────────────────────────────╯  ║
║                                          ║
║        [💾 Save]      [🗙 Discard]        ║
╚══════════════════════════════════════════╝

## ItemDetailsPanel
**component**

[ItemDetails.tsx](/src/UI/ItemDetailsPanel.tsx)

**purpose**

seeing and editing [ItemFields](app.md#data-model) of current selected item

**behavior**

- should appear anytime user select an item from bookmark list
- if unset in local storage field should show empty value or default
- updated fields will be saved to local storage once user save changes
- any field updated by user will update corresponding field in local storage once user save changes
- any updated fields other than `state` will automatically set `state` field to `SortingState.Manual`

**layout**

***insert ASCII art layout proposal here***