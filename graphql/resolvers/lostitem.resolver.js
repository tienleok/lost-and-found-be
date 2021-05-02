const FoundItem = require('../../models/foundItem')
const LostItem = require('../../models/lostItem')

async function matchFoundItems (lostItem) {
  const possibleMatches2 = await FoundItem.find({ $text: { $search: lostItem.title } })
  possibleMatches2.map(foundItem => {
    lostItem.possibleMatches.push(foundItem._id)
    foundItem.possibleMatches.push(lostItem._id)
    foundItem.save()
    return foundItem
  })
}

/// /////////////////////////////////
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

async function createLostItem (args) {
  // const lostItem = new LostItem(args.lostItemInput)
  // return lostItem.save()
  try {
    const lostItem = new LostItem(args.lostItemInput)
    await matchFoundItems(lostItem)
    return lostItem.save()
  } catch (err) {
    console.log(err.message)
  }
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
    clearLostItemsPossibleMatches: (_, args) => clearLostItemsPossibleMatches(args)
  }
}
