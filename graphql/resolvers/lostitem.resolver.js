const LostItem = require('../../models/lostItem')

function lostItems () {
  return LostItem
    .find({})
    .populate('comments.user')
    .populate('votes.user')
    .populate('reportedBy')
    .populate('matchedTo')
    .populate('possibleMatches')
}

function lostItem (args) {
  return LostItem
    .findById(args.id)
    .populate('comments.user')
    .populate('votes.user')
    .populate('reportedBy')
    .populate('matchedTo')
    .populate('possibleMatches')
}

function createLostItem (args) {
  const lostItem = new LostItem(args.lostItemInput)
  return lostItem.save()
}

function deleteLostItem (args) {
  return LostItem.findByIdAndRemove(args.id)
}

function updateLostItem (args) {
  return LostItem.findByIdAndUpdate(args.id, args.lostItemInput, { new: true })
}

function clearLostItemsPossibleMatches () {
  LostItem.updateMany({}, { $unset: { possibleMatches: 1 } })
}

module.exports = {
  Query: {
    lostItems: () => lostItems(),
    lostItem: (_, args) => lostItem(args)
  },
  Mutation: {
    createLostItem: (_, args) => createLostItem(args),
    updateLostItem: (_, args) => updateLostItem(args),
    deleteLostItem: (_, args) => deleteLostItem(args),
    clearLostItemsPossibleMatches: () => clearLostItemsPossibleMatches()
  }
}
