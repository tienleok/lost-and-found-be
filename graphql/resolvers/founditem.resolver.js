const FoundItem = require('../../models/foundItem')

function foundItems () {
  return FoundItem
    .find({})
    .populate('comments.user')
    .populate('votes.user')
    .populate('reportedBy')
    .populate('claimedBy')
    .populate('matchedTo')
}

function foundItem (args) {
  return FoundItem
    .findById(args.id)
    .populate('comments.user')
    .populate('votes.user')
    .populate('reportedBy')
    .populate('claimedBy')
    .populate('matchedTo')
}

function createFoundItem (args) {
  const foundItem = new FoundItem(args.foundItemInput)
  return foundItem.save()
}

function deleteFoundItem (args) {
  return FoundItem.findByIdAndRemove(args.id)
}

function updateFoundItem (args) {
  return FoundItem.findByIdAndUpdate(args.id, args.foundItemInput, { new: true })
}

module.exports = {
  Query: {
    foundItems: () => foundItems(),
    foundItem: (_, args) => foundItem(args)
  },
  Mutation: {
    createFoundItem: (_, args) => createFoundItem(args),
    updateFoundItem: (_, args) => updateFoundItem(args),
    deleteFoundItem: (_, args) => deleteFoundItem(args)
  }
}
// module.exports = { foundItems, foundItem, createFoundItem, deleteFoundItem, updateFoundItem }
