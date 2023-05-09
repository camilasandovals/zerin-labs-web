export default function LoginForm() {
    return(
        <>
            <h2>Login</h2>
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