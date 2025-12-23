# Auto match
[legacy](sort.md)

## Concept
### Basic
From a list of user-defined categories [](model.md#categories), AI will automatically assign items to closest matching category.

In basic version items sorting will be solely based on current categories available.
```
                        +------+
unsorted items  ----->  |      |
                        |  AI  | -----> sorted items
categories      ----->  |      |
                        +------+
```

### Advanced
**Training data**
Addtional to user-defined categories, user could override AI assignations. AI will use these user manual assignations as its future training dataset to refine how each items should be assigned to specific category.
This would improve matching accuracy over time.

The matching will be defined by:
categories + dataset + items

```
                            +------+
unsorted items       ---->  |      |
                            |  AI  | -----> sorted items
categories + dataset ---->  |      |
                            +------+
```

## Edge cases
**multiple matching categories**

Options:
- single match
- multi-match 

In case of single category match restriction several options:
- choose most specific category
- choose most representative category
- make sure categories are built to avoid as much as possible overlaps, ambiguities.
