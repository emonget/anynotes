# Manual sorting

- user export unsorted items + current categories from `dropzone`
- AI will sort provided items into current categories and return output at expected format
- user reimport new items into `dropzone`

# Auto-sorting v1
## Description

This will automize sorting, to avoid user having to manually sort items himself.
Based on sorting categories user previously defined, AI will attempt to match best category to assign unsorted items.

## Data flow
To reduce complexity at this stage, user will manually pass data from APP to external AI and inversedly:
- provide data to external AI through copying
- reimport sorted data to app by pasting


APP <-> User <-> AI interactions

 **APP to AI data flow**
Aim is giving user ability to provide `APP` data to external `AI` service which will perform processing on the data (see `AI prompts presets` section )

For that `COPY` button will copy data stored in local storage to clipboard (similarly to data exportation) along with prompting instructions so AI can perform sorting and return data at expected format.

```typescript
// Data export contract format
categories[], 
items[]
```

**AI to APP flow back**

AI --user-> APP

```typescript
// Data import contract format
{
    category1: items1[], 
    category2: items2[]
}
```

`paste` will be simpler than `copy` as as it will automatically determine from the data paster what action to perform. This feature will be used to enable user to provide AI answer back to Dropzone, which will update local storage data accordingly.


## AI prompt

Prompt that will be sent along with the data to instruct AI what processing to do on provided data
AI will have to respect the specified format for the output.

So the prompt will be defined by
- input format description
- expected output format
- processing to perform on data

`IN`: unsorted items + sorting categories -> `AI` processing -> `OUT`: sorted items

An example speaks more than long instructions:

unsorted item -> sorted item


# Auto-sorting v2

## Concept

When users begin adding links, they are initially stored in an `unsorted` state within the database.

As soon as users create their first categories and begin manually sorting items, an automatic sorting process will be triggered. Based on how the user categorizes and assigns items, the algorithm will begin predicting which links belong to which categories. This helps reduce manual work and gradually transitions items from the `unsorted` state to an `ordered` state.

The algorithm assesses the **relevance** of each item against existing user-defined categories and topics. It attempts to match content with the closest semantic or contextual fit.

Whenever the user adds new categories or reassigns items, the algorithm updates accordingly—continuously refining its sorting logic. The more detailed and accurate the user's input (e.g., topics, projects), the better the system becomes at automatic categorization.

## Sorting model

***Sorting reference model = ground truth**

Defined by both:
- user defined sorting categories, 
- items sorted manually by user

This is the model that will serve as reference for AI to sort all other items

## Steady state
**definition**

Model version hasn't changed since last sorting meaning all sorted items are in sync with current model.

**behavior**

When user copy data, only unsorted items will be copied along with model (sorting categories and manual sorted items).
AI will perform sorting and return sorted items

> unsorted items + model => sorted items

**Manual sorted items: model reinforcement**

Additional to sorting categories, user can sort items manually which will confirm what should be placed in each sorting categories

**manual vs auto sorting distinction**

Any items manually sorted by user will be flagged as manual. 
This will allow to distringuish between items that were manually sorted by user, from items that were automatically sorted by algorithm

## Tansient state

### User manual change

Occurs any time user makes manual changes:
- any sorting categories change
- any manual sorting performed on item (either unsorted, manual or auto) 

### Changes propagation
Any model change could potentially impact previously sorted items (both manual or auto sorted), so both have to be verified and updated if needed.

Auto-sorting being based on combination of categories + manual sorting, manual sorting must be consistent to be used by auto-sorting.
Due to manual change possibly impacting manually sorted items, verification and updating of manually sorted itms will be perfomed, before auto-sorted items begins.

#### manually sorted items

***simplification***

as a simplification user will perform manual items validation.
After making [User manual change](#user-manual-change), user will be prompted to check all current manually sorted items

***/simplification***

***planned***

A diff reflecting changes user made will be produced. It will contain:
- diff of category changes
- for each changed items, diff of item's categories 

Based on that diff, AI will be prompted to determine if any previous manually sorted items are outdated.
For any item considered as outdated and requiring to be moved to another category, user will be asked to confirm or reject these changes.


***/planned***

Once updated model is consistent, this will be become sorting model reference which can be used to sort remaining [auto-sorted items](#auto-sorted-items) will begin

#### auto-sorted items

After changes have been propagated to [manually-sorted items](#manually-sorted-items) and sorting model is consistent, all remaining auto-sorted items will be processed to check if last model changes impact any previsouly auto sorted items, meaning all items must be matched against latest model

For that user will pass all sorted items along with updated model, so AI compare actual sorting with new model.
AI will only return any items changes, if no change nothing will be returned.

**draft: user approval + multi-pass**

user approval: At the end of sorting process, AI will show changelog of items which were moved into different category.

after AI has determined which auto-sorted items required updating, these changes will be presented to user so it validate them.
After reviewing change, if user reject a change, auto sorted item will be become manuel, which will update model again, and requires to go back [manually-sorted items](#manually-sorted-items).
This will start a another changes propagation pass

This will repeat process until stabilized.

### Extended prompts

**Model changes impact eval**
Consequently to manual changes performed by user, 

**Model application: resync auto-sorted items**
Then it will be required to check if last model changes impact any previsouly auto sorted items, meaning all items must be matched against latest model

For that user will pass all sorted items along with updated model, so AI compare actual sorting with new model.
AI will only return any items changes, if no change nothing will be returned.
These changes will be presented to user so it validate them
From these changes user can accept or reject them.
If user reject a change, auto sorted item will be become manuel, hence updating model again.

**Model regular use: unsorted items**
Only when current state is stable, meaning model has 


