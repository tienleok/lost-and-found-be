const LostItem = require('../../models/lostItem')

function lostItems () {
  return LostItem.find({})
}

function lostItem (args) {
  return LostItem.findById(args.id)
}

function createLostItem (args) {
  const item = new LostItem(args.lostItemInput)
  return item.save()
}

function deleteLostItem (args) {
  return LostItem.findByIdAndRemove(args.id)
}

function updateLostItem (args) {
  return LostItem.findByIdAndUpdate(args.id, args.lostItemInput, { new: true })
}

module.exports = {
  Query: {
    lostItems: () => lostItems(),
    lostItem: (_, args) => lostItem(args)
  },
  Mutation: {
    createLostItem: (_, args) => createLostItem(args),
    updateLostItem: (_, args) => updateLostItem(args),
    deleteLostItem: (_, args) => deleteLostItem(args)
  }
}
