module.exports = {
  client: {
    service: {
      localSchemaFile: require.resolve(
        '@igloo-be-omnipartners/graphql-schema/__generated__/schema.graphql'
      )
    }
  }
}
