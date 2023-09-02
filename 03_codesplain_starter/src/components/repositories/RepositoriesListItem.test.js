import { render, screen, act } from '@testing-library/react'
import RepositoriesListItem from './RepositoriesListItem'
import { MemoryRouter } from 'react-router';

// Solution C
// It fakes the content 
// jest.mock('../tree/FileIcon.js', () => {
//     return () => {
//         return 'File Icon Component'
//     }
// })

function renderComponent() {
    const repository = {
        full_name: 'ale/react',
        language: 'Javascript',
        description: 'some description',
        owner: {
            login: 'Ale'
        },
        name: 'react',
        html_url: ''
    }
    // Memory router because there are Links from react-dom, so we need to wrap that environment.
    render(
        <MemoryRouter>
            <RepositoriesListItem repository={repository} />
        </MemoryRouter>
    )

    return { repository }
}

test('shows a link to the github homepage for this repository', async () => {
    const { repository } = renderComponent()

    //Solution A
    // screen.debug()
    // await pause()
    // screen.debug()

    //Solution B  --> BEST SOLUTION
    await screen.findByRole('img', {name: 'Javascript'})


    //Solution C --> TOP

    // Solution D very bad
    // await act(async () => {
    //     await pause()
    // })


    // -----

    const link = screen.getByRole('link', {
        name: /github repository/i
    });
    expect(link).toHaveAttribute('href', repository.html_url)
})

test('shows a fileicon with the appropiate icon', async () => {
    renderComponent()

    const icon = await screen.findByRole('img', {name: 'Javascript'})
    expect(icon).toHaveClass('js-icon')
})

test('shows a linnkk to the code editor page', async () => {
   const { repository } = renderComponent()

   await screen.findByRole('img', {name: 'Javascript'})

    const link = await screen.findByRole('link', {
        name: new RegExp(repository.owner.login)
    })
   
    expect(link).toHaveAttribute('href', `/repositories/${repository.full_name}`)
})


const pause = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 100)
    })
}