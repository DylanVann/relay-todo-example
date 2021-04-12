async function fetchGraphQL(text: string, variables: object) {
  await new Promise((r) => setTimeout(r, 1000))
  const response = await fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  })
  return await response.json()
}

export default fetchGraphQL
