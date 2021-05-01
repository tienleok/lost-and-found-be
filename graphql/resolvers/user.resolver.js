const User = require('../../models/user')

function users () {
  return User
    .find({})
    .populate('founditems')
    .populate('lostitems')
}

function user (args) {
  return User
    .findById(args.id)
    .populate('founditems')
    .populate('lostitems')
}

function createUser (args) {
  const user = new User(args.userInput)
  return user.save()
}

function deleteUser (args) {
  return User.findByIdAndRemove(args.id)
}

function updateUser (args) {
  return User.findByIdAndUpdate(args.id, args.userInput, { new: true })
}

async function login (args) {
  const user = await User.find({ username: args.username })
  if (user) {
    user.token = Buffer.from(args.username).toString('base64')
    return user
  }
}

module.exports = {
  Query: {
    users: () => users(),
    user: (_, args) => user(args),
    me: (_, args) => user(args)
  },
  Mutation: {
    createUser: (_, args) => createUser(args),
    updateUser: (_, args) => updateUser(args),
    deleteUser: (_, args) => deleteUser(args),
    login: (_, args) => login(args)
  }
}

// module.exports = { users, user, createUser, deleteUser, updateUser }
