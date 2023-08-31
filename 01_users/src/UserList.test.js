import { render, screen, within } from '@testing-library/react'
import UserList from './UserList'

const renderComponent = () => {
    // Render the component
    const users = [
        { name: 'jane', email: 'jane@jane.com' },
        { name: 'jenny', email: 'jenny@jane.com' }
    ]
    /**
     * When using container , is for option 2
     */
    const { container } = render(<UserList users={users} />)

    return {
        users
    }
}

test('render one row per user', () => {

    renderComponent()
    // Find all the rows in the table
    //screen.logTestingPlaygroundURL()
    //! WRONG const rows = screen.getAllByRole('row')
    //Option 1 
    const rows = within(screen.getByTestId('users')).getAllByRole('row')

    // Option 2
    // eslint-disable-next-line
    // const rows = container.querySelectorAll('tbody tr')

    // Assertion: correct number of rows in the table
    expect(rows).toHaveLength(2)
})


test('render the email and name of each user', () => {
    const { users } = renderComponent()

    // screen.logTestingPlaygroundURL()
    for (let user of users) {
        const name = screen.getByRole('cell', { name: user.name })
        const email = screen.getByRole('cell', { name: user.email })

        expect(name).toBeInTheDocument()
        expect(email).toBeInTheDocument()
    }
})