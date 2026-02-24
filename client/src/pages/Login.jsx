import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {

	// Used for redirecting
   // useNavigate is a hook from react-router-dom that allows us to programmatically navigate the user to a specific route.
   // It returns a function that can be called with a route path as an argument to navigate the user to that path.
	const navigate = useNavigate()

	// Using the user context
   // useContext is a hook from React that allows us to access the global state and functions from any component in the application.
   // The useContext hook takes a context object as an argument and returns the current value (the one provided by the UserProvider in the App.jsx) of the context.
   // We have now access to the token state, setNewToken, clearToken, and isAuthenticated functions by using the user object
	const user = useContext(UserContext);

	const [isRegister, setIsRegister] = useState(false);
	const [form, setForm] = useState({
		email: '',
		password: ''
	})
	const [error, setError] = useState('');


	const submit = async () => {
		setError('');

		try {

			const route = isRegister ? 'register' : 'login'

			const res = await api.post(`/api/${route}`, form)

			user.setNewToken(res.data.token)

			navigate('/')

		} catch(err) {
			setError(err.response?.data?.error || 'Something went wrong')
			console.log(err)
		}
	}


	useEffect(() => {
		if(user.token) {
			navigate('/')
		}
	}, [])


	return (
		<>
			<div className="container d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}>
				<div className="card p-4" style={{width: "100%", maxWidth: "400px"}}>

					<h4 className="mb-3 text-center">{ isRegister ? 'Register' : 'Login'}</h4>

					<form onSubmit={(e) => {
						e.preventDefault()
						submit()
					}}>
						<input 
							type="email" 
							className="form-control mb-2" 
							placeholder="Email"
							value={form.email}
							onChange={(e) => setForm({...form, email:e.target.value})}
						/>
						<input
							type="password"
							className="form-control mb-3"
							placeholder="Password"
							value={form.password}
							onChange={(e) => setForm({...form, password: e.target.value})}
						/>
						<button className="btn btn-success w-100">{ isRegister ? 'Register' : "Login"}</button>
					</form>

					<div className="mt-3 text-center">
						<button className="btn btn-link text-success" onClick={() => setIsRegister(!isRegister)}>
							{ isRegister ? 'Already have an account' : 'Need an account?'}
						</button>
					</div>

					{ error && <p className="text-danger text-center"> {error} </p>}

				</div>
			</div>
		</>
	)
}