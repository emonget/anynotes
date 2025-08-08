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

## Edit SidePanel
**component**

[EditSidePanel.tsx](/src/UI/EditSidePanel.tsx)

**purpose**

- seeing and editing item's [categories](./model.md#page) of current selected item
- configure user-defined [categories](model.md#categories) (Topics and Projects)

**behavior**

- Appears when a user selects a bookmark from the list
- Remains open and updates its content when another item is selected, improving workflow for multiple edits.
- If a field is unset in local storage, it shows an empty or default value.
- The editable state of fields is determined by the [page model](model.md#page).
- Non-editable fields (Title, URL, Saved At) are grouped under a "Page" section and use in-field icons for a cleaner look.
- Any user-updated field (other than `state`) automatically sets the item's `state` to `manual`.

**actions**
- **Undo button**: Reverts any modifications back to their original state. This button is disabled if there are no pending changes.
- **Save Changes button**: Persists all edited fields to local storage. This button is also disabled when there are no changes to save.
- **Category Configuration (⚙ icon)**: Available only for user-defined categories (Topics and Projects). Clicking opens [configuration interface](#category-configuration-modal) to manage available options for that category type.

**layout**

╔══════════════════════════════════════════╗
║ Edit Bookmark                        [X] ║
╟──────────────────────────────────────────╢
║ ▼ Page                                   ║
║ │ [FileText] Title Text Here             │
║ │ [Globe]    https://example.com         │
║ │ [Calendar] 1/1/2025, 12:00:00 PM       │
║                                          ║
║ ▼ Topics                             ⚙ ║
║ │ +------------------------------------+ │
║ │ | [tag1] x  [tag2] x                 | │
║ │ | Add topic (press enter)            | │
║ │ +------------------------------------+ │
║                                          ║
║ ▼ Project                            ⚙ ║
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

## Category Configuration Modal

**component**

[CategoryConfModal.tsx](/src/UI/CategoryConfModal.tsx)

**purpose**
Manage available options for user-defined categories (`Topics` and `Projects`)

**behavior**
- Opens as overlay modal when gear icon is clicked from [EditSidePanel](#edit-sidepanel) in front of user defined category
- Shows current category options populated from [local storage](./model.md#local-storage-json-format) for specified category
- Allows edit/delete existing options and adding new category options
- Changes are saved immediately to local storage
- Modal closes on outside click or close button

**layout**

╔══════════════════════════════════════════╗
║ Configure [Category Name]            [X] ║
╟──────────────────────────────────────────╢
║ Current Options:                         ║
║                                          ║
║ • Finance                           [×]  ║
║ • DIY                               [×]  ║
║ • DEV                               [×]  ║
║ • TECH                              [×]  ║
║ • Shopping                          [×]  ║
║                                          ║
║ ┌────────────────────────────────────┐   ║
║ │ Add new option...                  │   ║
║ └────────────────────────────────────┘   ║
║                                          ║
║                              [ Close ]   ║
╚══════════════════════════════════════════╝

**actions**
- **[×] Delete**: Removes category option (with confirmation if used in existing bookmarks)
- **Add new option field**: Press Enter to add new category option
- **Close button**: Saves changes and closes modal

## Left Side Bar (LSB) (`draft`)

Type
- Urgent (only items with `high` importance)
- Relevant (only items with `high` relevance)

### Root Topics View

- Finance
- DIY
- DEV
- TECH
- Shopping
- Random
- Fishing
- Ebikes
- Boring (admin, ...)

### Project view
***Project #1***
Current project: Project#1

Cat/SubCat
- DIY/Elec
- DIY/Meca
- DIY/SW
- DIY/Tools

***Project #2***
Current project: Project#2

Cat/SubCat
- DEV/3D
- 