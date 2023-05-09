export default function SignUpForm() {
    return(
        <>
            <h2>SignUp</h2>
            <form >
                <label htmlFor="username">Username
                <input type="text" />  
                </label>
                <br />
                <label htmlFor="password">Password
                <input type="text" />
                </label>
                <br/>
                <input type="submit" value="Login" />
            </form>
        </>
    )
}