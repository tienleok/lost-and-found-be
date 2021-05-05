const { resolvers } = require('graphql-scalars')

module.exports = {
  ObjectID: resolvers.ObjectID,

  Date: resolvers.Date,
  DateTime: resolvers.DateTime,
  LocalDate: resolvers.LocalDate,

  EmailAddress: resolvers.EmailAddress,

  PhoneNumber: resolvers.PhoneNumber,

  Latitude: resolvers.Latitude,
  Longitude: resolvers.Longitude,

  Void: resolvers.Void
}
