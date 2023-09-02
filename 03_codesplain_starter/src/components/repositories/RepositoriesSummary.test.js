import { screen, render } from '@testing-library/react'
import RepositoriesSummary from './RepositoriesSummary'

test('displays information about the repository', async () => {
    const respository = {
        language: 'Javascript',
        stargazers_count: 5,
        forks: 30,
        open_issues: 1
    }
    render(<RepositoriesSummary repository={respository} />)

    for (let key in respository) {
        const value = respository[key]
        const element = screen.getByText(new RegExp(value))
        expect(element).toBeInTheDocument()
    }

})