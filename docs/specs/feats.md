# Main features

## Install

[Install banner](ui.md#install-banner) is showed first time app is run to instruct user dragging bookmarklet in its bookmark bar.
After first use, [settings field](model.md#local-storage-json-format) is initialized in local storage, 
and [install](#install) will be replaced with [query](#query).

## Copy
[copy button](ui.md#top-right-toolbar)

This will copy data from local storage to clipboard.

By default, output format is `JSON`, so depending on target, user may have to manually convert data to target's format (for instance from `JSON` to `CSV`)

## Paste
[paste button](ui.md#top-right-toolbar)

This will paste date from clipboard into the app.

Expected format is `JSON` so depending on source, prior to pasting, manual conversion from source format (like `CSV`) to `JSON` may be required 

## Edit
Allows viewing and editing the data of a selected item through the [item view/edit panel](ui.md#itemdetailspanel).
Allow configuring [user-defined categories](#category-management)

## Query
Querying specific items

[filter/search bar](ui.md#)

## Sort

[sorting specs](sorting.md)

## Manage

Allow managing (add/edit/delete) user-defined category's options through [CategoryPicker/EditmMode](ui.md#edit-mode).

## Backup
Backup data:
- local: export
- cloud: github gists?

## Sync

Data sync across different devices, browsers.

Sync methods:
- websockets?
- git versioning? 

## Cleanup assistant

Auto suggest nolonger relevant data that could be removed with explicit user approval.

## External tools integration
### AI service
avoid user to do manual copy/paste of data
### Notion
local storage alternative, allowing to store, administrate, sync over Notion table
### Github
Allow for syncing/saving data in the cloud


## Data grouping, linking, duplicate 

### Duplicate detection

Exact same resource posted several times

User approval: this was already saved previously: what you'd like to do?
    `cancel`, `replace`, `update`, `keep all`

### Grouping

While saving new page check if previously saved page belongs to same author, site, company, 

Grouping will be based on following criteria

**same site**
most obvious grouping criteria for pages sharing same url

**same author**

cross-platforms matching : ability to associate resources from same author across several platforms like twitter, youtube, personal blog,

Author grouping could be based upon
- username match: same username used across several platforms (twitter, youtube, ...)


**same subject**

exact same subject covered, like specific product

will automatically group links which are talking of the same subject

examples:
- articles reviewing exact same video games, product
- recipes for same meal

AI could rank based on proximity 
- exact same model like Ampli Tuner NAD...
- same subcategory Audio Amplifier
- same category: Audio

Base on that, AI could suggest several grouping level based on proximity, and user can decide at which level to group 

### Relational linking

AI analysis to do related topics linking which were not directly included in original topic

AI could make connections accross several domains.
a project could involve several areas not directly belonging to same category but still linked.

For instance, building DIY project could involve several areas not directly linked like `electronics`, `mecanical`, `software`, `tools`, ...
or even `business` side if intending to sell the product.

Example: e-bike related area
- battery building topics
- ebike parts: fork, wheels, brakes


# Misc features
- allow to flag items as urgent, ...
- allow to put reminder on important items (deadline, alerts, reminders)
- have a separate list with specific tasks requiring attention in short term (30 days)
- Youtube interaction: Bookmarklet to send current youtube playlist to dropzone. Dropzone will automatically recognize it
- user defined prompts: Allow user to specify his own prompts to organize items

# Random feats ideas

# Features draft
## Random
- mobile integration for use like [Random pictures/videos taking](#random-picturesvideos-taking), [random notes taking](#random-notes-taking)

**Usecases**
- take a picture from phone: if text info, send as text into dropzone
- write random note on phone: auto send to dropzone

## Random pictures/videos taking

### per usecase approach
User can define several usecase per pictures, videos he takes and specify actions based on it
- random text info: picture doesn't matter, only text is relevant => just send text that was recognised from image
- random picture: quality doesn't matter= like restaurant menu, contact details card => send low res of picture 
- annonce le bon coin: downsize, reduce image size
- video (screencast) to be shared on discord => reduce video size 


## Random notes taking

**Sorting behavior**
- By default will go as random unsorted notes
- User can manually categorize note based on previous notes categories
- AI can automatically sort item based on previous user notes


## Contextual Guessing

The AI aims to infer **why** a user visited a particular link based on prior behavior and context. Typically, users browse with intent—researching for a specific project, solving a problem, or exploring related content.

For example:
If a user is planning to build something and visits multiple technical pages, the AI can deduce that the links are tied to that project. It will then suggest categorization aligned with the user’s intent or goal.

Key behaviors:

* Understands project context and link relevance.
* Identifies connections between items (e.g., like LinkedIn’s "degrees of connection") to determine how closely related one item is to another.

## Content suggestions
Based on current user's topics (center of interests), project context, saved pages, 
AI can explore and suggest new items which could be relevant (similar to `YT` algorithm which makes videos suggestions)


## Sorting categories suggestions 
- user export all items + current categories from the `app`
- AI will suggest relevant categories that user can refine
- once confirmed, AI sort all items into each category and return output at expected format
- user reimport data into `app`


