import axios from "axios";

const BASE_URL = ''

export async function getuserinfo() {
	const response = axios.get(
		`http://10.0.2.2:8201/member/4`,
	)
}

