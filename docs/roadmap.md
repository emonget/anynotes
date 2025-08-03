
# Scope, split
## MVP#1
**usecases**
- can bookmark any pages using bookmarklet
- can copy/export data (to manually sort items in external tool like `Notion table`, or backup into private `Github Gists` )
- can paste/import data to restore/update data

-------------------------------------------------

## MVP#2
**usecases**
- can set sorting categories within the app
- can manually sort items within the app by editing item's sorting fields

**other feats**
- support for copying data as `JSON` or `CSV` format (`JSON` -> `CSV` conversion)
- support for pasting data from `JSON` or `CSV` format (`CSV` -> `JSON` conversion)


-------------------------------------------------

## APP v1
**usecases**
- can auto-sort items using AI external service
- can query data
- can visualize data

-------------------------------------------------

## APP v2

- advanced auto-sorting
- full integration with AI services and cloud
- sync

# 📆 Suggested Timeline

---

**Gantt chart** 

```mermaid
gantt
    title Product Roadmap
    dateFormat  YYYY-MM-DD
    axisFormat  %d %b

    section 🎯 Kickoff
    🧪 POC        :poc,    2025-07-15, 1w
    📄 Specs      :specs,    2025-07-23, 1w

    section 🥇 MVP
    Manual-sort         :mvp1,   2025-08-01, 1w

    section 🥈 Full app
    Auto-sort :app1,  2025-08-08, 1w
    Query+Vis           :app2,  2025-08-15, 1w

    section 🚀 Next
    Cloud integration        :next1,  2025-09-01, 2w
    Auto-sort II            :next2,  2025-09-15, 2w

```
**Timeline**
```mermaid
timeline
    title Product Roadmap Timeline

    2025-07-15 : 🧪 POC
    2025-07-23 : 📄 Specs
    2025-08-01 : 🥇 MVP - User-sort
    2025-08-08 : 🥈 Full app - Auto-sort
    2025-08-15 : 🥈 Full app - Query+Vis
    2025-09-01 : 🚀 Next - Cloud integration
    2025-09-15 : 🚀 Next - Auto-sort II


```