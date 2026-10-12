import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      const userData = parsedUser.user || parsedUser;

      setUser(userData);

      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        mobile_number: userData.mobile_number || "",
        address: userData.address || "",
      });
    } catch (error) {
      console.error("Unable to read user data:", error);
      setMessage("Unable to load profile information.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleUpdate(event) {
    event.preventDefault();
    setMessage("");

    if (!user?.id) {
      setMessage("User ID not found. Please log in again.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5001/v1/update-user/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token
              ? { Authorization: `Bearer ${token}` }
              : {}),
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Profile update failed.");
      }

      const updatedUser = {
        ...user,
        ...(result.data || {}),
        ...formData,
      };

      setUser(updatedUser);
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(updatedUser)
      );

      setEditing(false);
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  if (!user) {
    return <div className="profile-loading">{message}</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {formData.name
              ? formData.name.charAt(0).toUpperCase()
              : "U"}
          </div>

          <h2>My Profile</h2>
          <p>Manage your Dairy Store account</p>
        </div>

        {message && (
          <p
            className={
              message.includes("successfully")
                ? "profile-message success"
                : "profile-message error"
            }
          >
            {message}
          </p>
        )}

        <form onSubmit={handleUpdate}>
          <div className="profile-field">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!editing}
              required
            />
          </div>

          <div className="profile-field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!editing}
              required
            />
          </div>

          <div className="profile-field">
            <label htmlFor="mobile_number">Mobile Number</label>
            <input
              id="mobile_number"
              type="tel"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              disabled={!editing}
            />
          </div>

          <div className="profile-field">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!editing}
              rows="3"
            />
          </div>

          <div className="profile-actions">
            {editing ? (
              <>
                <button
                  type="submit"
                  className="profile-save-btn"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  className="profile-cancel-btn"
                  onClick={() => {
                    setFormData({
                      name: user.name || "",
                      email: user.email || "",
                      mobile_number: user.mobile_number || "",
                      address: user.address || "",
                    });
                    setEditing(false);
                    setMessage("");
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                className="profile-edit-btn"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;