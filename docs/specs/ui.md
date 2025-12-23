# UI
## Install banner
* position: top middle 

## Search + filter bar (`draft`)
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
- **Action**: [copy logic](logic.md#copy) 

### Paste button
- **Icon**: ⎙
- **Action**: [paste logic](logic.md#paste)

### Settings button
- **Icon**: ⚙
- **Action**: Triggers [settings-dropdown](#settings-dropdown)

## Settings dropdown
**Contents**:
1. `Import`
2. `Export`
3. `[Admin Panel](#adminpanel)`
4. `[Preferences](#preferences)`

## Copy modal (`draft`)

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
- **Category Selection**: Clicking Topic or Project fields opens [CategoryPicker](#categorypicker) modal for selection and management.
- **Source Selection**: Clicking Source field opens [SourcePicker](#sourcepicker) modal for icon-based selection.

**layout**

╔══════════════════════════════════════════╗
║ Edit Bookmark                        [X] ║
╟──────────────────────────────────────────╢
║ ▼ Page                                   ║
║ │ [FileText] Title Text Here             │
║ │ [Globe]    https://example.com         │
║ │ [Calendar] 1/1/2025, 12:00:00 PM       │
║                                          ║
║ ▼ Topic                     [Finance]    ║
║                                          ║
║ ▼ Project                   [Personal]   ║
║                                          ║
║ ▼ Source                    [PenTool]    ║
║                                          ║
║ ▼ Importance         ☆ ☆ ☆ ☆ ☆          ║
╟──────────────────────────────────────────╢
║                [ Undo ] [ Save Changes ] ║
╚══════════════════════════════════════════╝

## CategoryPicker (`planned`)
### Selection Mode (default):

**component**

[CategoryPicker.tsx](/src/UI/CategoryPicker.tsx)

**description**

Category's option selector opening as overlay modal when Topic or Project field is clicked from [EditSidePanel](#edit-sidepanel)

**layout**

╔══════════════════════════════════════════╗
║ Select Topic                        [✏️] ║
╟──────────────────────────────────────────╢
║ [ Finance  ] [ DIY      ] [ Tech     ]   ║
║ [ Shopping ] [ Personal ] [ Work     ]   ║
║                                          ║
║                              [ Close ]   ║
╚══════════════════════════════════════════╝

**purpose**
- Category's option selector 
- Add/edit/delete category options

**behavior**
- Opens as overlay modal when Topic or Project field is clicked from [EditSidePanel](#edit-sidepanel)
- Toggled edit mode when user click pen
- Changes are saved immediately to local storage
- Modal closes on outside click, close button, or selection

**actions**

- **Click option**: Selects category and closes modal
- **Click pen icon**: Switches to [edit mode](#edit-mode)
- **Click selected option again**: Deselects category

### Edit Mode:

**description**

Category's option editor when edit button is clicked from [Select](#selection-mode-default)

**layout**

╔══════════════════════════════════════════╗
║ Edit Topics                         [✓] ║
╟──────────────────────────────────────────╢
║ [ Finance  ][×] [ DIY      ][×]          ║
║ [ Tech     ][×] [ Shopping ][×]          ║
║ [ Personal ][×] [ Work     ][×]          ║
║                                          ║
║ [ Type new topic...                  ]   ║
║                                          ║
║                              [ Close ]   ║
╚══════════════════════════════════════════╝

**actions**
- **Click existing tag**: [update option](logic.md#update-option)
- **Click [×]**: [remove option](logic.md#remove-option)
- **Type in text field and press enter**:  [add option](logic.md#add-option) (inline tag-style)
- **Click checkmark**: Return to selection mode

## SourcePicker (`planned`)

**component**

[SourcePicker.tsx](/src/UI/SourcePicker.tsx)

**description**

Icon-based compact picker (similar to color picker interface) displayed as overlay modal when source field is clicked from [EditSidePanel](#edit-sidepanel)
 
**purpose**

Allow picking unique prededefined source type

**behavior**

- only one source type pick allowed
- hovering icon shows tooltip with textual source type
- closes on outside click, close button, or selection

**layout**

```
+---------------------------+
| Select Source Type        |
+---------------------------+
|  [📝] [📰] [🔧] [❓]      |
|  [👁] [💼] [🌐] [📚]      |  
|  [📦]                     |
+---------------------------+
```

**Source Type Icons mapping:**
- **Blog**: `PenTool`
- **Article**: `Newspaper`  
- **Tool**: `Wrench`
- **Other**: `HelpCircle`
- **Showcase**: `Eye`
- **Portfolio**: `Briefcase`
- **Site**: `Globe`
- **Tutorial**: `BookOpen`
- **Resource**: `Archive`

## Left Side Bar (LSB) (`draft`)

Type
- Urgent (only items with 4-5 stars importance)
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