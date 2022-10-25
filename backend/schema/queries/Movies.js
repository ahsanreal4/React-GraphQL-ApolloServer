const Movies = {
  // Movie Resolvers
  movies: () => {
    return MovieList
  },
  movie: (parent, args) => {
    const name = args.name
    const movie = _.find(MovieList, { name })
    return movie
  }
}

module.exports = { Movies }
