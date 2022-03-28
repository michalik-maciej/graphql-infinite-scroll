export const apiSettings = {
  query: (pageNumber) => `query {
    launchesPast(limit: 30, offset: ${30 * (pageNumber - 1)}) {
      mission_name
      launch_date_local
      links {
        article_link
      }
      rocket {
        rocket_name
      }
      id
    }
  }`,
  url: `https://api.spacex.land/graphql/`
}
