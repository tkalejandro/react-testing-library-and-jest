import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import UserForm from './UserForm'

test('It shows two inputs and a buttun', () => {
    // render the component
    render(<UserForm />)

    // Manipulate the component or find an element in it
    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');

    // Assertion - make sure the component is doing what we expect it to do.
    expect(inputs).toHaveLength(2)
    expect(button).toBeInTheDocument()

});

test('it calls onUserAdd when the form is submitted', async () => {
    // // NOT THE BEST IMPLEMENTATION
    // const argList = []
    // const callback = (...args) => {
    //     argList.push(args)
    // }

    const mock = jest.fn()

    // Try to render my component
    // render(<UserForm onUserAdd={callback}/>)
    render(<UserForm onUserAdd={mock}/>)
    // Find the two inputs
    // const [nameInput, emailInput] = screen.getAllByRole('textbox')
    const nameInput = screen.getByRole('textbox', {
        name: /name/i
    })
    const emailInput = screen.getByRole('textbox', {
        name: /email/i
    })

    // SImulate typing in a  name
    await user.click(nameInput)
    await user.keyboard('Testing')
    // Simulate typing in a en email
    await user.click(emailInput)
    await user.keyboard('testing@testing.com')

    // Find the button
    const button = screen.getByRole('button')

    // Simulate clicking the button
    await user.click(button)

    // Assertion to make sure 'onUserAdd'
    // expect(argList).toHaveLength(1)
    // expect(argList[0][0]).toEqual({name: 'Testing', email: 'testing@testing.com'})

    expect(mock).toHaveBeenCalled()
    expect(mock).toHaveBeenCalledWith({name: 'Testing', email: 'testing@testing.com'})
})

test('empties the tow inputs when form is submitted', async () => {
    // IS empty cause we dont care, we want the code to keep going
    render(<UserForm onUserAdd={() => {}} />)

    const nameInput = screen.getByRole('textbox', {
        name: /name/i
    })
    const emailInput = screen.getByRole('textbox', {
        name: /email/i
    })
    const button = screen.getByRole('button');
      await user.click(nameInput)
      await user.keyboard('Testing')
      await user.click(emailInput)
      await user.keyboard('testing@testing.com')
      await user.click(button)

    expect(nameInput).toHaveValue('')
    expect(emailInput).toHaveValue('')
})