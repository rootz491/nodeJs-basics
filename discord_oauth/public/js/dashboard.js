if (location.search.split("&")[0].split("=")[1] === "implicit") {
	/* DO NOTHING, as token is already stored via /token */
	localStorage.removeItem("refresh_token");
} else if (location.search.split("&")[0].split("=")[1] === "authcode") {
	/* TOKENS are avail at query params, add them to localstorage */
	localStorage.removeItem("access_token");
	localStorage.removeItem("refresh_token");
	localStorage.setItem(
		"access_token",
		location.search.split("&")[1].split("=")[1]
	);
	localStorage.setItem(
		"refresh_token",
		location.search.split("&")[2].split("=")[1]
	);
	location.href = location.href.split("?")[0];
}

// console.log(localStorage);

const fetchCurrentUser = async () => {
	const res = await fetch("/me", {
		headers: {
			token: localStorage.getItem("access_token"),
		},
	});
	if (res.ok) {
		const data = await res.json();
		document.querySelector("#me").innerHTML =
			"Hii <b>" + data.username + "</b> !";
	} else {
		document.querySelector("#me").innerHTML = "Invalid Identity.";
		setTimeout(() => {
			location.href = "/";
		}, 1000);
	}
};

fetchCurrentUser();

document.querySelector("#logout").addEventListener("click", () => {
	localStorage.clear();
	location.href = "/";
});
