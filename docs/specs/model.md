# Shared, common, global
## Level
```typescript
enum Level {
    Low,
    Mid,
    High
}
```

# Categories

```typescript
enum CategoryType {
    Topic,      // user-defined
    Source,     // pre-defined
    Project,    // user-defined
    Interest,   // pre-defined
    Importance, // pre-defined

} 

type CategoryOptions = Record<CategoryType, string[]>

```

## Topic/subject**

***user-defined***

## Source type

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

## Project

- type: ***user-defined***
- multiple: ?

## Interest/relevance
- role: interest/relevance
- type: [Level](#level)

## Importance/urgency
- role: importance/urgency
- type: [Level](#level)

## Purpose

***predefined*** reasons for saving a specific page

```typescript
enum Purpose {
    KeepForLater= 'keep-for-later', // something we want to keep to refer to it later (like `stackoverflow` answer, )
    WorthSee='worth-see', // tutorial we found well made, ..
    ReadLater='read-later'  // procrastination mode
}
```

## Linking/grouping

related/similar items can be grouped together using `groupId`
This allows for linking items: same user twitter, github, youtube channel


# Page

[categories](#categories)

```typescript

enum SortingState {
    Unsorted,
    Manual,
    Auto
}

type Categories = Record<CategoryType, string>

type Page = {
  id: string          // non-editable
  title: string       // non-editable
  url: string         // non-editable
  savedAt: string     // non-editable
  categories: Categories
  groupId: string   // group several items 
  state: SortingState
}
```


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