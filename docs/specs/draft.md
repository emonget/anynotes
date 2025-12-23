# Specs Draft

## CategoryPicker Component

### Current State
- Topics: Multi-select tag input with configuration modal
- Project: Single text input with configuration modal  
- Source: Dropdown with predefined text options

### Proposed Change
Unified category selection system where all three use single-select pickers:
- **Topic**: Single selection from user-defined textual options
- **Project**: Single selection from user-defined textual options
- **Source**: Single selection from predefined icon options

### UI Layout
All categories display as single selected value with click-to-change behavior (gear icons removed):

```
| > Topic                     [Finance]     |
| > Project                   [Personal]    |  
| > Source                    [PenTool]     |
```

### CategoryPicker Modal
Shared component that adapts based on category type. Opens when clicking any category field.

#### For Topic/Project (User-defined text options):

**Selection Mode (default):**
```
+---------------------------+
| Select Topic         [✏️] |
+---------------------------+
| [ Finance  ] [ DIY      ] |
| [ Tech     ] [ Shopping ] |
| [ Personal ] [ Work     ] |
+---------------------------+
```

**Edit Mode (click pen icon):**
```
+---------------------------+
| Edit Topics          [✓] |
+---------------------------+
| [ Finance  ][×] [ DIY      ][×] |
| [ Tech     ][×] [ Shopping ][×] |
| [ Personal ][×] [ Work     ][×] |
+---------------------------+
| [ Type new topic...    ] |
+---------------------------+
```

#### For Source (Predefined icons):
```
+---------------------------+
| Select Source Type        |
+---------------------------+
|  [📝] [📰] [🔧] [❓]      |
|  [👁] [💼] [🌐] [📚]      |  
|  [📦]                     |
+---------------------------+
```

### Source Type Icons
- **Blog**: `PenTool` - represents writing/blogging
- **Article**: `Newspaper` - represents articles/news content  
- **Tool**: `Wrench` - represents software tools/utilities
- **Other**: `HelpCircle` - represents miscellaneous content
- **Showcase**: `Eye` - represents visual demonstrations
- **Portfolio**: `Briefcase` - represents personal work collections
- **Site**: `Globe` - represents websites
- **Tutorial**: `BookOpen` - represents learning content
- **Resource**: `Archive` - represents reference materials

### CategoryPicker Component Props
```typescript
interface CategoryPickerProps {
  type: 'topic' | 'project' | 'source';
  value?: string; // selected option ID or name
  options: CategoryOption[] | SourceIcon[]; // user-defined or predefined
  onSelect: (value: string | undefined) => void;
  onAddNew?: (name: string) => void; // only for topic/project
  isOpen: boolean;
  onClose: () => void;
}
```

### Behavior
- Click category field -> opens CategoryPicker modal
- **Text categories (Topic/Project)**:
  - **Selection Mode (default)**: Grid of text rectangles with current selection highlighted
    - Click option -> selects and closes modal
    - Click pen icon -> switches to edit mode
  - **Edit Mode**: 
    - Shows delete [×] buttons next to each option
    - Click option -> rename inline
    - Click [×] -> delete option (with confirmation)
    - Text input field for adding new options (Enter to create)
    - Click checkmark -> back to selection mode
- **Icon categories (Source)**:
  - Grid of icons only (no text labels)
  - Hover shows tooltip with source type name
  - Click icon -> selects and closes modal
  - Current selection highlighted with border/background
- Click outside modal -> closes without changes
- Allow deselecting by clicking selected option again

### Implementation Notes
- Single reusable component that adapts to category type
- Consistent modal positioning and styling
- User-defined categories stored in localStorage
- Source icons are predefined and not user-configurable
- Gear icons removed from main UI (editing handled in picker)

