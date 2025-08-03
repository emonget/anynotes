# Shared, common, global
## Level
```typescript
enum Level {
    Low,
    Mid,
    High
}
```

# Page

```typescript

type PageCategories = Record<PageCategory, string>

type Page = {
  id: string          // non-editable
  title: string       // non-editable
  url: string         // non-editable
  savedAt: string     // non-editable
  categories: PageCategories
  groupId: string   // group several items 
  state: SortingState
}
```

## Id

## Title

## Link/url

## Date

## State
```typescript
enum SortingState {
    Unsorted,
    Manual,
    Auto
}
```

## Cat

```typescript
enum PageCategory {
    Topic,      // user-defined
    Source,     // pre-defined
    Project,    // user-defined
    Interest,   // pre-defined
    Importance, // pre-defined

} 

type SortingCategoriesDef = Record<PageCategory, string[]>

```

### Topic/subject**

***user-defined***

### Source type

***pre-defined***

```typescript
enum SourceType {
    Blog,
    Showcase,
    Portfolio,
    Site,
    Tutorial,
    Article,
    Resource,
    Tool,
    BlogArticle = "blog-article"    // Blog/article
}
```

### Project

- type: ***user-defined***
- multiple: ?

### Interest/relevance
- role: interest/relevance
- type: [Level](#level)

### Importance/urgency
- role: importance/urgency
- type: [Level](#level)

### Purpose

***predefined*** reasons for saving a specific page

```typescript
enum Purpose {
    KeepForLater= 'keep-for-later', // something we want to keep to refer to it later (like `stackoverflow` answer, )
    WorthSee='worth-see', // tutorial we found well made, ..
    ReadLater='read-later'  // procrastination mode
}
```

### Linking/grouping

related/similar items can be grouped together using `groupId`
This allows for linking items: same user twitter, github, youtube channel


# Local storage json format
This fields will be stored in local storage

```json
{
    "bookmarks": [],    // items
    "sortingFields": {},   // 
    "settings": {
        "save-confirmation": true   // showing save confirmation popup inside saved page
    }
}
```

# AI data exchange format