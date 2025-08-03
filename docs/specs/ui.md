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

## EditPanel
**component**

[EditPanel.tsx](/src/UI/EditPanel.tsx)

**purpose**

seeing and editing [ItemFields](app.md#data-model) of current selected item

**behavior**

- Appears when a user selects a bookmark from the list
- Remains open and updates its content when another item is selected, improving workflow for multiple edits.
- If a field is unset in local storage, it shows an empty or default value.
- The editable state of fields is determined by the [data model](model.md#main-fields).
- Non-editable fields (Title, URL, Saved At) are grouped under a "Page" section and use in-field icons for a cleaner look.
- Any user-updated field (other than `state`) automatically sets the item's `state` to `manual`.

**actions**
- **Undo button**: Reverts any modifications back to their original state. This button is disabled if there are no pending changes.
- **Save Changes button**: Persists all edited fields to local storage. This button is also disabled when there are no changes to save.

**layout**

╔══════════════════════════════════════════╗
║ Edit Bookmark                        [X] ║
╟──────────────────────────────────────────╢
║ ▼ Page                                   ║
║ │ [FileText] Title Text Here             │
║ │ [Globe]    https://example.com         │
║ │ [Calendar] 1/1/2025, 12:00:00 PM       │
║                                          ║
║ ▼ Topics                                 ║
║ │ +------------------------------------+ │
║ │ | [tag1] x  [tag2] x                 | │
║ │ | Add topic (press enter)            | │
║ │ +------------------------------------+ │
║                                          ║
║ ▼ Project                                ║
║ │ [Project Name Here                ]    │
║                                          ║
║ ▼ Source Type                            ║
║ │ [Select type                  ] [v]    │
║                                          ║
║ ▼ Importance                             ║
║ │ [Select importance            ] [v]    │
╟──────────────────────────────────────────╢
║                [ Undo ] [ Save Changes ] ║
╚══════════════════════════════════════════╝
