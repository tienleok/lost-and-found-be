const FoundItem = require('../../models/foundItem')
const LostItem = require('../../models/lostItem')

async function matchFoundItems (lostItem) {
  return FoundItem.find({ $text: { $search: lostItem.title } }, { _id: 1 })
}

async function matchLostItems (foundItem) {
  const possibleMatches = await LostItem.find({ $text: { $search: foundItem.title } })
  possibleMatches.map(lostItem => {
    lostItem.possibleMatches.push(foundItem._id)
    foundItem.possibleMatches.push(lostItem._id)
    lostItem.save()
    foundItem.save()
    return lostItem
  })
}

/// /////////////////////////////////

function foundItems () {
  return FoundItem
    .find({})
    .populate('comments.user')
    .populate('votes.user')
    .populate('reportedBy')
    .populate('claimedBy')
    .populate('matchedTo')
    .populate('possibleMatches')
}

function foundItem (args) {
  return FoundItem
    .findById(args.id)
    .populate('comments.user')
    .populate('votes.user')
    .populate('reportedBy')
    .populate('claimedBy')
    .populate('matchedTo')
    .populate('possibleMatches')
}

function createFoundItem (args) {
  const foundItem = new FoundItem(args.foundItemInput)
  foundItem.save()
  matchLostItems(foundItem)
  return foundItem
}

function deleteFoundItem (args) {
  return FoundItem.findByIdAndRemove(args.id)
}

async function updateFoundItem (args) {
  const foundItem = await FoundItem.findByIdAndUpdate(args.id, args.foundItemInput, { new: true })
  await matchLostItems(foundItem)
  return foundItem
}

function clearFoundItemsPossibleMatches () {
  FoundItem.updateMany({}, { $unset: { possibleMatches: 1 } })
}

module.exports = {
  Query: {
    foundItems: () => foundItems(),
    foundItem: (_, args) => foundItem(args)
  },
  Mutation: {
    createFoundItem: (_, args) => createFoundItem(args),
    updateFoundItem: (_, args) => updateFoundItem(args),
    deleteFoundItem: (_, args) => deleteFoundItem(args),
    clearFoundItemsPossibleMatches: () => clearFoundItemsPossibleMatches()
  }
}
