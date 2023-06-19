import './App.css';
import React, { Children } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Register from './Pages/Register/register';
import Login from './Pages/Login/login';
import Verification from './Pages/Verification Page/verification';
import Landing from './Pages/Landing/landing';
import Homepage from './Pages/Homepage/homepage';
import ResponsiveDrawer from './Components/Sidebar/sidebar';
import ProfilePage from './Pages/Profilepage/profilepage.jsx';
import SinglePostPage from './Pages/Postpage/singlepostpage';
import ForgotPassword from './Pages/Forgotpassword/forgotpassword';
import InputForgotPassword from './Pages/Inputemailforgotpassword/inputemailforgotpassword';

const PrivateRoute = ({ children }) => {
	const userLogin = JSON.parse(localStorage?.getItem('userLogin'));

	if (userLogin) {
		return <Navigate to='/home' />;
	} else {
		return children;
	}
};

function App() {
	return (
		<>
			<Routes>
				<Route
					path='/'
					element={
						<>
							<PrivateRoute>
								<Landing />
							</PrivateRoute>
						</>
					}
				></Route>
				<Route
					path='/register'
					element={
						<>
							<PrivateRoute>
								<Register />
							</PrivateRoute>
						</>
					}
				></Route>
				<Route
					path='/login'
					element={
						<>
							<PrivateRoute>
								<Login />
							</PrivateRoute>
						</>
					}
				></Route>
				<Route
					path='/activation/:token'
					element={
						<>
							<PrivateRoute>
								<Verification />
							</PrivateRoute>
						</>
					}
				></Route>
				<Route
					path='/home'
					element={
						<>
							<ResponsiveDrawer />
							<Homepage />
						</>
					}
				></Route>
				<Route
					path='/profilepage'
					element={
						<>
							<ResponsiveDrawer />
							<ProfilePage />
						</>
					}
				></Route>
				<Route
					path='/post/:id'
					element={
						<>
							<ResponsiveDrawer />
							<SinglePostPage />
						</>
					}
				></Route>
				<Route
					path='/forgotpassword'
					element={
						<>
							<PrivateRoute>
								<InputForgotPassword />
							</PrivateRoute>
						</>
					}
				></Route>
				<Route
					path='/resetpassword/:token'
					element={
						<>
							<PrivateRoute>
								<ForgotPassword />
							</PrivateRoute>
						</>
					}
				></Route>
			</Routes>
		</>
	);
}

export default App;
