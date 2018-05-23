# Frontend technical exercise


The goal of this exercise is to give us an idea of how you solve frontend
engineering problems. Don't worry if the tools bundled in this project scaffold
aren't in your everyday toolbox. We're primarily evaluating:

- Your ability to write idiomatic JavaScript.
- Your approach to breaking down user interfaces into components.
- Your comfort level with making API requests and working with responses.

The problems in these exercises are not specific problems you would solve at SolarWinds, but require similar skill sets.

We are always looking to refine this process & we want it to be a positive experience for you. If you have questions please ask!

## Project requirements

Build a single page React application using the provided skeleton which allows a user to:

- [ ] Enter a GitHub repository
- [ ] Using your favorite charting library render:
  - [ ] A chart of [commit activity][]
  - [ ] A chart of [code frequency][], showing additions and deletions over
      time
  - [ ] A punch card chart visualizing [commit activity by time of day][punchcard]

[commit activity]: https://developer.github.com/v3/repos/statistics/#get-the-last-year-of-commit-activity-data
[code frequency]: https://developer.github.com/v3/repos/statistics/#get-the-number-of-additions-and-deletions-per-week
[punchcard]: https://developer.github.com/v3/repos/statistics/#get-the-number-of-commits-per-hour-in-each-day

**Pro tip:** [Creating](https://github.com/settings/tokens/new) a _scopeless_
Personal Access Token will bump your GitHub API rate limit from 60 to 5000
requests per hour.

Check out [the setup instructions](setup.md) for a guide to getting started
with this project scaffold.

