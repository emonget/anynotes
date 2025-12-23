# Logic side
## Copy/paste
### Copy
copy content from local storage into clipboard as json

### Paste
paste content from clipboard and override data in localstorage 

## Categories edition
### Add option
- Generate UUID for new option
- Add [CategoryOption](model.md#categories) in [localStorage.categoryOptions](model.md#local-storage-json-format)

### Update Option  
- Update `name` field in [localStorage.categoryOptions](model.md#local-storage-json-format)

### Remove Option
- Remove option from [localStorage.categoryOptions](model.md#local-storage-json-format)
- Update all bookmark items to remove deleted ID from their category arrays