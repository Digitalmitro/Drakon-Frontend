import React from 'react'
import { useUser } from '../hooks/useUser'

function UserProfileForm() {
    const { user, token } = useUser();

    console.log(user);

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch(
                `https://api.drakon-sports.com/updateclient`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        firstName: data.fullName.split(" ")[0],
                        lastName: data.fullName.split(" ").slice(1).join(" "),
                        displayName: data.name,
                        email: data.email,
                        phone: data.phone,
                    }),
                }
            );

            if (!res.ok) {
                throw new Error(`Error ${res.status}: ${res.statusText}`);
            }

            const result = await res.json();
            console.log("Profile updated:", result);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }


    return (
        // <h3>User Form</h3>
        <form onSubmit={handleSubmit}>
            <div class="my-3">
                <label for="username" className="form-label fs-5 text">
                    Full Name
                </label>
                <input
                    name='fullName'
                    type="text"
                    className="form-control"
                    id="username"
                    defaultValue={user?.name}
                    required
                />
            </div>
            <div class="mb-3">
                <label for="name" className="form-label fs-5 text">
                    Name
                </label>
                <input
                    name='name'
                    type="text"
                    className="form-control"
                    id="name"
                    defaultValue={user?.name || ""}
                    required
                />
            </div>
            <div class="mb-3">
                <label for="email" className="form-label  fs-5 text">
                    Email
                </label>
                <input
                    name='email'
                    type="email"
                    className="form-control"
                    id="email"
                    defaultValue={user?.email || ""}
                    required
                />
            </div>
            <div class="mb-3">
                <label for="phone" className="form-label  fs-5 text">
                    Phone Number
                </label>
                <input
                    name='phone'
                    type="tel"
                    className="form-control"
                    id="phone"
                    defaultValue={user?.phone || ""}
                    required
                />
            </div>
            <button
                type="submit"
                className="btn btn-danger"
                style={{ backgroundColor: "#FF7F50 " }}
            >
                Submit
            </button>
        </form>
    )
}

export default UserProfileForm