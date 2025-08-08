***DISCLAIMER***
read common [guidelines and conventions](/guidelines.md) before starting

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

**FEAT: EditSidePanel**
- [x] (`plan`) based on specified [page fields](specs/model.md#page) describe how data will be stored in [local storage](specs/model.md#local-storage-json-format)
- [x] (`plan`) draft [EditSidePanel](specs/ui.md#editsidepanel)
- [x] proceed with [EditSidePanel](specs/ui.md#editsidepanel) component

> next
**FEAT: CategoryConfModal**
- [x] [`specs`] define how categories will be handled (string, uuid) and stored in[local-storage](specs/model.md#local-storage-json-format).
- [x] [`specs`] specify what will happen when user add, change, or delete category option in [category management](specs/feats.md#category-management) section
- [ ] [`impl`] update Bookmark type interface to use ID-based categories structure
- [ ] [`impl`] implement localStorage category options management (load/save/delete)  
- [ ] [`impl`] implement CategoryConfModal with UUID generation and localStorage integration
- [ ] [`impl`] update EditSidePanel to display category names from IDs and integrate with localStorage
- [ ] [`impl`] implement category deletion with bulk bookmark updates