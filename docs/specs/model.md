# Sorting categories

```typescript
enum SortingCategory {
    Topic,
    Source,  
    Project,
    Interest,
    Importance,

} 

type SortingCategoriesDef = Record<SortingCategory, string[]>
```

## fields
### Topic/subject**

***user defined*** ***multi*** topics/subjects

### Source type

***predefined*** ***unique*** source type

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

***user defined*** projects

### Interest

item's interest, relevance `low`,`mid`,`high`

### Importance

item's importance, urgency `low`,`mid`,`high`

### Purpose

***predefined*** reasons for saving a specific page

- `keep-for-later`: something we want to keep to refer to it later (like `stackoverflow` answer, ), 
- `well-made`: tutorial we found well made, ..``
- `read-later`: procrastination mode 

### Linking/grouping

related/similar items can be grouped together using `groupId`
This allows for linking items: same user twitter, github, youtube channel

# Item
## sorting state
```typescript
enum SortingState {
    Unsorted,
    Manual,
    Auto
}
```

## sorting fields
```typescript
type SortingFields = Record<SortingCategory, string>
```

## main fields
```typescript

type Item = {
  id: string
  title: string
  url: string
  savedAt: string   // non editable field
  categories: ItemCategories
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