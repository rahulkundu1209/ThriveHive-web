# CONTRIBUTING GUIDELINES
Thank you for considering contributing to this project!
## Branching Strategy
| Branch | Purpose |
| --- | --- |
| main | Live production code (deployed on Vercel). |
| deploy | Production-ready code (ready for next deployment, but not live yet). |
| develop |	Active development branch (work in progress, not production-ready). |
## How to Contribute
### 1. As a collaborator
  i. If you are working on a feature/fix that is production-ready, create a new branch from from `deploy`. If you are working on a feature/fix that will be included in next major release, create a new branch from `develop`.  
  ii. While working on your new branch, commit often and write meaningful commit messages.  
  iii. Create a pull request into `develop` if you have created the branch from `develop` (as described in point i). If you created the branch from `deploy`, create pull requests into both `develop` and `deploy`.  
