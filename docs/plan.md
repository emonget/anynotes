***DISCLAIMER***
```
- Do not perform all remaining task in a row but only ones scoped within conversation, If in doubt ask if you should proceeed with remaining task 
- Tasks marked (`plan`) require discussion or approval before proceeding
- For any task involving drafting UI, make proposal first and eventually update file with ASCII representation of user agree
```

# Tasks
**layout**
- [x] move import, export buttons at top right of page with relevant icons
- [x] add gear icon next to import/export
- [ ] add copy/paste buttons next to settings, placed before (don't do implementation yet, see below for what actions these buttons will do)

**first time run: installation**
- [x] show installation instruction only if no previous installation was found in local storage:
- [x] replace step3 by: "press bookmarklet to complete installation"
- [x] when bookmarklet is pressed the first time, populate local storage and mark install as done (which will prevent showing installation isntructions next time)
- [x] replace installation instruction by successful installation message

**configuration, setup**
- [x] when clicking gear icon at top right, show config menu
- [x] allow clearing all data to come back to prior install state

**items**
- [x] allow items to be deleted

**sorting categories**
- [ ] (`plan`) based on specified [sorting criteria](specs/app.md#sorting-criteria) describe how new data model will look like for items stored in local storage
- [ ] (`plan`) draft [AdminPanel](specs/ui.md#adminpanel) UI
- [x] (`plan`) draft [EditPanel](specs/ui.md#editpanel)
- [ ] proceed with [AdminPanel](specs/ui.md#adminpanel) implementation
- [x] proceed with [EditPanel](specs/ui.md#editpanel) component