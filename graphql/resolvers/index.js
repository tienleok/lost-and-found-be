const path = require('path')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeResolvers } = require('@graphql-tools/merge')
// const { resolvers: scalarResolvers } = require('graphql-scalars')

const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolver.*'))
// const resolversArray = []

module.exports = mergeResolvers(resolversArray)
