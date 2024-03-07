import { defineEventHandler } from 'h3'
import { Octokit } from '@octokit/rest'

// Initialize Octokit with your GitHub token
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

async function getRepositoryData(username) {
  // const repos = await octokit.rest.repos.listForUser({
  //   username,
  //   sort: 'updated',
  //   per_page: 10
  // })

  // additionally, we want to fold in all the repos for the room302studio org
  const repoRaw = await octokit.rest.repos.listForOrg({
    // org: 'room302studio',
    org: username,
    sort: 'updated',
    per_page: 10
  })

  const repos = repoRaw.data

  // combine the two lists
  // repos.data = repos.data.concat(orgRepos.data)  

  if (repos.length === 0) {
    throw new Error('No repositories found')
  }

  const prsPromises = repos.map(async (repository) => {
    const prsForRepo = await octokit.rest.pulls.list({
      owner: 'room302studio',
      repo: repository.name,
      state: 'open'
    })
    return prsForRepo.data;
  });
  const prs = await Promise.all(prsPromises);
  console.log(prs)

  const milestonesPromises = repos.map(async (repository) => {
    const milestonesForRepo = await octokit.rest.issues.listMilestones({
      owner: 'room302studio',
      repo: repository.name,
      state: 'open'
    })
    return milestonesForRepo.data;
  });
  const milestones = await Promise.all(milestonesPromises);

  const branchesPromises = repos.map(async (repository) => {
    const branchesForRepo = await octokit.rest.repos.listBranches({
      owner: 'room302studio',
      repo: repository.name,
      per_page: 5
    })
    return branchesForRepo.data;
  });
  const branches = await Promise.all(branchesPromises);

  // filter out `main` and `master` branches
  const filteredBranches = branches.map((branch) => {
    return branch.filter((branch) => branch.name !== 'main' && branch.name !== 'master')
  })

  const flattenedBranches = filteredBranches.flat()

  // make an array of repo labels based on the index
  // this is a little hacky, but it's the easiest way to get the labels to show up in the right order
  const repoLabels = repos.map((repo, index) => {
    return {
      name: repo.name
    }
  })

  // now we can go back and pull each repo's info into its own object rather than having them all separate
  const combinedRepoData = repos.map((repo, index) => {
    return {
      ...repo,
      prs: prs[index],
      milestones: milestones[index],
      branches: filteredBranches[index]
    }
  })

  return {
    combinedRepoData,
    repoLabels,
    repos,
    prs,
    milestones,
    branches: flattenedBranches
  }
}

export default defineEventHandler(async (event) => {
  try {
    const requestBody = await readBody(event)
    if (!requestBody.username) {
      return createError({
        statusCode: 400,
        statusMessage: 'Please provide a GitHub username.'
      })
    }

    const data = await getRepositoryData(requestBody.username)

    return {
      statusCode: 200,
      statusMessage: 'OK',
      data
    }
  } catch (error) {
    console.error('Error fetching GitHub data:', error)
    return createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      error: error.message
    })
  }
})
