import { defineEventHandler } from 'h3'
import { Octokit } from '@octokit/rest'

// Initialize Octokit with your GitHub token
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

async function getRepositoryData(username) {
  const repos = await octokit.rest.repos.listForUser({
    username,
    sort: 'updated',
    per_page: 1
  })

  if (repos.data.length === 0) {
    throw new Error('No repositories found')
  }

  const repo = repos.data[0]

  const prs = await octokit.rest.pulls.list({
    owner: username,
    repo: repo.name,
    state: 'open'
  })

  const milestones = await octokit.rest.issues.listMilestones({
    owner: username,
    repo: repo.name,
    state: 'open'
  })

  const branches = await octokit.rest.repos.listBranches({
    owner: username,
    repo: repo.name
  })

  return {
    repoName: repo.name,
    prs: prs.data,
    milestones: milestones.data,
    branches: branches.data
  }
}

export default defineEventHandler(async (event) => {
  try {
    const requestBody = await useBody(event)
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
