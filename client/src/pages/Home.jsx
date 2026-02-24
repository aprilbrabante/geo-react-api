import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Home() {

	const navigate = useNavigate()
	const user = useContext(UserContext);
	const [geo, setGeo] = useState(null);
	const [userGeo, setUserGeo] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [ipInput, setIpInput] = useState("");
	const [history, setHistory] = useState([]);
	const [selected, setSelected] = useState([]);

	useEffect(() => {
		fetchUserGeo();
	}, []);

	// Fetch current user IP
	const fetchUserGeo = async () => {
		try {
			setLoading(true);
			const res = await fetch("https://ipinfo.io/geo");
			const data = await res.json();
			setGeo(data);
			setUserGeo(data);
			setError("");
		} catch {
			setError("Failed to fetch location");
		} finally {
			setLoading(false);
		}
	};

	// Handle search of IP
	const handleSearch = async (ip) => {
 
		const targetIp = ip || ipInput;
		if (!targetIp) {
			setError("IP address is required");
			return;
		}
		try {

			setLoading(true);
			const res = await fetch(`https://ipinfo.io/${targetIp}/geo`);
			const data = await res.json();

			if (data.error) {
				setError("Invalid IP address");
				return;
			}

			setGeo(data);
			setError("");

			// Make a copy of the current history
			let newHistory = [...history];

			// Remove the current IP if it already exists
			newHistory = newHistory.filter(function(item) {
			return item !== targetIp;
			});

			// Add the new IP at the beginning
			newHistory.unshift(targetIp);

			// Update the state
			setHistory(newHistory);

		} catch {
			setError("Invalid IP address");
		} finally {
			setLoading(false);
		}
	};

	// Clear search
	const handleClear = () => {
		setIpInput("");
		setGeo(userGeo);
		setError("");
	};

	// Click history item
	const handleHistoryClick = (ip) => {
		setIpInput(ip);
		handleSearch(ip);
	};

	// Checkbox change
	const handleSelect = (ip) => {
		if (selected.includes(ip)) {
			setSelected(selected.filter((s) => s !== ip));
		} else {
			setSelected([...selected, ip]);
		}
	};

	// Delete selected history
	const handleDeleteSelected = () => {
		setHistory(history.filter((ip) => !selected.includes(ip)));
		setSelected([]); // clear selection
	};

	const handleLogout = () => {
		user.clearToken();
		navigate("/login");
	};

	return (
		<div className="container mt-5">

			<div className="d-flex justify-content-end mb-3">
			<button className="btn btn-danger" onClick={handleLogout}>
				Logout
			</button>
			</div>

			<div className="card shadow">
			<div className="card-body">

				<h3 className="card-title mb-4 text-center">IP Geolocation</h3>

				<div className="row g-2 mb-3">
				<div className="col-md-8">
					<input
					type="text"
					className="form-control"
					value={ipInput}
					onChange={(e) => setIpInput(e.target.value)}
					placeholder="Enter IP address"
					/>
				</div>
				<div className="col-md-4 d-grid gap-2 d-md-flex">
					<button className="btn btn-primary w-100" onClick={() => handleSearch()}>
					Search
					</button>
					<button className="btn btn-secondary w-100" onClick={handleClear}>
					Clear
					</button>
				</div>
				</div>

				{error && (
				<div className="alert alert-danger">
					{error}
				</div>
				)}

				{loading && (
				<div className="text-center">
					<div className="spinner-border text-primary" role="status"></div>
				</div>
				)}

				{geo && !loading && (
				<div className="table-responsive">
					<table className="table table-bordered">
					<tbody>
						<tr><th>IP</th><td>{geo.ip}</td></tr>
						<tr><th>City</th><td>{geo.city}</td></tr>
						<tr><th>Region</th><td>{geo.region}</td></tr>
						<tr><th>Country</th><td>{geo.country}</td></tr>
						<tr><th>Location</th><td>{geo.loc}</td></tr>
						<tr><th>Organization</th><td>{geo.org}</td></tr>
						<tr><th>Timezone</th><td>{geo.timezone}</td></tr>
					</tbody>
					</table>
				</div>
				)}

				{history.length > 0 && (
				<>
					<h5>Search History</h5>
					<div className="mb-2">
						<button
						className="btn btn-danger btn-sm"
						onClick={handleDeleteSelected}
						disabled={selected.length === 0}
						>
						Delete Selected
						</button>
					</div>
					<ul className="list-group">
						{history.map((ip, index) => (
						<li
							key={index}
							className="list-group-item d-flex  align-items-center"
						>
							<input
							type="checkbox"
							checked={selected.includes(ip)}
							onChange={() => handleSelect(ip)}
							/>
							<span>&nbsp;</span>
							<span
							style={{ cursor: "pointer" }}
							onClick={() => handleHistoryClick(ip)}
							>
							{ip}
							</span>

						</li>
						))}
					</ul>
				</>
				)}

			</div>
			</div>
		</div>
	);
}

export default Home;